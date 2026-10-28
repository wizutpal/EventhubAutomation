import {test, expect, request} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { TestData } from '../utils/types';
import testData from '../utils/testData.json';
import { EventsPage } from '../pageobjects/EventsPage';
import { APIUtils,LoginData } from '../utils/APIUtils';
import { POManager } from '../pageobjects/POManager';


const loginPayLoad: LoginData = {
  email: 'utpal@gmail.com',
  password: 'Secret@123',
};

const eventPayLoad= {"title":"Event 2 Via API","description":"Event Created via API","category":"Sports","venue":"General Field","city":"Kolkata","eventDate":"2026-10-30T13:15:00.000Z","price":10,"totalSeats":500}

const data = testData as TestData;
let token: string;
let response: any;

/*test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  token = await apiUtils.getToken();
  await apiContext.dispose();
}); */

test.beforeAll(async()=>{
    const apiContext= await request.newContext();
    const apiUtils= new APIUtils(apiContext, loginPayLoad);
    token = await apiUtils.getToken();
    response= await apiUtils.createEvent(eventPayLoad);
  })

test('Add Event', async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('eventhub_token', value);
  }, token);

  //Add Event Page
  const poManager= new POManager(page);
    const eventPage= poManager.getEventsPage();
  await page.goto("https://eventhub.rahulshettyacademy.com/");
  await eventPage.createEvent(data.eventName, data.eventDescription, data.city, data.venue, data.imageLink)
  await expect (page.locator("//tbody/tr[4]/td[1]")).toHaveText(data.eventName);
 
}) 

  

  test('Delete Created Event', async ({page}) => {
  
  
    const poManager= new POManager(page);
    const eventPage= poManager.getEventsPage();
  await page.addInitScript(value =>{
        window.localStorage.setItem('eventhub_token',value);
    },response.token);
    
await page.goto("https://eventhub.rahulshettyacademy.com/admin/events")
   
    await eventPage.deleteEvent(response.eventName);
  
  })



