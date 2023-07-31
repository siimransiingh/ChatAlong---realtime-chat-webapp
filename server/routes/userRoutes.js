const { register, login,setAvatar,getAllUsers } = require("../contoller/userController");
const router = require("express").Router();


router.post("/register",register)
router.post("/login",login)
router.get("/allusers/:id",getAllUsers)
router.post("/setavatar/:id", setAvatar)

module.exports = router;
