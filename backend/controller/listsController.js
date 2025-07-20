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

const getAllListsFromUser = async(req,res)=>{
    const userId=req.user.id;
    try {
        const lists = await prisma.lists.findMany({
            where:{
                user_id:Number(userId)
            }
        });
        return res.status(200).json({lists});
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const getList = async(req,res)=>{
    const {listId} = req.params;
    try {
        const list = await prisma.lists.findFirst({
            where:{
                id:Number(listId)
            }
        });
        return res.status(200).json({list});
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
                listId:Number(listId)
            }
        });
        return res.status(200).json({message:"Success"});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
const addRace = async(req,res)=>{
    const userId = req.user.id;
    const data = req.body;
    console.log(data);
}
module.exports={newList,getAllLists,getList,deleteList,getListByName,editList,getAllListsFromUser,addRace}