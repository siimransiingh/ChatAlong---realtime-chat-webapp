const User = require("../model/userModel")
const bcrypt = require('bcrypt')

module.exports.register=async(req,res,next)=> {
  try{ const { password, username, email } = req.body;
   const usernameCheck = await User.findOne({username});
   if(usernameCheck)
    return res.json({msg:"username already used", status:false});
    
    const emailcheck = await User.findOne({email})
    if(emailcheck) 
        return res.json({msg:"email already used", status:false});

   const hashPassword = await bcrypt.hash(password,10)
   const user = await User.create({
    email,
    username,
    password: hashPassword
   });
   delete user.password;
   return res.json({status:true,user});}
   catch(error){
    next(error);
   }
}