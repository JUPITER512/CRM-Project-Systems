import User from "../Models/User.model";
export default async function isLoggedIn(req, res,next) {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh Token is required/User Is Signed Out",
    });
  }
  next()
}
