import { User } from "../Models/User.model.js";
import { generateOTP } from "../Utils/GenerateOtp.js";
import { sendOTP } from "../Utils/NodeMailer.js";
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
    //send email here with email object id

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
      return res.status(409).json({
        message: "Email Not Registered/User Not Found",
      });
    }
    if (userInDb.verify==false) {
      return res.status(404).json({
        message: "Please Verify Your Email",
      });
    }
    const checkPassword = userInDb.isPasswordCorrect(password);
    if (!checkPassword) {
      return res.status(409).json({
        message: "Invalid Credentials",
      });
    }
    const accessToken = userInDb.generateAccessToken();
    const { password: _, ...userWithoutPassword } = userInDb.toObject();
    res.status(200).json({
      message: "Success",
      data: userWithoutPassword,
      accessToken: accessToken,
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
  console.log(req.params)
  if (!email && !id) {
    return res.status(400).json({
      message: "Invalid Link"
    });
  }

  try {
    const user = await User.findById({_id:id});
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    user.verify = true;
    user.save();
    res.status(200).json({
      message: "Account verified successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error:error.message
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
    const otp = generateOTP();
    userInDatabase.otp = otp;
    userInDatabase.save();
    sendOTP(userInDatabase.email, otp);
    return res.status(200).json({
      message: "Code is sent to your Email",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while processing forget Password",
      error: error.message,
    });
  }
  //send otp code here
};
export const Verify_Otp=async(req,res)=>{
  try {
    const {otp}=req.body;
    if(!otp){
      return res.status(400).json({
        message:"No Otp is Provided"
      })
    }
    const user=await User.findOne({
      otp:otp
    })
    if(!user){
      return res.status(400).json({
        message:"Invalid Otp"
      })
    }
    user.otp=null;
    await user.save();
    return res.status(200).json({
      message: "OTP verified successfully",
      user: {
        id: user._id,
        email: user.email 
      }})
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error:error.message
    });
  }
}
export const Change_Password=async(req,res)=>{
  try {
    const {password,confirmPassword,email,id}=req.body;
    if(!password || !confirmPassword){
      return res.status(400).json({
        message:"Password And Confrim Password Are Required"
      })
    }
    if(password!==confirmPassword){
      return res.status(400).json({
        message:"Password And Confrim Password Does Not Match"
      })
    }
    const findedUser=await User.findOne({email:email,_id:id});
    if(!findedUser){
      return res.status(404).json({
        message:"User not found"
      })
    }
    findedUser.password=password;
    await findedUser.save();
    res.status(200).json({
      message:"Your Password is Successfully Change"
    })
  } catch (error) {
    res.status(500).json({
      message:"Internal Server Error",
      error:error.message
    })
  }
}