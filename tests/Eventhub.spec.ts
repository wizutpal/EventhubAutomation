import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { TestData } from '../utils/types';
import testData from '../utils/testData.json';
import { EventsPage } from '../pageobjects/EventsPage';
import { HomePage } from '../pageobjects/HomePage';
import { EventBookingPage } from '../pageobjects/EventBookingPage';


const data = testData as TestData;

test.only('Login to Eventhub', async ({page}) => {
  const loginPage= new LoginPage(page);
  await loginPage.login(data.username,data.password);

  //Adding Event 
  const eventPage= new EventsPage(page);
 await eventPage.createEvent(data.eventName, data.eventDescription, data.city, data.venue, data.imageLink)
  //await expect (page.locator("//tbody/tr[4]/td[1]")).toHaveText(data.eventName);

  //Homepage and Event Book
  const homePage=new HomePage(page);
  const eventBookingPage= new EventBookingPage(page);
  await homePage.goToHome();
  await eventBookingPage.bookCreatedEvent();

})

test('Login to Eventhub1', async ({page}) => {
// after booking go to home
await page.locator('#nav-home').click();
const cards = page.getByRole('article');
await cards.first().waitFor();   // wait for cards to render before reading

const titleNames= await page.locator('h3[class*="font-semi"]').allTextContents();
for(let i=0; i<titleNames.length; i++){
  if(titleNames[i].trim() === data.eventName){
    await cards.nth(i).getByRole('link', { name: 'Book Now' }).click();
    break;
  }
}

const customerName: string= "Peter Jones";
const email: string="peter@gmail.com";
const phone: string= "1234567890";

await expect (page.locator('h1[class*="text-2xl"]')).toHaveText(data.eventName); 
await page.locator('#customerName').fill(customerName);
await page.locator('#customer-email').fill(email);
await page.locator('#phone').fill(phone);
await page.locator('#confirm-booking').click();

await expect(page.locator('h3[class*="text-xl"]')).toHaveText("Booking Confirmed! 🎉")
const bookingRef= await page.locator('span[class*="booking-ref"]').textContent();
console.log(bookingRef);

await page.locator('a[href="/bookings"]').last().click();


const bookingCards = page.locator('div[data-testid="booking-card"]');
const bookingRefNo = page.locator('span[class*="booking-ref"]');

await bookingCards.first().waitFor();   // wait for the list to render

const allBookingRef = await bookingRefNo.allTextContents();

for (let i = 0; i < allBookingRef.length; i++) {
  if (allBookingRef[i].trim() === bookingRef?.trim()) {
    await bookingCards.nth(i).getByRole('button', { name: 'View Details' }).click();
    break;
  }
}

await expect(page.getByText(customerName)).toHaveText(customerName);
await expect(page.getByText(email)).toHaveText(email);
await expect(page.getByText(phone)).toHaveText(phone);

})
