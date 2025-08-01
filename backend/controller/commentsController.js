const prisma = require("../config/prisma");
const {body,validationResult} = require("express-validator");
const commentValidator = [ body("content").trim().isLength({min:2, max:200}).withMessage("Comments must be between 2 and 200 characters long")]

const getAllCommentsFromReview = async(req,res)=>{
    const {reviewId} = req.params;
    try {
        const comments = await prisma.comments.findMany({
            where:{post_id:Number(reviewId)}
        });
        return res.status(200).json({comments});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
const getAllCommentsFromList = async(req,res)=>{
    const {listId} = req.params;
    try {
        const comments = await prisma.lists_comments.findMany({
            where:{list_id:Number(listId)},
            include:{users:true}
        });
        return res.status(200).json({comments});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const addRevComment = [commentValidator,async(req,res)=>{
    const {reviewId} = req.params;
    const data = req.body;
    const userId = req.user.id;
    const errors = validationResult(req);
    const date = new Date();

    if(!errors.isEmpty())
        return res.status(500).json({errors: errors.array()})
    
    try {
        await prisma.comments.create({
            data:{
                post_id:Number(reviewId),
                user_id:Number(userId),
                content:data.content,
                published_at:date
            }
        });
        return res.status(200).json({message:"Success"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}]
const addListComment = [commentValidator,async(req,res)=>{
    const {listId} = req.params;
    const data = req.body;
    const userId = req.user.id;
    const errors = validationResult(req);
    const date = new Date();

    if(!errors.isEmpty())
        return res.status(500).json({errors: errors.array()})
    
    try {
        await prisma.lists_comments.create({
            data:{
                list_id:Number(listId),
                user_id:Number(userId),
                content:data.content,
                published_at:date
            }
        });
        return res.status(200).json({message:"Success"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}]

const deleteComment = async(req,res)=>{
    const {id} = req.params;
    try {
        await prisma.comments.delete({
            where:{id:Number(id)}
        });
        return res.status(200).json({message:"Success"})
    } catch (error) {
        return res.status(500).json({message: error.message});     
    }
}
module.exports={getAllCommentsFromReview,getAllCommentsFromList,addRevComment,addListComment,deleteComment}