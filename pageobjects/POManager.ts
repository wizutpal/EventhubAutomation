import { Page } from '@playwright/test';
import { EventsPage } from './EventsPage';
import { EventBookingPage } from './EventBookingPage';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { MyBookingsPage } from './MyBookingsPage';

export class POManager {
  private page: Page;
  private eventsPage: EventsPage;
  private eventBookingPage: EventBookingPage;
  private homePage: HomePage;
  private loginPage: LoginPage;
  private myBookingsPage: MyBookingsPage;
  



  constructor(page: Page) {
    this.page = page;

    this.eventsPage = new EventsPage(this.page);
    this.eventBookingPage = new EventBookingPage(this.page);
    this.homePage= new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.myBookingsPage= new MyBookingsPage(this.page);
  }

  getEventsPage(): EventsPage {
    return this.eventsPage;
  }

  getEventBookingPage(): EventBookingPage {
    return this.eventBookingPage;
  }

  getHomePage(): HomePage {
    return this.homePage;
  }
  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getMyBookingsPage(): MyBookingsPage {
    return this.myBookingsPage;
  }
}