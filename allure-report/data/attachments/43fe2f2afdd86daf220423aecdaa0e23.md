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
  2  | 
  3  | export class LoginPage{
  4  | 
  5  |   page: Page;
  6  |   email: Locator;
  7  |   password: Locator;
  8  |   loginBtn: Locator;
  9  |   emailDisplay: Locator;
  10 | 
  11 |     constructor(page: Page){
  12 |       this.page=page;
  13 |       this.email= page.locator('#email');
  14 |       this.password= page.locator('#password');
  15 |       this.loginBtn=page.locator('#login-btn');
  16 |       this.emailDisplay=page.locator('#user-email-display');
  17 |     }
  18 | 
  19 |     
  20 |     async login(username: string, password: string){
> 21 |     await this.page.goto('/');
     |                     ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  22 |       await this.email.fill(username);
  23 |       await this.password.fill(password);
  24 |       await this.loginBtn.click();
  25 |      await expect(this.emailDisplay).toBeVisible();
  26 |        await expect(this.emailDisplay).toHaveText('utpal@gmail.com');
  27 |     }
  28 | 
  29 | }
```