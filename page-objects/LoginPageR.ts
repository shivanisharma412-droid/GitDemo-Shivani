import { Page, Locator,expect} from 'playwright/test';

export class LoginPage {
  private page: Page;
  private logInText: Locator;
  private emailInput: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logInText = page.locator('//form/div/h2');
    this.emailInput = page.getByLabel('Email ID');
    this.continueButton = page.locator('//button[normalize-space()="Continue"]');
  }

  async goTo(){
    await this.page.goto("https://app-dev.loyalhealth.com/login");
  }

  async validLogin(userName: string) {
    await this.logInText.waitFor({ state: "visible", timeout: 5000 });
    await this.emailInput.click({timeout:5000});
    await this.emailInput.fill(userName);
    await this.continueButton.click({ timeout: 30000 });
    await expect(this.page.locator("//div[@data-testid='solution-title' and contains(text(),'Live')]//..//..//..//button/div")).toBeVisible({ timeout: 900000 });
  }
}
