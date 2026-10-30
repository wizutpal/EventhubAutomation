import {Page, Locator, expect} from '@playwright/test'

export class LoginPage{

  page: Page;
  email: Locator;
  password: Locator;
  loginBtn: Locator;
  emailDisplay: Locator;
  toastError: Locator;

    constructor(page: Page){
      this.page=page;
      this.email= page.locator('#email');
      this.password= page.locator('#password');
      this.loginBtn=page.locator('#login-btn');
      this.emailDisplay=page.locator('#user-email-display');
      this.toastError= page.locator('[aria-live="polite"] p');
    }

    
    async login(username: string, password: string){
    await this.page.goto('/');
      await this.email.fill(username);
      await this.password.fill(password);
      await this.loginBtn.click();
    }

}