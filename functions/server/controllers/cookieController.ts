import type { Request, Response } from "express";

export class CookieController {
  public checkConsentCookie(req: Request, res: Response): void {
    req.cookies?.consent
      ? res.status(200).send(req.cookies?.consent)
      : res.sendStatus(204);
  }

  public saveConsentCookie(req: Request, res: Response): void {
    const isProduction = process.env.NODE_ENV === "production";
    const domain = isProduction ? ".cyberleaf.pl" : "localhost";
    const userChoice = req.body.consent;

    res.cookie("consent", userChoice, {
      httpOnly: true,
      domain,
      maxAge: 900000,
    });

    res.sendStatus(200);
  }
}
