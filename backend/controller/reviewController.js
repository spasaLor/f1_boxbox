const prisma = require("../config/prisma");
const {body,validationResult} = require("express-validator");

const reviewValidator = [body("content").trim().isLength({min:2, max:300}).withMessage("Reviews must be between 2 and 300 characters long")]

const getAllReviews = async(req,res)=>{
    const {raceId} = req.params;
    try {    
        const reviews = await prisma.reviews.findMany({
            where:{race_id:Number(raceId)}
        });
        return res.status(200).json({reviews})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
const getReview = async(req,res)=>{
    const {username} = req.params;
    const {race_name,season} = req.query;

    try {    
        const u = await prisma.users.findFirst({
            where:{
                username:username
            }
        });
        const r = await prisma.races.findFirst({
            where:{
                url:race_name,
                season:Number(season)
            },
            include:{ratings:true,race_liked:true}
        })
        const review = await prisma.reviews.findUnique({
            where:{user_id_race_id: {user_id:u.id,race_id:r.id}},
            include:{races:true}
        });

        const ratingByUser = r.ratings.find(rt => rt.user_id === u.id);
        const isLikedByUser = r.race_liked.some(like => like.user_id === u.id);

        const newReview = {
            ...review,
            rating:ratingByUser.rating,
            is_liked:isLikedByUser
        }
        return res.status(200).json({review:newReview})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getLatestReviews = async(req,res)=>{
    try {
        const reviews = await prisma.reviews.findMany({
            take:10,
            orderBy:{updated_at:"asc"},
            include:{users:true,races:true},
        });
        return res.status(200).json(reviews);
    } catch (error) {
        
    }
}

const newReview = [reviewValidator,async(req,res)=>{
    const userId = req.user.id;
    const data = req.body;
    const now = new Date();
    const errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(500).json({message:"Reviews must be between 2 and 300 characters long"})
    
    try {
        await prisma.reviews.create({
            data:{
                user_id:Number(userId), 
                race_id:Number(data.raceId),
                content:data.content,
                created_at: now,
                updated_at: now,
            }
        });
        return res.status(200).json({message: "Success"});
    } catch (error) {
        if(error.code === 'P2002')
            return res.status(400).json({message: "You already reviewed this race"});
        else
            return res.status(500).json({message: error.message});
    }
}]

const editReview = [reviewValidator,async(req,res)=>{
    const {id} = req.params;
    const data = req.body;
    const now = new Date();
    const errors = validationResult(req);

     if(!errors.isEmpty())
        return res.status(500).json({message: "Reviews must be between 2 and 300 characters long"})

    try {
        await prisma.reviews.update({
            where:{id:Number(id)},
            data:{
                content:data.content,
                updated_at: now,
            }
        });
        return res.status(200).json({message: "Success"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}]
const deleteReview = async(req,res)=>{
    const {id} = req.params;
    try {
        await prisma.reviews.delete({
            where:{id:Number(id)}
        });
        return res.status(200).json({message: "Success"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const getAllReviewsFromUser = async(req,res)=>{
    const {user} = req.params;
    try {
        const u = await prisma.users.findFirst({
            where:{
                username:user
            }
        });

        const reviews = await prisma.reviews.findMany({
            where:{user_id:u.id},
            include:{races:true,likes:true,comments:true}
        });

        const ratings = await Promise.all(
            reviews.map((item)=>
             prisma.ratings.findFirst({
                where:{
                    AND:[
                        {user_id:u.id, race_id:item.race_id}
                    ]
                }
             }  
            ))
        );
        const liked = await Promise.all(
            reviews.map((item)=>
             prisma.race_liked.findFirst({
                where:{
                    AND:[
                        {user_id:u.id, race_id:item.race_id}
                    ]
                }
             }  
            ))
        );
        reviews.forEach((re,i)=>{re.rating = ratings[i].rating; re.liked = liked[i] === null ? false:true});
        return res.status(200).json({reviews});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error.message});
    }
}

const getReviewFromUser = async(req,res)=>{
    const userId = req.user.id;
    const {raceId} = req.params;

     try {
        const review = await prisma.reviews.findFirst({
            where:{
                AND:[
                    {user_id:Number(userId), race_id:Number(raceId)}
                ]                
            }
        });
        return res.status(200).json({review});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error.message});
    }
}

const getLikedReviews = async(req,res)=>{
    const userId = req.user.id;
    try {
        const reviews = await prisma.likes.findMany({
            where:{
                user_id:Number(userId)
            },
            select:{liked_review:true}
        });
        let likes = [];
        reviews.forEach(r=>likes.push(r.liked_review))
        return res.status(200).json({likes});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error.message});
    }
}

const newReviewLike = async(req,res)=>{
    const {id}= req.params;
    const userId = req.user.id;
    try {
        await prisma.likes.create({
            data:{
                user_id:Number(userId),
                liked_review:Number(id)
            },
        });
        return res.status(200).json({message:"ok"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error.message});
    }
}

const removeLike = async(req,res)=>{
    const {id}= req.params;
    const userId = req.user.id;
    try {
        await prisma.likes.delete({
            where:{
                user_id_liked_review:{user_id:Number(userId),liked_review:Number(id)}
            },
        });
        return res.status(200).json({message:"ok"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error.message});
    }
}

const getLikes = async(req,res)=>{
    const {id} = req.params;
    try {
        const likes = await prisma.likes.aggregate({
            _count:{user_id:true},
            where:{
                id:Number(id)
            }
        });
        return res.status(200).json({likes:likes._count.user_id})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }

}

module.exports = {getAllReviews,getReview,getLatestReviews,newReviewLike,getLikes,newReview,editReview,removeLike,deleteReview,getLikedReviews,getAllReviewsFromUser,getReviewFromUser}