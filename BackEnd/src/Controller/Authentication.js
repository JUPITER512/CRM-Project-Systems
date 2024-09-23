import jsonwebtoken from "jsonwebtoken";
import { User } from "../Models/User.model.js";
import { generateOTP } from "../Utils/GenerateOtp.js";
import { sendmail } from "../Utils/NodeMailer.js";
import Cloudinary_Upload from "../Utils/Cloudinary.js";
import fs from 'fs';
import { Customer } from "../Models/CustomerBasicInfo.model.js";

export const EmailVerification=async(req,res)=>{
  try {
    const {userId}=req.params;
    if(!userId){
        return res.status(400).json({
          message:"User Id Is required",
        })
    }
    const userInDb=await User.findById(userId);
    if(!userInDb){
      return res.status(400).json({
        message:"Invalid User Id/User Not Found"
      })
    }
    userInDb.verify=true;
    userInDb.save();
    return res.status(200).json({
      message:"Email verified"
    })
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error",
      error:error.message
    })
  }
}

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
      error:error.message
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
    const checkPassword =await userInDb.isPasswordCorrect(password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const accessToken = userInDb.generateAccessToken();
    if(!userInDb.refreshToken){
      const refreshToken=userInDb.generateRefershToken();
      userInDb.refreshToken = refreshToken;
      userInDb.save()
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .cookie("refreshToken", userInDb.refreshToken, options)
      .json({
        message: "Success",
        accessToken:accessToken
      });
  } catch (error) {
    res.status(500).json({
      message: "Interval Server Error",
      error: error.message,
    });
  }
};
export const verifyAccount = async (req, res) => {
  const { email, id } = req.query;
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
    
    
    sendmail({email:userInDatabase.email,code:otp,subject:"Crm Suite Password Change"})
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
    const { otp ,email} = req.body;
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
    user.otp = undefined;
    user.save();
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
    const isOldPassword = await findedUser.isPasswordCorrect(password);
    if (isOldPassword) {
      return res.status(400).json({
        message: "You cannot use your old password as the new password"
      });
    }

    findedUser.password = password;
    findedUser.save();
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
    const data=req.body
    const updateUserInfo = await User.findByIdAndUpdate(userId, {
      name: data?.name,
      contact: data?.contact,
      address: data?.address,
      companyName: data?.companyName, 
    }, {
      new: true,
      runValidators: true,
      upsert: true
    }).select('-password -refreshToken');
    if (!updateUserInfo) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!updateUserInfo.verify) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User updated successfully",
      data:updateUserInfo
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
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const findedUser = await User.findById(userId);
    if (!findedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    findedUser.refreshToken = undefined;
    findedUser.save();
    res
      .status(200)
      .clearCookie("accessToken", { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
      .clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
      .json({
        message: "Account logged out successfully",
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

export const handleimagebase64=async(req,res)=>{
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
    const {image}=req.body
    userInDb.pictureBase64=image;
    await userInDb.save()
    res.status(200).json({
      message: userInDb
    });
  }
  catch(err){
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
}
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
   return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

export const User_Information=async(req,res)=>{
  try {
    const userId=req.user._id;
    if(!userId){
      return res.status(400).json({
        message:"User Id not given"
      })
    }
    const userInDb=await User.findById(userId);
    if(!userInDb){
      return res.status(400).json({
        message:"User not found"
      })
    }
   
    return res.status(200).json({
      message:"Success",
      data:userInDb.toJsonobj(),
    })
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error",
      error:error.message
    })
  }
}
export const User_Customer_Information=async(req,res)=>{
  try {
    const userId=req.user._id;
    if(!userId){
      return res.status(400).json({
        message:"User Id not given"
      })
    }
    const userInDb=await User.findById(userId);
    if(!userInDb){
      return res.status(400).json({
        message:"User not found"
      })
    }
    const customerData = await Customer.find({ addedBy: userId }).select('gender customerStatus primaryPhone customerCommunicationPreference');
    const { totalCustomers, activeCount, males, females, havePhone, communicationPreferences } = customerData.reduce((acc, item) => {
      if (item?.gender?.toLowerCase() === 'male') acc.males += 1;
      if (item?.gender?.toLowerCase() === 'female') acc.females += 1;
      if (item.customerStatus.toLowerCase() === 'active') acc.activeCount += 1;
      if (item.primaryPhone) acc.havePhone += 1;

      if (item?.customerCommunicationPreference) {
        const preference = item.customerCommunicationPreference.toLowerCase().trim();
        acc.communicationPreferences[preference] = (acc.communicationPreferences[preference] || 0) + 1;
      }

      acc.totalCustomers += 1;
      return acc;
    }, {
      totalCustomers: 0,
      activeCount: 0,
      males: 0,
      females: 0,
      havePhone: 0,
      communicationPreferences: {}
    });


    return res.status(200).json({
      message:"Success",
      customer_data:{totalCustomers,activeCount,males,females,havePhone,communicationPreferences},
    })
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error",
      error:error.message
    })
  }
}

export const Change_Password_FromProfile=async(req,res)=>{
  try {
    const userId=req.user._id
    const {currentPassword,newPassword,confirmNewPassword}=req.body;
    if(!currentPassword || !newPassword || !confirmNewPassword){
      return res.status(400).json({
        message:"Fill all fields"
      })
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        message: "New password and confirmation do not match"
      });
    }
    const userInDb = await User.findById(userId);
    if (!userInDb) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    const currentPasswordStatus=await userInDb.isPasswordCorrect(currentPassword);
    console.log(currentPasswordStatus)
    if (!currentPasswordStatus) {
      return res.status(400).json({
        message: "Current password is incorrect"
      });
    }
    const isOldPassword = await userInDb.isPasswordCorrect(newPassword);
    if (isOldPassword) {
      return res.status(400).json({
        message: "You cannot use your old password as the new password"
      });
    }
    userInDb.password = newPassword;
    userInDb.save();
    res.status(200).json({
      message: "Password updated successfully"
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
}