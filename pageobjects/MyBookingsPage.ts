import { expect, Page, Locator } from "@playwright/test";
import { TestData } from '../utils/types';
import testData from '../utils/testData.json';

const data = testData as TestData;

export class MyBookingsPage{

    page:Page;
    bookingCards: Locator;
    bookingRefNo: Locator;
    bookingHeader: Locator;
    myBookingsLink: Locator;
    customerName: Locator;
    email: Locator;
    phone: Locator;

    constructor(page: Page){
        this.page=page;
        this.myBookingsLink=page.locator('a[href="/bookings"]');
        this.bookingHeader= page.getByRole('heading', { name: 'My Bookings' });
        this.bookingCards = page.locator('div[data-testid="booking-card"]');
        this.bookingRefNo = page.locator('span[class*="booking-ref"]');
        this.customerName= page.getByText(data.customerName);
        this.email=page.getByText(data.customerEmail);
        this.phone=page.getByText(data.customerPhone)

    }

async goToMyBookings(){
    await this.myBookingsLink.first().click();
    await this.bookingCards.first().waitFor({ state: 'visible' });
    await expect (this.bookingHeader).toHaveText("My Bookings");
}


async verifyBookedEvent(bookingId: string){
     await expect(this.bookingCards.first()).toBeVisible();

    const allBookingRef: string[] = await this.bookingRefNo.allTextContents();
    
    for (let i = 0; i < allBookingRef.length; i++) {
  if (allBookingRef[i].trim() === bookingId?.trim()) {
    await this.bookingCards.nth(i).getByRole('button', { name: 'View Details' }).click();
    break;
  }
}
await expect(this.customerName).toHaveText(data.customerName);
await expect(this.email).toHaveText(data.customerEmail);
await expect(this.phone).toHaveText(data.customerPhone);
}

}

