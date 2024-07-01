import { fail } from "assert";
import { Locator, Page, expect } from "@playwright/test";
import { escape } from "querystring";

export class DashBoard {
    private page : Page;
  private  dashBoardText : Locator;
  private chatOpenButton : Locator;
  private liveChatopenButton : Locator;
  private analyticsLink : Locator;
  private careSearchOpenButton : Locator;
  private linkTrends : Locator;
  private queuesLink : Locator;

  constructor(page: Page) {
    this.dashBoardText = page.locator('//h1[normalize-space()="Dashboard"]');
    this.chatOpenButton = page.locator('//div[normalize-space()="Chat"]//..//../..//button/div[contains(text(),"Open")]');
    this.linkTrends = page.getByTestId("sub-nav-link-Trends");
    this.liveChatopenButton = page.locator('//div[normalize-space()="Live Chat"]//..//../..//button/div[contains(text(),"Open")]');
    this.queuesLink = page.locator('//ul[@role="tabpanel"]/li/a[normalize-space()="Queues"]');
    this.careSearchOpenButton = page.locator('//div[@data-testid="solution-title" and contains(text(),"Care Search")]//..//..//..//button/div');
    this.analyticsLink = page.locator("//a[normalize-space()='Analytics']");
  }
  async verifyDashBoard(): Promise<String| null> {
    try {
        //let testvalue:string|null;
        // Wait for the element to be visible
        await this.dashBoardText.waitFor({ state: "visible", timeout: 10000 });
        // Get the text content of the element
           return await this.dashBoardText.textContent();
      
    } catch (e) {
        fail("Failed due to exception: " + e);
    }
}
  async navigateToLiveChat(): Promise<void> {
    await this.liveChatopenButton.waitFor({ state: "visible", timeout: 10000 });
    await this.liveChatopenButton.click({ timeout: 5000 });
    await expect(this.queuesLink).toBeVisible({ timeout: 90000 });
  }
  async navigateToChat(): Promise<void> {
    await this.chatOpenButton.waitFor({ state: "visible", timeout: 10000 });
    await this.chatOpenButton.click({ timeout: 5000 });
    await expect(this.linkTrends).toBeVisible({ timeout: 90000 });
    await this.linkTrends.click({ timeout: 50000 });
  }
  async navigateToCareSearch(): Promise<void> {
    await this.careSearchOpenButton.waitFor({ state: "visible", timeout: 10000 });
    await this.careSearchOpenButton.click({ timeout: 5000 });
    await expect(this.analyticsLink).toBeVisible({ timeout: 90000 });
  }
  
}