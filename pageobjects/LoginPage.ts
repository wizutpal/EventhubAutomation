import {Page, Locator, expect} from '@playwright/test'

export class LoginPage{

  page: Page;
  email: Locator;
  password: Locator;
  loginBtn: Locator;
  emailDisplay: Locator;

    constructor(page: Page){
      this.page=page;
      this.email= page.locator('#email');
      this.password= page.locator('#password');
      this.loginBtn=page.locator('#login-btn');
      this.emailDisplay=page.locator('#user-email-display');
    }

    
    async login(username: string, password: string){
    await this.page.goto('https://eventhub.rahulshettyacademy.com/login');
      await this.email.fill(username);
      await this.password.fill(password);
      await this.loginBtn.click();
     await expect(this.emailDisplay).toBeVisible();
       await expect(this.emailDisplay).toHaveText('utpal@gmail.com');
    }

}