const express = require("express");
require("dotenv").config;
const passport = require("./config/passportSetup");
const controller = require("./controller/mainController");
const session = require("express-session");
const racesRouter = require("./routes/racesRouter");
const reviewRouter = require("./routes/reviewsRouter");
const commentRouter = require("./routes/commentsRouter");

const app = express();
app.use(session({secret:process.env.SESSION_SECRET,resave:false,saveUninitialized:false}));
app.use(express.urlencoded({extended:false}));
app.use(passport.session())
app.use(express.json());

app.use("/races",racesRouter);
app.use("/reviews",reviewRouter);
app.use("/comments",commentRouter);

app.post("/login",(req,res)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(!user)
            return res.status(400).json({error:info.message})
        else
            return res.status(200).json({redirect:"/"});
    })(req,res);
});

app.post("/register",controller.registerUser)
app.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err)
            return next(err)
        res.redirect("/");
    })
})
app.listen(8080,()=>console.log("Running on http://localhost:8080"));