import {test, expect} from '@playwright/test';
import { TestData } from '../utils/types';
import testData from '../utils/testData.json';
import { POManager } from '../pageobjects/POManager';



const data = testData as TestData;

test('End to End Test Run', async ({page}) => {

  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  if (!username || !password) {
    throw new Error('TEST_USERNAME or TEST_PASSWORD is missing');
  }

  const poManager= new POManager(page);
  const loginPage= poManager.getLoginPage();
  const eventPage= poManager.getEventsPage();
  const homePage=poManager.getHomePage();
  const eventBookingPage= poManager.getEventBookingPage();
  const myBookingsPage = poManager.getMyBookingsPage();

  await loginPage.login(username,password);
  await eventPage.createEvent(data.eventName, data.eventDescription, data.city, data.venue, data.imageLink)
  await homePage.goToHome();
  const bookingId = await eventBookingPage.bookCreatedEvent();
 
 await myBookingsPage.goToMyBookings();
 await myBookingsPage.verifyBookedEvent(bookingId);

})