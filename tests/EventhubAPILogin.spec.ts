import {test, expect, request} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { TestData } from '../utils/types';
import testData from '../utils/testData.json';
import { EventsPage } from '../pageobjects/EventsPage';
import { APIUtils,LoginData } from '../utils/APIUtils';


const loginPayLoad: LoginData = {
  email: 'utpal@gmail.com',
  password: 'Secret@123',
};

const data = testData as TestData;
let token: string;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  token = await apiUtils.getToken();
  await apiContext.dispose();
});

test('Add Event', async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('eventhub_token', value);
  }, token);

  //Add Event Page
  const eventPage= new EventsPage(page);
  await page.goto("https://eventhub.rahulshettyacademy.com/");
  await eventPage.createEvent(data.eventName, data.eventDescription, data.city, data.venue, data.imageLink)
  await expect (page.locator("//tbody/tr[4]/td[1]")).toHaveText(data.eventName);
 
})

