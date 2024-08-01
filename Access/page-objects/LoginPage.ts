import { Page, expect, Locator } from '@playwright/test';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { escape } from 'querystring';

export class LoginPage{
  
  private page: Page;
  private homePage:Locator;
  private emailId: Locator;
  private continueBtn: Locator;
  private username: Locator;
  private signBtn: Locator;
  private nextBtn: Locator;
  private pushBtn: Locator;
  private passCode: Locator;
  private verifyBtn: Locator;
  private googleAccountVerifyId: Locator;
  private openLink: Locator;
  private findCareLink:Locator;
  private healthCareEmailInput:Locator;
  private healthCareContinueButton:Locator;
  private continueButton:Locator;
  private readonly password: Locator;
  private readonly logInBtn: Locator;
 
  constructor(page: Page){
    this.page = page;
    this.homePage = page.locator('//h1[normalize-space()="Dashboard"]')
    this.emailId = page.getByLabel('Email ID');
    this.continueBtn = page.getByRole('button', { name: 'Continue' });
    this.username = page.getByLabel('Username');
    this.signBtn = page.getByText('Keep me signed in');
    this.nextBtn =  page.getByRole('button', { name: 'Next' })
    this.pushBtn=page.getByLabel('Select to get a push');
    this.passCode =page.locator('[name="credentials.passcode"]');
    this.verifyBtn = page.getByRole('button', { name: 'Verify' });
    this.verifyBtn = page.getByLabel('Select to get a push');
    this.googleAccountVerifyId = page.locator('//div[@data-identifier="ramani.das-emids@loyalhealth.com"]');
    this.openLink=page.locator('(//div[@data-testid="solution-title"]//..//..//..//button/div)[1]');
    this.findCareLink = page.locator("//a[@class='header-button' and contains(text(),'Find Care')]");
    this.healthCareEmailInput = page.locator("//input[@name='email']");
    this.healthCareContinueButton = page.getByTestId("sign-in-button");
    this.continueButton=page.locator("//button[contains(@class,'ContinueButton')]");
    this.password = page.locator('[name="password"]');
    this.logInBtn = page.getByRole('button', { name: 'Log in' });
    
    
  }
   // Navigate to the login page.
  async LoginToApplication(baseURL:string,userName: string,password: string) {
    await this.page.goto(process.env.URL+"login");
    if ((process.env.ENVIRONMENT) == "dev") {
     // Fill in user details.
     await this.emailId.click();
     await this.emailId.fill(userName);
     await this.continueBtn.click();
     await this.username.click();
     await this.username.fill(userName);
     await this.nextBtn.click();
  
    /* Handle Octa verification (2FA) by using push notification option.
    /  Octa will send verification notification on Octa app on your registered mobile and then verify from there
    /  approve the verification notification within a second or two as script is running fast.
    */
    await this.pushBtn.click({timeout: 5000});
    await this.page.waitForTimeout(15000);
  
    /*let passwordField = await this.passCode;
   // await expect(passwordField).toBeVisible({timeout: 10000});
    let fieldStatus = await passwordField.isVisible();
    if(fieldStatus){
        passwordField.fill(password)
        await this.verifyBtn.click();
        await this.page.waitForTimeout(8000);
    }*/
    
    // verifying google account.
    await expect(this.googleAccountVerifyId).toBeVisible({timeout:30000});
   // await this.googleAccountVerifyId.waitFor({state:"visible",timeout:30000})
    this.googleAccountVerifyId.click({timeout: 10000});
    await expect(this.homePage).toBeVisible({ timeout: 900000 });
  
  }
  else {
    /**
     * for Developement and Pre-Pod Environment
     * Fill in user details.
     */
    await this.emailId.fill(process.env.USER_AUTOMATION_ID ?? '');
    await this.continueBtn.click();
    await this.password.click();
    await this.password.fill(process.env.USER_AUTOMATION_PASSWORD ?? '');
    await this.logInBtn.click();
    await expect(this.homePage).toBeVisible({ timeout: 900000 });
  }
}

  async navigateToHelathCare(helathCarePortal:string,emailId:string){
    try{
    console.log("Navigate to HealthCare"+helathCarePortal)
    this.page.goto(helathCarePortal);
    console.log("Page loaded successfully");
    await this.healthCareEmailInput.fill(emailId);
    await this.healthCareContinueButton.click();
    await this.username.click();
     await this.username.fill(emailId);
     //await this.signBtn.click();
     await this.nextBtn.click();
  
    /* Handle Octa verification (2FA) by using push notification option.
    /  Octa will send verification notification on Octa app on your registered mobile and then verify from there
    /  approve the verification notification within a second or two as script is running fast.
    */
    await this.pushBtn.click({timeout: 5000});
    await this.page.waitForTimeout(20000);
    await expect(this.googleAccountVerifyId).toBeVisible({timeout:30000});
    this.googleAccountVerifyId.click({timeout: 10000});
    await expect (this.page.locator("//button[contains(@class,'ContinueButton')]")).toBeVisible({timeout:10000});
    await this.page.locator("//button[contains(@class,'ContinueButton')]").click();
    await expect(this.findCareLink).toBeVisible({timeout:30000});
    }
    catch(err){
      if (err instanceof Error) 
        console.log(err.message)
    }
  }

 
  
}

