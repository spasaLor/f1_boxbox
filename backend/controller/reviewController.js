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
    const {id} = req.params;
    try {    
        const review = await prisma.reviews.findUnique({
            where:{id:Number(id)}
        });
        return res.status(200).json({review})
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
    const userId = req.user.id;
    try {
        const reviews = await prisma.reviews.findMany({
            where:{user_id:Number(userId)}
        });
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

module.exports = {getAllReviews,getReview,getLatestReviews,newReview,editReview,deleteReview,getAllReviewsFromUser,getReviewFromUser}