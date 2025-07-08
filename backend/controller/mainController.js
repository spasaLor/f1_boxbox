const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const {body,validationResult} = require("express-validator");

const registerValidation = [
    body("username").trim().isLength({min:2,max:20}).withMessage("Username may contain between 2 and 20 characters")
    .matches(/^[a-zA-Z0-9_\-\\/!]+$/).withMessage('Username may only contain letters, numbers, _, -, \\, /, and !'),
    body("mail").trim().isEmail().withMessage("Wrong email format"),
    body("password").trim().isLength({min:4}).withMessage("Password must have at least 4 characters")
    .matches(/^[a-zA-Z0-9_\-]+$/).withMessage('Password may only contain letters, numbers, _ and -')
];

const registerUser = [registerValidation,async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return(res.status(400).json({errors:errors.array()}))

    const data = req.body;
    const encrypted = await bcrypt.hash(data.password,10);
    try {
        const user =await prisma.users.findFirst({
            where:{
                username:data.username
            }
        });
        if(user)
            return res.status(400).json({message:"Username already taken"});
    } catch (error) {
        console.log(error);
    }
    
    try {
        await prisma.users.create({
            data:{
                username:data.username,
                email:data.mail,
                password:encrypted
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"This email is already linked to a profile"});
    }
    res.status(200).json({redirect: "/"});
}]

module.exports={registerUser}