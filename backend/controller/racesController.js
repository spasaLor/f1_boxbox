const prisma = require("../config/prisma");

const getAllRaces = async(req,res)=>{
    try {
        const races = await prisma.races.findMany();
        return res.status(200).json({races:races});
    } catch (error) {
        console.error(error);
        return res.status(400).json({message: error.message});
    }   
}

const getRacesByYear = async(req,res)=>{
    const {year}=req.params;
    try {
        const races = await prisma.races.findMany({
            where:{season:Number(year)}
        })
        return res.status(200).json({races:races});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }   
}
const getRaceByYear = async(req,res)=>{
    const {year,round}=req.params;
    try {
        const race = await prisma.races.findFirst({
            where:{season:Number(year),round:Number(round)}
        });
        if(!race)
            return res.status(404).json({message: "Race not found"});
        return res.status(200).json(race);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }   
}

const addNewRace= async(req,res)=>{
    const data = req.body;
    try {
        await prisma.races.create({
            data:{
                season:Number(data.season),
                round:Number(data.round),
                circuit_name:data.circuit_name,
                location:data.location,
                date:new Date(data.date),
                notes:data.notes
            }
        });
        return res.status(200).json({message:"Success"});
    } catch (error) {
        if(error.name === 'PrismaClientKnownRequestError')
            return res.status(400).json({message: "This round is already in the database"});
        else
            return res.status(500).json({message: error.message});
    }
}

const editRaceData = async(req,res)=>{
    const data = req.body;
    const {id} = req.params;
    try {
        await prisma.races.update({
            where:{id:Number(id)},
            data:{
                season:Number(data.season),
                round:Number(data.round),
                circuit_name:data.circuit_name,
                location:data.location,
                date:new Date(data.date),
                notes:data.notes
            }
        });
        return res.status(200).json({message:"Success"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const deleteRace = async(req,res)=>{
    const {id} = req.params;
    try {
        await prisma.races.delete({
            where:{id:Number(id)}
        });
        return res.status(200).json({message:"Success"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const searchRace = async(req,res)=>{
    const {q}=req.query;
    try {
        const races = await prisma.races.findMany({
            where:{
                OR:[
                    {circuit_name:{contains:q, mode:'insensitive'}},
                    {location: {contains:q, mode:'insensitive'}},
                ]
            }
        });
        return res.status(200).json({races});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
module.exports={getAllRaces,getRacesByYear,getRaceByYear,addNewRace,editRaceData,deleteRace,searchRace}

