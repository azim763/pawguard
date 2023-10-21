const {
  login,
  register,
  getAllUsers,
  getAllcnUsers,
  setAvatar,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/", getAllUsers);
router.get("/alluserscn/:id", getAllcnUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
