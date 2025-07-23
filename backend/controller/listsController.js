const {body,validationResult} = require("express-validator");
const prisma = require("../config/prisma");

const listValidator = [
    body("name").trim().isLength({min:2}).withMessage("List name must be at least 2 characters"),
    body("desc").trim().isLength({min:2}).withMessage("List description must be at least 2 characters")
]

const newList = [listValidator,async (req,res)=>{
    const errors = validationResult(req);
    const userId = req.user.id;
    const info = req.body;
    if(!errors.isEmpty())
        return res.status(400).json({message: errors.array()});
    
    try {
        await prisma.lists.create({
            data:{
                name:info.name,
                user_id:Number(userId),
                description:info.desc,
                races:info.races,
                ranked:info.ranked,
                privacy:info.privacy
            }
        });
        return res.status(200).json({message:"Success"});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}]

const getAllLists = async(req,res)=>{
    try {
        const lists = await prisma.lists.findMany({
            where:{
                user_id:Number(userId)
            }
        });
        return res.status(200).json({lists});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const getAllListsFromUser = async (req, res) => {
    const {username} = req.body;
    try {
        const user = await prisma.users.findFirst({
            where:{username}
        });

        const lists = await prisma.lists.findMany({
            where: {
                user_id: user.id
            }
        });

        const newLists = await Promise.all(
            lists.map(async (item) => {
                const covers = await Promise.all(
                    item.races.map(async (id) => {
                        const race = await prisma.races.findFirst({
                            where: { id }
                        });
                        return race?.cover;
                    })
                );

                return {
                    ...item,
                    covers: covers.filter(Boolean)
                };
            })
        );

        return res.status(200).json({ lists: newLists });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


const getList = async(req,res)=>{
    const {listId} = req.params;
    try {
        const list = await prisma.lists.findFirst({
            where:{
                id:Number(listId)
            }
        });

        const racesArray = await prisma.races.findMany({
            where: {
                id: { in: list.races }
            },
            select: {
                id: true,
                cover: true,
                url: true,
                season: true
            }
        });

        const withCovers = {
            ...list,
            races:racesArray
        };
        return res.status(200).json({list:withCovers});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const getListByName = async(req,res)=>{
    const {listName} = req.params;
    const userId = req.user.id;
    try {
        const list = await prisma.lists.findFirst({
            where:{
                user_id:Number(userId),
                name:listName
            }
        });
        return res.status(200).json({list});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const editList = async(req,res)=>{
    const {listId} = req.params;
    const data = req.body;
    try {
        await prisma.lists.update({
            where:{
                id:Number(listId)
            },
            data:{
                name:data.name,
                description:data.desc,
                races:data.races,
                ranked:data.ranked,
                privacy:data.privacy
            }
        });
        return res.status(200).json({message:"Success"})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
const deleteList = async(req,res)=>{
    const {listId} = req.params;
    try {
        await prisma.lists.delete({
            where:{
                id:Number(listId)
            }
        });
        return res.status(200).json({message:"Success"});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const addRace = async(req,res)=>{
    const {listIds,raceId} = req.body;
    
    try {
        await Promise.all(
            listIds.map( async (list)=>{
                const prev = await prisma.lists.findFirst({
                    where:{
                        id:Number(list)
                    }
                });
                if(prev){
                    await prisma.lists.update({
                        where:{id:Number(list)},
                        data:{
                            races:[...prev.races,raceId]
                        }
                    })
                }
            })
        );
        
        return res.status(200).json({message:"OK"})
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}
const likeList = async(req,res)=>{
    const {listId} = req.params;
    const userId = req.user.id;
    try {
        await prisma.lists_likes.create({
            data:{
                list_id:Number(listId),
                user_id:Number(userId)
            }
        });
        return res.status(200).json({message:'ok'})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
const getLikes = async(req,res)=>{
    const {listId} = req.params;
    try {
        const likes = await prisma.lists_likes.aggregate({
            _count:{
                user_id:true
            },
            where:{
                list_id:Number(listId)
            },            
        });
        return res.status(200).json({likes})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
const deleteLike = async(req,res)=>{
    const {listId} = req.params;
    const userId = req.user.id;
    try {
        await prisma.lists_likes.delete({
            where:{
                AND:[
                    {listId:Number(listId)},
                    {userId:Number(userId)}
                ]
            },            
        });
        return res.status(200).json({message:'ok'})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const getIsLiked = async(req,res)=>{
    const userId = req.user.id;
    const {listId}=req.params;
    const liked= await prisma.lists_likes.findFirst({
        where:{
            user_id:Number(userId),
            list_id:Number(listId)
        }
    });
    if(!liked)
        return res.status(200).json({liked:false})
    return res.status(200).json({liked:true})
}

module.exports={newList,getAllLists,getList,deleteList,getListByName,editList,getAllListsFromUser,addRace,likeList,getLikes,deleteLike,getIsLiked}