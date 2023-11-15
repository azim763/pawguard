const {
  login,
  register,
  getAllUsers,
  getAllcnUsers,
  setAvatar,
  updateUserById,
  sendemail,
  logOut,
} = require("../controllers/userController");
// const {
//   sendmail
// } = require("../controllers/emailserver");
const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/", getAllUsers);
router.get("/alluserscn/:id", getAllcnUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.put("/update/:id", updateUserById);
router.post("/sendemail", sendemail);
module.exports = router;
