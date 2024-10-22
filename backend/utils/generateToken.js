import jwt from "jsonwebtoken"

export const generateToken = (res, userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "30d"})
    res.cookie("token", token, {
        httpOnly:true,
        secure:process.env.NODE_ENV !== "development",
        samesite:"strict",
        maAge: 30 * 24 * 60 * 60 * 1000
    })
    return token
}
