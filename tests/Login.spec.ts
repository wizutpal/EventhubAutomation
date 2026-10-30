import {test, expect} from '@playwright/test';
import { POManager } from '../pageobjects/POManager';
import dotenv from 'dotenv';
dotenv.config();

const validUsername = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;
  const invalidUsername = process.env.INVALID_TEST_USERNAME;

test('Successful Login', async ({page}) => {

  if (!validUsername || !password) {
    throw new Error('TEST_USERNAME or TEST_PASSWORD is missing');
  }

 const poManager= new POManager(page);
  const loginPage= poManager.getLoginPage();
  await loginPage.login(validUsername,password);
  await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/');
  await expect(loginPage.emailDisplay).toBeVisible();
      await expect(loginPage.emailDisplay).toHaveText('utpal@gmail.com');
})


test('Invalid Username Login', async ({page}) => {

  if (!invalidUsername || !password) {
    throw new Error('INVALID_TEST_USERNAME or TEST_PASSWORD is missing');
  }

 const poManager= new POManager(page);
  const loginPage= poManager.getLoginPage();
  await loginPage.login(invalidUsername,password);  
  expect(loginPage.toastError).toBeVisible();
  const toastText = await loginPage.toastError.textContent();
  expect(toastText?.trim()).toBe('Invalid email or password');
})
