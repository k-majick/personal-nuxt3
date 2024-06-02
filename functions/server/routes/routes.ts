import { Router } from "express";
import { FormController } from "../controllers/formController";
import { CookieController } from "../controllers/cookieController";

export class Routes {
  public router: Router;
  public formController: FormController = new FormController();
  public cookieController: CookieController = new CookieController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/sendEmail", this.formController.sendEmail);
    this.router.post("/consentCheck", this.cookieController.checkConsentCookie);
    this.router.post("/consentSave", this.cookieController.saveConsentCookie);
  }
}
