# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Login.spec.ts >> Invalid Username Login
- Location: tests\Login.spec.ts:26:6

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Invalid email or password"
Received: ""
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - generic [ref=e6]: RSA
          - generic [ref=e7]: Rahul Shetty Academy
        - generic [ref=e8]:
          - generic [ref=e9]: eventhub.app
          - img "EventHub app preview" [ref=e14]
        - list [ref=e16]:
          - listitem [ref=e17]:
            - generic [ref=e18]: ⚡
            - generic [ref=e19]: Live REST APIs — test real endpoints, not mocks
          - listitem [ref=e20]:
            - generic [ref=e21]: 🔒
            - generic [ref=e22]: Isolated sandbox — your data, your tests, no conflicts
          - listitem [ref=e23]:
            - generic [ref=e24]: 🎫
            - generic [ref=e25]: Auth, CRUD, bookings — flows you'll face on the job
          - listitem [ref=e26]:
            - generic [ref=e27]: 🤖
            - generic [ref=e28]: Built for Selenium, Playwright, RestAssured & more
      - generic [ref=e30]:
        - paragraph [ref=e31]: 50,000+
        - paragraph [ref=e32]: QA engineers trained worldwide
    - generic [ref=e34]:
      - generic [ref=e35]:
        - 'heading "The #1 QA Practice Hub for Automation Engineers" [level=2] [ref=e36]': "The #1 QA Practice Hubfor Automation Engineers"
        - paragraph [ref=e37]: EventHub is a production-grade practice app designed so you can sharpen your testing skills on real-world scenarios — before your next interview or project.
      - link "API Documentation (Swagger)" [ref=e38] [cursor=pointer]:
        - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
      - generic [ref=e41]:
        - generic [ref=e42]:
          - heading "Sign in to EventHub" [level=1] [ref=e46]
          - paragraph [ref=e47]: Enter your credentials to continue
        - generic [ref=e48]:
          - generic [ref=e49]:
            - generic [ref=e50]: Email
            - textbox "Email" [ref=e51]:
              - /placeholder: you@email.com
              - text: utpal@gmail.co
          - generic [ref=e52]:
            - generic [ref=e53]: Password
            - textbox "Password" [ref=e54]:
              - /placeholder: ••••••
              - text: Secret@123
          - button "Sign In" [ref=e55] [cursor=pointer]
        - paragraph [ref=e56]:
          - text: Don't have an account?
          - link "Register" [ref=e57] [cursor=pointer]:
            - /url: /register
      - paragraph [ref=e58]:
        - text: A practice environment by
        - link "RahulShettyAcademy.com" [ref=e59] [cursor=pointer]:
          - /url: https://rahulshettyacademy.com
        - text: — used by QA engineers worldwide to master automation testing.
  - generic [ref=e61]:
    - generic [ref=e63]: ✕
    - paragraph [ref=e64]: Invalid email or password
    - button "Dismiss" [ref=e65] [cursor=pointer]: ×
  - alert [ref=e66]
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | import { TestData } from '../utils/types';
  3  | import testData from '../utils/testData.json';
  4  | import { POManager } from '../pageobjects/POManager';
  5  | 
  6  | 
  7  | 
  8  | const data = testData as TestData;
  9  | const validUsername = process.env.TEST_USERNAME;
  10 |   const password = process.env.TEST_PASSWORD;
  11 |   const invalidUsername = process.env.INVALID_TEST_USERNAME;
  12 | 
  13 | test('Successful Login', async ({page}) => {
  14 | 
  15 |   if (!validUsername || !password) {
  16 |     throw new Error('TEST_USERNAME or TEST_PASSWORD is missing');
  17 |   }
  18 | 
  19 |  const poManager= new POManager(page);
  20 |   const loginPage= poManager.getLoginPage();
  21 |   await loginPage.login(validUsername,password);
  22 |   expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/');
  23 | })
  24 | 
  25 | 
  26 | test.only('Invalid Username Login', async ({page}) => {
  27 | 
  28 |   if (!validUsername || !password) {
  29 |     throw new Error('TEST_USERNAME or TEST_PASSWORD is missing');
  30 |   }
  31 | 
  32 |  const poManager= new POManager(page);
  33 |   const loginPage= poManager.getLoginPage();
  34 |   await loginPage.login(invalidUsername,password);
  35 |   const toastError= page.locator("div[aria-live='polite']");
  36 |   expect(toastError).toBeVisible();
  37 |   const toastText = await toastError.textContent();
> 38 |   expect(toastText?.trim()).toBe('Invalid email or password');
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  39 | })
  40 | 
```