import { chromium, expect, Locator, Page } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;
    private readonly emailID: Locator;
    private readonly continueBtn: Locator;
    private readonly userName: Locator;
    private readonly keepMeSignedInBtn: Locator;
    private readonly nextBtn: Locator;
    private readonly pushBtn: Locator;
    private readonly password: Locator;
    private readonly logInBtn: Locator;
    private readonly verifyBtn: Locator;
    private readonly googleAccoundSelect: Locator;
    private readonly solCardOptionForDataManagement: Locator;
    private readonly profileMenu: Locator;
    private readonly logOutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailID = page.getByLabel('Email ID');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.userName = page.getByLabel('Username');
        this.keepMeSignedInBtn = page.getByText('Keep me signed in');
        this.nextBtn = page.getByRole('button', { name: 'Next' });
        this.pushBtn = page.getByLabel('Select to get a push');
        this.password = page.locator('[name="password"]');
        this.logInBtn = page.getByRole('button', { name: 'Log in' });
        this.verifyBtn = page.getByRole('button', { name: 'Verify' });
        this.googleAccoundSelect = page.locator(`[data-identifier="${process.env.USER ?? ''}"]`);
        this.solCardOptionForDataManagement = page.getByRole('link', { name: 'Data Management Manage' });
        this.profileMenu = page.getByText('PM');
        this.logOutBtn = page.getByRole('link', { name: 'Log out' });
    }

    // Navigate to the login page.
    async navigateToPortal() {
        await this.page.goto(process.env.URL+"login");
    }

    /** 
     * Function to handle log in process
        Based on the Environment, log in flow will be handled
     **/
    async validLogin() {

        /** selecting environment
         *  for dev Environment
         **/

        if ((process.env.ENVIRONMENT) == "dev") {

            // Fill in user details.
            await this.emailID.fill(process.env.USER ?? '');
            await this.continueBtn.click();
            await this.userName.fill(process.env.USER ?? '');
            await this.keepMeSignedInBtn.click();
            await this.nextBtn.click();
            await this.pushBtn.click();
            await this.page.waitForTimeout(3000);

            // verifying google account.
            (await this.page.waitForSelector(`[data-identifier="${process.env.USER ?? ''}"]`)).isVisible();
            await this.googleAccoundSelect.click();
            await this.page.waitForTimeout(5000);

            // On dashboard Page.
            /* Navigating to Data Management (Core Services) Pod which will land us on 
            /  "Providers tab" which is under "Directory tab" on dashboard.
            */
            await this.solCardOptionForDataManagement.click();
            await this.page.waitForURL('https://app-dev.loyalhealth.com/connect/directory/provider');
            try {
                expect(await this.page.url()).toBe("https://app-dev.loyalhealth.com/connect/directory/provider");
            } catch (error) {
                console.log("Page URL is different.");
            }
        } else {
            /**
             * for Developement and Pre-Pod Environment
             * Fill in user details.
             */
            await this.emailID.fill(process.env.USER_AUTOMATION_ID ?? '');
            await this.continueBtn.click();
            await this.password.click();
            await this.password.fill(process.env.USER_AUTOMATION_PASSWORD ?? '');
            await this.logInBtn.click();

            // On dashboard Page.
            /* Navigating to Data Management (Core Services) Pod which will land us on 
            /  "Providers tab" which is under "Directory tab" on dashboard.
            */
            await this.solCardOptionForDataManagement.click();
            await this.page.waitForURL('https://app-development.loyalhealth.com/connect/directory/provider');
            try {
                expect(await this.page.url()).toBe("https://app-development.loyalhealth.com/connect/directory/provider");
            } catch (error) {
                console.log("Page URL is different.");
            }
        } 
    }

    // This function will logout the user from app.
    async logOut() {

        const profileBtn = await this.profileMenu;
        profileBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.logOutBtn.click();

    }
}

