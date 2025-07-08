const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const prisma = require('./prisma');
const bcrypt = require("bcrypt");

const strat = new LocalStrategy(async(username,password,done)=>{
    const user = await prisma.users.findUnique({
        where:{username:username}
    })
    if(!user)
        return done (null,false,{message:"User not found"});
    
    const match = await bcrypt.compare(password,user.password);
    if(!match)
        return done(null,false,{message:"Wrong password"});

    return done(null,user);
});

passport.use(strat);

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    const user = await prisma.users.findUnique({
        where:{id:id}
    });
    if(user)
        done(null,user);
})

module.exports=passport;