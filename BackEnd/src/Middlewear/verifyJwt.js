import jsonwebtoken from "jsonwebtoken";

export async function verifyJsonWebToken(req,res,next){
    try {
        const authHeader=req.headers.authorization
        if(!authHeader){
            return res.status(401).json({
                message:"Authorization Header is Missing"
            })
        }
        const token=authHeader.split(" ")[1] || authHeader;
        if(!token){
            return res.status(401).json({
                message:"Authorization Token is Missing"
            })
        }
        const decodedToken=await jsonwebtoken.verify(token,process.env.ACCESS_KEY_SECRET)
        req.user=decodedToken
        next()
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
