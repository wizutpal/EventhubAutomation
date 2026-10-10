import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';

test('Login to Eventhub', async ({page}) => {
  const loginPage= new LoginPage(page);
  loginPage.login("utpal@gmail.com","Secret@123");

  //Add Event Page
  const eventName: string= "Spirha";
  const eventDesc: string= "This is the description of the event";
  const city: string= "Kolkata"
const venue: string= "Newtown"
const imageLink: string= "https://commons.wikimedia.org/wiki/File:Durga_Puja_image.jpg"

  await page.locator('#nav-events').click();
 await page.getByRole('button', { name: 'Add New Event' }).click();
 await page.locator('#event-title-input').fill(eventName);
  await page.locator("textarea[placeholder*='Describe ']").fill(eventDesc);
  await page.selectOption('#category', 'Festival');
  await page.locator('#city').fill(city);
    await page.locator('#venue').fill(venue);
 await page.getByLabel('Event Date & Time*').fill('2026-10-27T07:42');
  await page.getByLabel('Price ($)*').fill('10');
await page.getByLabel('Total Seats*').fill('1000');
await page.locator('input[id="image-url-(optional)"]').fill(imageLink);
  await page.locator('#add-event-btn').click();
  await expect (page.locator("//tbody/tr[4]/td[1]")).toHaveText(eventName);
 
    
// afte booking go to home
await page.locator('#nav-home').click();
const cards = page.getByRole('article');
await cards.first().waitFor();   // wait for cards to render before reading

const titleNames= await page.locator('h3[class*="font-semi"]').allTextContents();
for(let i=0; i<titleNames.length; i++){
  if(titleNames[i].trim() === eventName){
    await cards.nth(i).getByRole('link', { name: 'Book Now' }).click();
    break;
  }
}

const customerName: string= "Peter Jones";
const email: string="peter@gmail.com";
const phone: string= "1234567890";

await expect (page.locator('h1[class*="text-2xl"]')).toHaveText(eventName); 
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
