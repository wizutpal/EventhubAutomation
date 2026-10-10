import { expect, Page, Locator } from "@playwright/test";

export class EventsPage{
    page:Page;
    events:Locator ;
addNewEvent:Locator ;
titlePlaceholder:Locator ;
descPlaceholder:Locator ;
occation:Locator ;
city:Locator ;
venue:Locator ;
dateTime:Locator ;
price:Locator ;
seats:Locator ;
imageLink:Locator ;
addEventBtn:Locator ;
createdEventName:Locator ;

    constructor(page: Page){
        this.page=page;
        this.events= page.locator('#nav-events');
        this.addNewEvent= page.getByRole('button', { name: 'Add New Event' });
        this.titlePlaceholder= page.locator('#event-title-input');
        this.descPlaceholder= page.locator("textarea[placeholder*='Describe ']");
        this.occation = page.locator('#category');
        this.city= page.locator('#city');
        this.venue=page.locator('#venue');
        this.dateTime= page.getByLabel('Event Date & Time*');
        this.price= page.getByLabel('Price ($)*');
        this.seats= page.getByLabel('Total Seats*');
        this.imageLink=page.locator('input[id="image-url-(optional)"]')
        this.addEventBtn= page.locator('#add-event-btn');
        this.createdEventName= page.locator("//tbody/tr[4]/td[1]")

    }

   
async createEvent(eventName: string, eventDesc: string, city:string, venue: string, imageLink: string){
  await this.events.click()
 await this.addNewEvent.click();
 await this.titlePlaceholder.fill(eventName);
  await this.descPlaceholder.fill(eventDesc);
 await this.occation.selectOption('Festival');
  await this.city.fill(city);
    await this.venue.fill(venue);
 await this.dateTime.fill('2026-10-27T07:42');
  await this.price.fill('10');
await this.seats.fill('1000');
await this.imageLink.fill(imageLink);
  await this.addEventBtn.click();
  await expect (this.createdEventName).toHaveText(eventName);
}
}