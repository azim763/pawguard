const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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

module.exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedrecovery = await bcrypt.hash(email, 10);
    const user = await User.create({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
      PasswordRecoveryLink: hashedrecovery,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// Update a User by its ID
module.exports.updateUserById = async (req, res, next) => {
  //  console.log(req);
  try {
    const _id = req.params.id;
    const emailCheck = await User.findOne({ _id });
    const { password, rec } = req.body;

    const emailhash = emailCheck.email.hashCode();

    // return res.json(emailhash+ " --- "+req.params.id+" -- "+  emailCheck.email+ "  ---  "  + rec);
    //return res.json(`${encodeURIComponent(emailhash)}  " -- " ${emailCheck.email}"  ---  "  ${ rec}`);
    //return res.json(`${emailhash}  "  ---  "  ${ rec}`);
    const isrecValid = rec == emailhash;
    if (!isrecValid) {
      return res.json({
        msg: "Incorrect Password Recovery Link",
        status: false,
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      //return userId;
      const updatedUser = await User.findByIdAndUpdate(_id, { password: hashedPassword }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
      return res.json(updatedUser);
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.sendemail = async (req, res, next) => {

 try {
   const { email,host } = req.body;
    const userbyemail = await User.findOne({ email });
if (!userbyemail)
      return res.status(404).json({ msg: 'User not found' });
    const userId = userbyemail._id;
    const emailhash = userbyemail.email.hashCode();
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'myvclass.ir',
      host:'mail.myvclass.ir',
    //  port: 587,

      port: 465,
      //  service: process.env.SMTP_SERVICE,
      secure: true,
      domain: "myvclass.ir",
      auth: {
        user: "info@myvclass.ir",
        pass: "Inff00@763",
      },
    });

    mailOptions = {
      from:  {
        name: 'PawGuard',
        address: 'info@myvclass.ir'
    },
      to: email,
      subject: 'Pawguard Password Recovery',
    html:`<a href="${host}/changepassword/${userId}/${emailhash}"> Click to set new password </a>`,
     };
   
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return res.json(error);
       } else {
        return res.json({ status: true, msg: 'The password recovery link has been sent successfully!' });
      //    return res.json(status ,info.response.status);
       }
    }); 
 
  } catch (error) {
    next(error);
    return res.json(error);
  }
};

module.exports.getAllcnUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "firstname",
      "lastname",
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select([
      "firstname",
      "lastname",
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
