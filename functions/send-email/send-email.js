'use strict';
const express = require('express');
const serverless = require('serverless-http');
const nodemailer = require('nodemailer');
const formidable = require('express-formidable');
const app = express();
const router = express.Router();

require('dotenv').config();

const emailTo = process.env.EMAIL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUrl = process.env.REDIRECT_URL;
const refreshToken = process.env.REFRESH_TOKEN;

app.use(formidable());
app.use('/.netlify/functions/send-email', router); // path must route to lambda

router.post('/', async (req, res) => {
  await sendEmail(req.fields).then(r => {
    if (r === 200) {
      res.status(201).json({
        status: 'ok',
      });
    } else {
      res.status(400).json({
        status: 'fail...',
      });
    }
  });
});

const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

const accessToken = oauth2Client.getAccessToken();

const sendEmail = async data => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: emailTo,
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: `${data.name} <${data.email}>`,
    to: emailTo,
    subject: `Message from <${data.email}>`,
    generateTextFromHTML: true,
    html: data.message,
  };

  const info = await transporter.sendMail(mailOptions);

  if (info.messageId) {
    return 200;
  } else {
    return 400;
  }
};

module.exports.handler = serverless(app);
