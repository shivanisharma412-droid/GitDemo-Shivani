import { Page, expect, Locator } from '@playwright/test';

export class LoginPage{
  
  private page: Page;
  private emailId: Locator;
  private continueBtn: Locator;
  private username: Locator;
  private signBtn: Locator;
  private nextBtn: Locator;
  private pushBtn: Locator;
  private passCode: Locator;
  private verifyBtn: Locator;
  private googleAccountVerifyId: Locator;
  private openButton:Locator;
 
  constructor(page: Page){
    this.page = page;
    this.emailId = page.getByLabel('Email ID');
    this.continueBtn = page.getByRole('button', { name: 'Continue' });
    this.username = page.getByLabel('Username');
    this.signBtn = page.getByText('Keep me signed in');
    this.nextBtn =  page.getByRole('button', { name: 'Next' })
    this.pushBtn=page.getByLabel('Select to get a push');
    this.passCode =page.locator('[name="credentials.passcode"]');
    this.verifyBtn = page.getByRole('button', { name: 'Verify' });
    this.verifyBtn = page.getByLabel('Select to get a push');
    this.googleAccountVerifyId = page.locator('[data-identifier="shivani.sharma-emids@loyalhealth.com"]');
    this.openButton = page.locator('[href = "/outreach"]');
    
  }


  async LoginToApplication(userName: string,password: string) {
    
     // Fill in user details.
     await this.emailId.click();
     await this.emailId.fill(userName);
     await this.continueBtn.click();
     await this.username.click();
     await this.username.fill(userName);
     await this.signBtn.click();
     await this.nextBtn.click();
  
    /* Handle Octa verification (2FA) by using push notification option.
    /  Octa will send verification notification on Octa app on your registered mobile and then verify from there
    /  approve the verification notification within a second or two as script is running fast.
    */
    await this.pushBtn.click({timeout: 5000});
    await this.page.waitForTimeout(10000);
  
    let passwordField = this.passCode;
    let fieldStatus = await passwordField.isVisible();
    if(fieldStatus){
        passwordField.fill(password)
        await this.verifyBtn.click();
        await this.page.waitForTimeout(8000);
    }
    
    // verifying google account.
    await this.page.waitForTimeout(15000);
    let googleAccountVerify = this.googleAccountVerifyId;
    await expect(googleAccountVerify).toBeVisible({timeout: 100000});
    googleAccountVerify.click({timeout: 10000});
    await expect(this.openButton).toBeVisible({ timeout: 900000 });
  
  }

  async goTo(applicationUrl: string){
    await this.page.goto(applicationUrl);
  }

 
  async clickOnOpenButton(){   
    await this.openButton.waitFor({ state: "visible", timeout: 10000 });
    await this.openButton.click({ timeout: 5000 });
    
  }
  
}

