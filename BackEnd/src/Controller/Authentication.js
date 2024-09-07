import jsonwebtoken from "jsonwebtoken";
import { User } from "../Models/User.model.js";
import { generateOTP } from "../Utils/GenerateOtp.js";
import { sendmail } from "../Utils/NodeMailer.js";
import Cloudinary_Upload from "../Utils/Cloudinary.js";
import fs from 'fs';

export const Sign_up = async (req, res) => {
  try {
    const { email, name, password, confirmPassword } = req.body;
    const requiredFields = [
      { field: email, name: "Email" },
      { field: name, name: "Name" },
      { field: password, name: "Password" },
      { field: confirmPassword, name: "Confirm Password" },
    ];
    for (const { field, name } of requiredFields) {
      if (!field) {
        return res.status(400).json({
          message: `${name} Required for Sign Up`,
        });
      }
    }
    if (password != confirmPassword) {
      return res.status(400).json({
        message: "Password Not Matched",
      });
    }
    const alreadyExistUser = await User.findOne({
      email: email,
    });
    if (alreadyExistUser) {
      return res.status(409).json({
        message: "Email Already Registered",
      });
    }

    const newUser = await User.create({
      email: email,
      name: name,
      password: password,
    });
    const refreshToken = newUser.generateRefershToken();
    newUser.refreshToken = refreshToken;
    newUser.verify = false;
    await newUser.save();
    sendmail({email:newUser.email,subject:'CRM Suite Email Verification Link',verificationLinkcode:newUser._id})
    res.status(200).json({
      message: "Account created Successfully with Verification Link",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const Sign_in = async (req, res) => {
  try {
    const { email, password } = req.body;
    const requiredFields = [
      { field: email, name: "Email" },
      { field: password, name: "Password" },
    ];
    for (let { field, name } of requiredFields) {
      if (!field) {
        return res.status(400).json({
          message: `${name} is Required for Sign In`,
        });
      }
    }
    const userInDb = await User.findOne({
      email: email,
    });
    if (!userInDb) {
      return res.status(404).json({
        message: "Email Not Registered/User Not Found",
      });
    }
    if (!userInDb.verify) {
      return res.status(404).json({
        message: "Please Verify Your Email",
      });
    }
    const checkPassword = userInDb.isPasswordCorrect(password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const accessToken = userInDb.generateAccessToken();
    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .cookie("refreshToken", userInDb.refreshToken, options)
      .json({
        message: "Success",
        data: userInDb.toJsonobj(),
        accessToken:accessToken
      });
  } catch (error) {
    console.log("Error in signin ",error)
    res.status(500).json({
      message: "Interval Server Error",
      error: error.message,
    });
  }
};
export const verifyAccount = async (req, res) => {
  const { email, id } = req.query;
  console.log(req.params);
  if (!email && !id) {
    return res.status(400).json({
      message: "Invalid Link",
    });
  }

  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.verify = true;
    user.save();
    res.status(200).json({
      message: "Account verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const Forget_Password = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required to Change Password",
      });
    }
    const userInDatabase = await User.findOne({
      email: email,
    });
    if (!userInDatabase) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }
    if (!userInDatabase.verify) {
      return res.status(400).json({
        message: "Email Not Verified",
      });
    }
    const otp = generateOTP();
    userInDatabase.otp = otp;
    userInDatabase.save();
    // sendmail(userInDatabase.email, otp);
    return res.status(200).json({
      message: "Code is sent to your Email",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while processing forget Password",
      error: error.message,
    });
  }
};
export const Verify_Otp = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({
        message: "No Otp is Provided",
      });
    }
    const user = await User.findOne({
      otp: otp,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Otp",
      });
    }
    if (!user.verify) {
      return res.status(400).json({
        message: "Email Not Verified",
      });
    }
    user.otp = null;
    await user.save();
    return res.status(200).json({
      message: "OTP verified successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const Change_Password = async (req, res) => {
  try {
    const { password, confirmPassword, email, id } = req.body;
    if (!password || !confirmPassword) {
      return res.status(400).json({
        message: "Password And Confrim Password Are Required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password And Confrim Password Does Not Match",
      });
    }
    const findedUser = await User.findOne({ email: email, _id: id });
    if (!findedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (!findedUser.verify) {
      return res.status(400).json({
        message: "Email Not Verified",
      });
    }

    findedUser.password = password;
    await findedUser.save();
    res.status(200).json({
      message: "Your Password is Successfully Change",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const Update_Info = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ message: "Email Not Verified" });
    }
    const { newData } = req.body;
    const updateUserInfo = await User.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
    });
    if (!updateUserInfo) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!updateUserInfo.verify) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const findedUser = await User.findById(userId);
    if (!findedUser) {
      return res.status(400).json({ message: "User Not Found Against Id" });
    }
    findedUser.refreshToken = null;
    await findedUser.save();
    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({
        message: "Account Logged Out Successfully",
      });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Errror",
      error: error.message,
    });
  }
};

export const Refresh_Token = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh Token is required",
      });
    }
    jsonwebtoken.verify(
      refreshToken,
      process.env.REFRESH_KEY_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({
            message: "Invalid Refresh Token",
          });
        }
        const userId = decoded._id;
        const user = await User.findById(userId);
        console.log({refreshToken,user:user.refreshToken})
        if (!user || user.refreshToken !== refreshToken) {
          return res.status(403).json({
            message: "User not found or Refresh Token does not match",
          });
        }
        const new_access_token = user.generateAccessToken();
        res.status(200).json({
          message: "Access Token refreshed successfully",
          accessToken:new_access_token
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const handleImage = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({
        message: "User ID not given"
      });
    }
    
    const userInDb = await User.findById(userId);
    if (!userInDb.verify) {
      return res.status(401).json({
        message: "Email is not verified"
      });
    }

    let cloudinaryResponse;
    if (req.file) {
      if (userInDb.pictureId) {
        cloudinaryResponse = await Cloudinary_Upload(req.file.path, userInDb.pictureId);
      } else {
        cloudinaryResponse = await Cloudinary_Upload(req.file.path);
      }
      userInDb.pictureId = cloudinaryResponse.public_id;
      userInDb.picture = cloudinaryResponse.secure_url;
      await userInDb.save();
    }

    res.status(200).json({
      message: userInDb.pictureId ? "Image Updated Successfully" : "Image Uploaded Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  } finally {
    if (req.file) {
      fs.unlink(req.file.path, (unlinkError) => {
        if (unlinkError) {
          console.error("Failed to delete the file:", unlinkError);
        }
      });
    }
  }
};