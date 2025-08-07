const express = require("express");
require("dotenv").config;
const multer = require('multer');
const {storage} = require("./config/cloudinary")
const passport = require("./config/passportSetup");
const controller = require("./controller/mainController");
const session = require("express-session");
const racesRouter = require("./routes/racesRouter");
const reviewRouter = require("./routes/reviewsRouter");
const ratingRouter = require("./routes/ratingsRouter");
const commentRouter = require("./routes/commentsRouter");
const listRouter = require("./routes/listsRouter");
const ensureAuthenticated = require("./config/authMiddleware");

const app = express();
const upload = multer({storage,limits:{fileSize:2*1024*1024}});
app.use(session({secret:process.env.SESSION_SECRET,resave:false,saveUninitialized:false,cookie:{secure:false,httpOnly:true,maxAge:1000*60*60*24,sameSite:'lax'}}));
app.use(express.urlencoded({extended:false}));
app.use(passport.session())
app.use(express.json());

app.use("/races",racesRouter);
app.use("/reviews",reviewRouter);
app.use("/comments",commentRouter);
app.use("/ratings",ratingRouter);
app.use("/lists",listRouter);

app.post("/login",(req,res)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(!user)
            return res.status(400).json({error:info.message})
        else{
            req.logIn(user,(err)=>{
                if (err) {return res.status(400).json({error:err.message})}
                else{
                    res.cookie('username',user.username,{
                        httpOnly:false,
                        maxAge:1000*60*60*24,
                        sameSite:'lax',
                        path:'/'
                    });
                    res.cookie('name',user.name,{
                        httpOnly:false,
                        maxAge:1000*60*60*24,
                        sameSite:'lax',
                        path:'/'
                    })
                    return res.status(200).json({redirect:"/welcome"});
                } 
            })
        }
    })(req,res);
});

app.post("/register",controller.registerUser);
app.get("/me",ensureAuthenticated,(req,res)=>{
    return res.status(200).json({username:req.user.username});
})
app.get("/logout",(req,res)=>{
    req.logOut((err)=>{
        if(err)
            return res.status(400).json({error:err.message});
        res.status(200).json({redirect:"/"})
    })
})
app.get("/user/likes",controller.getUserLikes);
app.get("/user/activity/:username",controller.getActivity);
app.get("/user/activity/:username/following",controller.getFollowingActivity);
app.get("/user/:username",controller.getUserData);
app.get("/user",ensureAuthenticated,controller.getUserInfo);
app.put("/user/edit",ensureAuthenticated,controller.editUser);
app.post("/user/follow",ensureAuthenticated,controller.followUser);
app.get("/user/follow/:username",ensureAuthenticated,controller.getFollowing);
app.delete("/user/follow",ensureAuthenticated,controller.unfollowUser);
app.post("/user/upload_pic",ensureAuthenticated,upload.single('propic'),controller.handlePropicUpload)
app.listen(8080,()=>console.log("Running on http://localhost:8080"));