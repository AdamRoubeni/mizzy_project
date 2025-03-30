// backend/server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'eneltdsales@gmail.com', // ✅ NEW sender email
    pass: 'wtxw linm uled gnpn'     // ✅ NEW app password
  }
});


app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email, // user submitting the form
    to: 'eneltdsales@gmail.com', // ✅ NEW recipient
    subject: `Message from ${name}`,
    text: message
  };
  

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email failed:', error);
      res.status(500).send('Error sending email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully!');
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
