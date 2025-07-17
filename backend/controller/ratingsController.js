const prisma = require("../config/prisma");

const newRating = async(req,res)=>{
    const{rating,raceId} = req.body;
    const userId = req.user.id;
    try {
        await prisma.ratings.create({
            data:{
                user_id:Number(userId),
                race_id:Number(raceId),
                rating:Number(rating)
            }
        });
        return res.status(200).json({message:"Success"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
const updateRating = async(req,res)=>{
    const{rating,raceId} = req.body;
    const userId = req.user.id;
    try {
        await prisma.ratings.update({
            where:{
                user_id_race_id:{
                    user_id:Number(userId),
                    race_id:Number(raceId),
                }               
            },
            data:{
                rating:Number(rating)
            }
        });
        return res.status(200).json({message:"Success"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message});
    }
}

const getRating = async(req,res)=>{
    const{raceId} = req.params;
    const userId = req.user.id;
    try {
       const rat= await prisma.ratings.findFirst({
            where:{
                AND:[
                    {user_id:Number(userId)},
                    {race_id:Number(raceId)},
                ]                
            }
        });

        return res.status(200).json({rating:rat.rating});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

const deleteRating = async(req,res)=>{
    const{raceId} = req.params;
    const userId = req.user.id;
    try {
       await prisma.ratings.delete({
            where:{
                user_id_race_id:{
                    user_id:Number(userId),
                    race_id:Number(raceId),
                }               
            }
        });

        return res.status(200).json({message:"Success"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

module.exports={newRating,updateRating,getRating,deleteRating}