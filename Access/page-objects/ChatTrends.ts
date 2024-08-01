import { Locator, Page, expect } from "@playwright/test";



export class ChatTrends{
    private page: Page;
    constructor(page:Page){
        this.page = page;
    }
    async selectDateForTrends(){
        expect(this.page.getByPlaceholder('mm/dd/yyyy - mm/dd/yyyy')).toBeVisible({timeout:50000})
        await this.page.getByPlaceholder('mm/dd/yyyy - mm/dd/yyyy').click();
        await this.page.getByLabel('Choose Tuesday, May 7th,').click();
        await this.page.getByLabel('Choose Monday, June 10th,').click();
    }
}