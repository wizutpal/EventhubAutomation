import {test, expect} from '@playwright/test';
import { TestData } from '../utils/types';
import testData from '../utils/testData.json';
import { POManager } from '../pageobjects/POManager';


const data = testData as TestData;

test.only('Login to Eventhub', async ({page}) => {
  const poManager= new POManager(page);
  const loginPage= poManager.getLoginPage();
  const eventPage= poManager.getEventsPage();
  const homePage=poManager.getHomePage();
  const eventBookingPage= poManager.getEventBookingPage();
  const myBookingsPage = poManager.getMyBookingsPage();

  await loginPage.login(data.username,data.password);
  await eventPage.createEvent(data.eventName, data.eventDescription, data.city, data.venue, data.imageLink)
  await homePage.goToHome();
  const bookingId = await eventBookingPage.bookCreatedEvent();
 
 await myBookingsPage.goToMyBookings();
 await myBookingsPage.verifyBookedEvent(bookingId);

})