import { Router } from "express";
import { Request, Response } from "express";
import { google } from "googleapis";
import nodemailer, { TransportOptions, SentMessageInfo } from "nodemailer";

export class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/sendEmail", this.sendEmail);
  }

  sendEmail(req: Request, res: Response): any {
    const emailTo = process.env.APP_EMAIL;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUrl = process.env.REDIRECT_URL;
    const refreshToken = process.env.REFRESH_TOKEN;
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const accessToken = oauth2Client.getAccessToken();

    const sendEmail = async (data: any) => {
      console.dir(data);
      console.dir(emailTo);
      console.dir(clientId);
      console.dir(clientSecret);
      console.dir(redirectUrl);
      console.dir(refreshToken);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: emailTo,
          clientId: clientId,
          clientSecret: clientSecret,
          refreshToken: refreshToken,
          accessToken: accessToken,
        },
      } as TransportOptions);

      const mailData = {
        from: `${data.name} <${data.email}>`,
        to: emailTo,
        subject: `Message from <${data.email}>`,
        generateTextFromHTML: true,
        html: data.message,
      };

      const info: SentMessageInfo = await transporter.sendMail(mailData);

      return info.messageId ? true : false;
    };

    sendEmail(req.body).then((isSent: boolean) => {
      if (isSent) {
        return res.status(201).json({
          success: true,
          msg: "validation.messageSuccess",
        });
      }

      return res.status(400).json({
        success: false,
        msg: "validation.messageFail",
      });
    });
  }
}
