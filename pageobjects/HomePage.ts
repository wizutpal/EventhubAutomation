import {expect, Locator, Page} from '@playwright/test'
import { TestData } from '../utils/types';
import testData from '../utils/testData.json';

const data = testData as TestData;

export class HomePage{
 page:Page;
 homeBtn: Locator;
 eventCards: Locator;


    constructor(page: Page){
        this.page=page;
        this.homeBtn= page.locator('#nav-home');
        this.eventCards= page.getByRole('article');
        
    }

    async goToHome(){
        await this.homeBtn.click();
            await expect(this.eventCards.first()).toBeVisible();   // waits until the list renders

    }


}