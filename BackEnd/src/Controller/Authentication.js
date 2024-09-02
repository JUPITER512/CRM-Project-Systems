import {User} from '../Models/User.model.js'
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
    const alreadyExistUser=await User.findOne({
      email:email
    })
    if(alreadyExistUser){
      return res.status(409).json({
          message:"Email Already Registered"
      })
    }
    
    const newUser=await User.create({
        email:email,
  
      name:name,
      password:password
  
    })
    const accessToken=newUser.generateAccessToken();
    const refereshToken=newUser.generateRefershToken();
    newUser.save({
      refereshToken:refereshToken
    })
    res.status(200).json({
      message: "User Created Successfully",
      userData:newUser,
      accessToken:accessToken
    });
 } catch (error) {
    res.status(500).json({
        message:"Internal Server Error"
    })
 }
};

export const Sign_in=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const requiredFields=[
            {field:email,name:"Email"},
            {field:password,name:"Password"}
        ]
        for(let {field,name} of requiredFields){
            if(!field){
                return res.status(400).json({
                    message:`${name} is Required for Sign In`
                })
            }
        }
        const userInDb=await User.findOne({
            email:email
        })
        if(!userInDb){
            return res.status(409).json({
                message:"Email Not Registered/User Not Found"
            })
        }
        const checkPassword=userInDb.isPasswordCorrect(password)
        if(!checkPassword){
            return res.status(409).json({
                message:"Invalid Credentials"
            })
        }
        const accessToken=userInDb.generateAccessToken();
        const { password: _, ...userWithoutPassword } = userInDb.toObject();

        res.status(200).json({
            message:"Success",
            data:userWithoutPassword,
            accessToken:accessToken
        })
    } catch (error) {
        res.status(500).json({
            message:"Interval Server Error",
            error:error.message
        })
    }
}