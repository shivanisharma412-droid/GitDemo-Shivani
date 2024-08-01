import { fail } from "assert";
import { Locator, Page, expect } from "@playwright/test";
import { escape } from "querystring";
import { POManager } from "./POManager";
import { LoginPage } from "./LoginPage";
import * as testdata from "../test-data/testdata.json"

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
    this.page =page;

    this.dashBoardText = page.locator('//h1[normalize-space()="Dashboard"]');
    this.chatOpenButton = page.getByRole('link', { name: 'Chat Manage chat settings and' });
    this.linkTrends = page.getByTestId("sub-nav-link-Trends");
    this.liveChatopenButton = page.getByRole('link', { name: 'Live Chat Accept and monitor' });
    this.queuesLink = page.locator('//ul[@role="tabpanel"]/li/a[normalize-space()="Queues"]');
    this.careSearchOpenButton = page.locator('//div[@data-testid="solution-title" and contains(text(),"Care Search")]');
    this.analyticsLink = page.locator("//a[contains(text(),'Analytics')]");
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
    const poManager = new POManager(this.page);
    const loginPage = poManager.getLoginPage();
    await loginPage.LoginToApplication(testdata.logInDetails.baseURL,testdata.logInDetails.email,testdata.logInDetails.password);
    await this.verifyDashBoard();
    await this.liveChatopenButton.waitFor({ state: "visible", timeout: 10000 });
    await this.liveChatopenButton.click({ timeout: 5000 });
    await this.page.waitForTimeout(5000);
    await expect(this.queuesLink).toBeVisible({ timeout: 90000 });
  }
  async navigateToChat(): Promise<void> {
    const poManager = new POManager(this.page);
    const loginPage = poManager.getLoginPage();
    await loginPage.LoginToApplication(testdata.logInDetails.baseURL,testdata.logInDetails.email,testdata.logInDetails.password);
    await this.verifyDashBoard();
    await this.chatOpenButton.waitFor({ state: "visible", timeout: 10000 });
    await this.chatOpenButton.click({ timeout: 5000 });
    await this.page.waitForTimeout(2000);
    await expect(this.linkTrends).toBeVisible({ timeout: 90000 });
  }
  async navigateToCareSearch(): Promise<void> {
    const poManager = new POManager(this.page);
    const loginPage = poManager.getLoginPage();
    await loginPage.LoginToApplication(testdata.logInDetails.baseURL,testdata.logInDetails.email,testdata.logInDetails.password);
    await this.verifyDashBoard();
    await expect(this.careSearchOpenButton).toBeVisible({ timeout: 20000 });
    await this.careSearchOpenButton.click({timeout:3000});
    await expect(this.analyticsLink).toBeVisible({ timeout: 90000 });
    console.log('Navigate to care search sucessfully');
  }
  
}