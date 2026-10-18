import {expect, Locator, Page} from '@playwright/test'
import { TestData } from '../utils/types';
import testData from '../utils/testData.json';

const data = testData as TestData;

export class EventBookingPage{

      cards: Locator;
  eventNames: Locator;
  eventNameInBooking: Locator;
  name: Locator;
  email: Locator;
  phone: Locator;
  confirmBtn: Locator;
  successMsg: Locator;
  bookingRef: Locator;

constructor(page: Page){
       
        this.cards = page.getByRole('article');
        this.eventNames= page.locator('h3[class*="font-semi"]')
        this.eventNameInBooking= page.locator('h1[class*="text-2xl"]');
        this.name= page.locator('#customerName');
        this.email= page.locator('#customer-email');
        this.phone= page.locator('#phone');
        this.confirmBtn= page.locator('#confirm-booking')
        this.successMsg= page.locator('h3[class*="text-xl"]');
        this.bookingRef=  page.locator('span[class*="booking-ref"]')

    }

    async bookCreatedEvent(): Promise<string> {       
//const cards = page.getByRole('article');
//await cards.first().waitFor();   // wait for cards to render before reading

const titleNames= await this.eventNames.allTextContents();
for(let i=0; i<titleNames.length; i++){
  if(titleNames[i].trim() === data.eventName){
    await this.cards.nth(i).getByRole('link', { name: 'Book Now' }).click();
     await expect (this.eventNameInBooking).toBeVisible();
    break;
  }
}

    await expect (this.eventNameInBooking).toHaveText(data.eventName); 
    await this.name.fill(data.customerName);
    await this.email.fill(data.customerEmail);
    await this.phone.fill(data.customerPhone);
    await this.confirmBtn.click();
    
    await expect(this.successMsg).toHaveText("Booking Confirmed! 🎉")
    const bookingId= await this.bookingRef.textContent();
    
     if (!bookingId) {
    throw new Error('Booking ID was not found');
  }
    console.log(bookingId);
    return bookingId;
}
}