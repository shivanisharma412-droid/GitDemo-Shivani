import { Locator, Page } from "playwright";
import { expect } from "playwright/test";
import { DashBoard } from "./dashBoard";

export class AnalyticsTrends {
    private page: Page;
    private popularQueries: Locator
    private dashBoardPage: DashBoard;
    constructor(page: Page) {
        this.page = page;
        this.popularQueries = page.locator('//span[contains(text(),"Popular Queries")]//..//..//..//div[contains(text(),"Search Queries")]');
    }
    // verifing list of search queues are displaying.
    async verifyQueriesdisplying(params: void) {
        await expect(this.popularQueries).toBeVisible({ timeout: 60000 });

    }
}