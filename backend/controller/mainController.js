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
            return res.status(400).json({errors:[{message:"Username already taken"}]});
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
        return res.status(400).json({errors:[{message:"This email is already linked to a profile"}]});
    }
    res.status(200).json({redirect: "/"});
}]

const getUserData = async(req,res)=>{
    const {username} = req.params;
    try {
        const user = await prisma.users.findFirst({
            where:{username}
        });
        const [viewedCount,followingCount,followerCount,latestRatings,reviews,favRaces] = await Promise.all([
            prisma.viewed.count({where:{user_id:user.id}}),
            prisma.following.count({ where: { follower_id: user.id } }),
            prisma.following.count({ where: { following_id: user.id } }),
            prisma.ratings.findMany({where:{user_id:user.id},take:5,orderBy:{date:'asc'},include:{races:true}}),
            prisma.reviews.findMany({where:{user_id:user.id},take:5,orderBy:{updated_at:'asc'},include:{races:true}}),
            prisma.fav_races.findMany({where:{user_id:user.id},include:{races:true}})
        ]);
        const favoriteRaces = favRaces.map(item=>item.races);
        
        const latestActivity=await Promise.all(latestRatings.map(async (item)=>{
            const like = await prisma.race_liked.findFirst({
                where:{                    
                    AND:[
                        {race_id:item.race_id},{user_id:user.id}
                    ]
                }
            });
            return {...item,
                isLiked:!!like}
        }))
        const latestReviews=await Promise.all(reviews.map(async (item)=>{
            const like = await prisma.race_liked.findFirst({
                where:{                    
                    AND:[
                        {race_id:item.race_id},{user_id:user.id}
                    ]
                }
            });
            const rating = await prisma.ratings.findFirst({
                where:{
                    user_id:user.id,
                    race_id:item.race_id,
                },
                select:{rating:true}
            });
            return {...item,
                isLiked:!!like,
                rating: rating.rating
            }
        }))
        const data = {
            viewed:viewedCount,
            following:followingCount,
            followers:followerCount,
            latestActivity,
            latestReviews,
            favoriteRaces
        }        
        return res.status(200).json(data);
    
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
    

}

module.exports={registerUser,getUserData}