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
                password:encrypted,
                propic_url:'https://res.cloudinary.com/dyivwvtyu/image/upload/v1754313059/default_tubmok.avif'
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({errors:[{message:"This email is already linked to a profile"}]});
    }
    res.status(200).json({redirect: "/"});
}]


const editUser = async(req,res)=>{
    const data = req.body;
    const userId = req.user.id;

    try {
        await prisma.users.update({
            where:{id:Number(userId)},
            data:{
                name:data.name,
                surname:data.surname,
                location:data.location,
                website:data.website,
                bio:data.bio
            }
        });
        return res.status(200).json({message:"ok"})
    } catch (error) {
        return res.status(400).json({message:error.message})

    }
}

const getUserData = async(req,res)=>{
    const {username} = req.params;
    try {
        const user = await prisma.users.findFirst({
            where:{username}
        });
        const [viewedCount,followingCount,followerCount,listsCount,latestRatings,reviews,favRaces] = await Promise.all([
            prisma.viewed.count({where:{user_id:user.id}}),
            prisma.following.count({ where: { follower_id: user.id } }),
            prisma.following.count({ where: { following_id: user.id } }),
            prisma.lists.count({ where: { user_id: user.id } }),
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
            user:[user.bio,user.location,user.website,user.propic_url],
            viewed:viewedCount,
            following:followingCount,
            followers:followerCount,
            lists:listsCount,
            latestActivity,
            latestReviews,
            favoriteRaces
        }        
        return res.status(200).json(data);
    
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:error.message});
    }
}

const getUserInfo = async(req,res)=>{
    const userId = req.user.id;
    const user = await prisma.users.findFirst({
        where:{id:Number(userId)},
        select:{name:true,surname:true,bio:true,location:true,website:true,email:true,propic_url:true,username:true}
    });
    const favRaces = await prisma.fav_races.findMany({
        where:{user_id:Number(userId)},
        include:{races:true},
    })
    const races = favRaces.map(item=>({id:item.races.id, cover:item.races.cover}));
    return res.status(200).json({user,races});
}

const followUser = async(req,res)=>{
    const {toFollow} = req.body;
    const userId = req.user.id;

    try {
        const user=await prisma.users.findFirst({
            where:{username:toFollow}
        })
    
        await prisma.following.create({
            data:{
                follower_id:Number(userId),
                following_id:user.id,
                timestamp: new Date()
            }
        });
        return res.status(200).json({message:"ok"})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error.message})
    }
}
const unfollowUser = async(req,res)=>{
    const {toFollow} = req.body;
    const userId = req.user.id;

    try {
        const user=await prisma.users.findFirst({
            where:{username:toFollow}
        })
    
        await prisma.following.delete({
            where:{
                follower_id_following_id:{follower_id:Number(userId),following_id:user.id}
            }
        });
        return res.status(200).json({message:"ok"})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error.message})
    }
}

const getFollowing = async(req,res)=>{
    const userId = req.user.id;
    const {username} = req.params;
    try {
        const user=await prisma.users.findFirst({
            where:{username}
        })
        const followage = await prisma.following.findFirst({
            where:{
                follower_id:Number(userId),
                following_id:user.id
            }
        });
        return res.status(200).json({isFollowing: !!followage})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error.message})
    }

}

const getUserLikes=async(req,res)=>{
    const {username}=req.query;

    try {
        const user = await prisma.users.findFirst({
            where:{username}
        })
        const races = await prisma.race_liked.findMany({
            where:{
                user_id:user.id
            },
            include:{races:{select:{cover:true,season:true,url:true,id:true}}},
            
        });
        return res.status(200).json(races);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

const getActivity = async(req,res)=>{
    const {username}=req.params;

    const u= await prisma.users.findFirst({
        where:{username}
    });

    const activity = await prisma.$queryRaw`
    SELECT 
    username,
    race_id,
    'viewed' AS action,
    timestamp AS activity_date,
    denomination,
    season,
    url
    FROM viewed
    JOIN races
    ON viewed.race_id = races.id
    JOIN users on viewed.user_id = users.id
    WHERE viewed.user_id = ${u.id}

    UNION ALL

    SELECT 
    username,
    race_id,
    'liked' AS action,
    timestamp AS activity_date,
    denomination,
    season,
    null as url
    FROM race_liked
    JOIN races
    ON race_liked.race_id = races.id
    JOIN users on race_liked.user_id = users.id
    WHERE race_liked.user_id = ${u.id}

    UNION ALL

    SELECT 
    username,
    race_id,
    'reviewed' AS action,
    updated_at AS activity_date,
    denomination,
    season,
    url
    FROM reviews
    JOIN races
    ON reviews.race_id = races.id
    JOIN users on reviews.user_id = users.id
    WHERE reviews.user_id = ${u.id}

    UNION ALL

    SELECT 
    username,
    rating,
    'rated' AS action,
    ratings.date AS activity_date,
    denomination,
    season,
    null as url
    FROM ratings
    JOIN races
    ON ratings.race_id = races.id
    JOIN users on ratings.user_id = users.id
    WHERE ratings.user_id = ${u.id}

    UNION ALL

    SELECT 
    username,
    null as rating,
    'liked_review' AS action,
    timestamp AS activity_date,
    denomination,
    season,
    url
    FROM likes
    JOIN reviews
    ON likes.liked_review = reviews.id 
    join races on races.id=reviews.race_id
    join users on reviews.user_id=users.id
    WHERE likes.user_id = ${u.id}

    UNION ALL

    SELECT 
    username,
    null as rating,
    'followed' AS action,
    timestamp AS activity_date,
    null as denomination,
    null as season,
    null as url
    FROM following
    JOIN users
    ON following.following_id = users.id 
    WHERE following.follower_id = ${u.id}

    ORDER BY activity_date DESC;
    `
    return res.status(200).json({activity});
}
const handlePropicUpload = async(req,res)=>{
    try {
        const imageUrl = req.file.path;
        const userId = req.user.id;
        await prisma.users.update({
            where: { id: Number(userId) },
            data: { propic_url: imageUrl },
        });

        res.status(200).json({message:"Ok"});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Upload failed' });
    }
}

const getFollowingActivity = async(req,res)=>{
    const {username}=req.params;

    const u= await prisma.users.findFirst({
        where:{username}
    });

    const following = await prisma.following.findMany({
        where:{
            follower_id:u.id
        },
    });

    if(following.length==0)
        return res.status(200).json({activities:[]})

    const activities = await prisma.$queryRawUnsafe(
        `
        SELECT
        'viewed' AS action,
        v.timestamp as activity_date,
        u.username,
        null as owner_username,
        v.race_id,
        r.denomination,
        r.season,
        r.url
        FROM viewed v
        JOIN following f ON v.user_id = f.following_id
        JOIN races r on v.race_id = r.id
        join users u on u.id=f.following_id
        WHERE f.follower_id = $1

        UNION ALL

        SELECT
        'rated' AS action,
        r.date AS activity_date,
        username,
        null as owner_username,
        rating,
        denomination,
        season,
        null as url
        FROM ratings r
        JOIN following f ON r.user_id = f.following_id
        join races on races.id=r.race_id
        join users on users.id = f.following_id
        WHERE f.follower_id = $1

        UNION ALL

        SELECT
        'reviewed' AS action,
        updated_at AS activity_date,
        username,
        null as owner_username,
        null as rating,
        denomination,
        season,
        url
        FROM reviews
        JOIN races
        ON reviews.race_id = races.id
        JOIN users on reviews.user_id = users.id
        join following on following.following_id = reviews.user_id
        WHERE following.follower_id = $1

        UNION ALL

        SELECT
        'liked' AS action,
        l.timestamp as activity_date,
        username,
        null as owner_username,
        l.race_id,
        denomination,
        season,
        null as url
        FROM race_liked l
        JOIN following f ON l.user_id = f.following_id
        join races on races.id= l.race_id
        join users on users.id=f.following_id
        WHERE f.follower_id = $1
        
        UNION ALL

        SELECT
        'liked_review' AS action,
        likes.timestamp AS activity_date,
        liker.username AS username,          
        owner.username AS owner_username, 
        null as race_id,   
        races.denomination,
        races.season,
        races.url
        FROM likes
        JOIN reviews ON likes.liked_review = reviews.id
        JOIN races ON races.id = reviews.race_id
        JOIN users AS liker ON likes.user_id = liker.id
        JOIN users AS owner ON reviews.user_id = owner.id
        JOIN following f ON f.following_id = liker.id
        WHERE f.follower_id = $1

        UNION ALL

        SELECT
        'followed' AS action,
        f.timestamp AS activity_date,
        follower.username AS username,          
        followed.username AS owner_username,  
        null as race_id,  
        null as denomination,
        null as season,
        null as url
        FROM following f
        JOIN users AS follower ON f.follower_id = follower.id
        JOIN users AS followed ON f.following_id = followed.id
        WHERE f.follower_id IN (
            SELECT following_id FROM following WHERE follower_id = $1)

        ORDER BY activity_date DESC
        `,
        u.id
    )
    res.status(200).json({activities})

}
module.exports={registerUser,getUserData,editUser,getFollowingActivity,getUserInfo,followUser,unfollowUser,getFollowing,getUserLikes,getActivity,handlePropicUpload}