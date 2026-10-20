import {test, expect} from '@playwright/test';
import { TestData } from '../utils/types';
import testData from '../utils/testData.json';
import { POManager } from '../pageobjects/POManager';



const data = testData as TestData;

test.only('Delete Created Event', async ({page}) => {

  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  if (!username || !password) {
    throw new Error('TEST_USERNAME or TEST_PASSWORD is missing');
  }

  const poManager= new POManager(page);
  const loginPage= poManager.getLoginPage();
  const homePage= poManager.getHomePage();
  const eventPage= poManager.getEventsPage();


  await loginPage.login(username,password);
  const eventName=  await eventPage.createEvent(data.eventNameForDelete, data.eventDescription, data.city, data.venue, data.imageLink);
  await eventPage.deleteEvent(eventName);

})