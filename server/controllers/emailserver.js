// //const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');

// //const app = express();
// //const PORT = process.env.PORT || 3001;

// //app.use(bodyParser.json());

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'mazhan.technology@gmail.com',
//     pass: 'Mazhan_Tech763',
//   },
// });

// // app.post('/send-email', (req, res) => {
//   const { to, subject, text } = req.body;

//   const mailOptions = {
//     from: 'mazhan.technology@gmail.com',
//     to,
//     subject,
//     text,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).send(error.toString());
//     }
//     res.status(200).send('Email sent: ' + info.response);
//   });
// // });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
