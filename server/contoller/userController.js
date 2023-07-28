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


module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};