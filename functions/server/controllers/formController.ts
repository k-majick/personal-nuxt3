import type { Request, Response } from "express";
import nodemailer, {
  type TransportOptions,
  type SentMessageInfo,
} from "nodemailer";
import { google } from "googleapis";

export class FormController {
  public sendEmail(req: Request, res: Response): void {
    FormController.sendGmail(req).then((isSent: boolean) => {
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

  public static async sendGmail(data: any): Promise<boolean> {
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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: emailTo,
        pass: "mlmciukmuyitdhml",
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    } as TransportOptions);

    const mailData = {
      from: `${data.body.name} <${data.body.email}>`,
      to: emailTo,
      subject: `Message from <${data.body.email}>`,
      generateTextFromHTML: true,
      html: data.body.message,
    };

    const info: SentMessageInfo = await transporter.sendMail(mailData);

    return info.messageId ? true : false;
  }
}
