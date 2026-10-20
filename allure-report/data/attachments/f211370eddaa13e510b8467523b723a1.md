# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Eventhub.spec.ts >> Login to Eventhub
- Location: tests\Eventhub.spec.ts:10:6

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1  | import {Page, Locator, expect} from '@playwright/test'
  2  | import 'dotenv/config';
  3  | 
  4  | export class LoginPage{
  5  | 
  6  |   page: Page;
  7  |   email: Locator;
  8  |   password: Locator;
  9  |   loginBtn: Locator;
  10 |   emailDisplay: Locator;
  11 | 
  12 |     constructor(page: Page){
  13 |       this.page=page;
  14 |       this.email= page.locator('#email');
  15 |       this.password= page.locator('#password');
  16 |       this.loginBtn=page.locator('#login-btn');
  17 |       this.emailDisplay=page.locator('#user-email-display');
  18 |     }
  19 | 
  20 |     
  21 |     async login(username: string, password: string){
> 22 |     await this.page.goto('/');
     |                     ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  23 |       await this.email.fill(username);
  24 |       await this.password.fill(password);
  25 |       await this.loginBtn.click();
  26 |      await expect(this.emailDisplay).toBeVisible();
  27 |        await expect(this.emailDisplay).toHaveText('utpal@gmail.com');
  28 |     }
  29 | 
  30 | }
```