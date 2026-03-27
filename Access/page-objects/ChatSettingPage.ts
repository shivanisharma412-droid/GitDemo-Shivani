import { Locator, Page, expect } from "playwright/test";
import { AddUser } from "./AddUserPage";

export class ChatSettingPage {

    private page: Page;

    private addUserpage: AddUser;

    private chatSettingLink: Locator

    private botProfilesLink: Locator

    constructor(page: Page) {
        this.page = page;
        
        this.addUserpage = new AddUser(page);

        this.chatSettingLink = page.locator("//a[contains(text(),'Settings')]");

        this.botProfilesLink = page.locator("//a[contains(text(),'Bot Profiles')]");
    }
    //Navigate to chat setting
    async navigateToChatSetting() {
        await expect(this.chatSettingLink).toBeVisible({ timeout: 50000 });

        await this.chatSettingLink.click({ timeout: 3000 });
        await this.page.waitForTimeout(5000);
    }
    // Validating to Add user with email and queues name
    async verifyAdduser(userEmail: string, queuesName: string) {
        await this.navigateToChatSetting();
        await this.addUserpage.addUserDetails(userEmail, queuesName);
    }

    // Validating number of list Bot profiles displaying on chat setting screen
    async verifyListOfBotProfiles() {

        console.log('Verify ListOf Bot Profiles in chat setting page');

        await this.navigateToChatSetting();

        await expect(this.botProfilesLink).toBeVisible({ timeout: 50000 });

        await this.botProfilesLink.click({ timeout: 3000 });

        await this.page.waitForTimeout(5000);

        const noofBotProfilesList = this.page.$$("//div[contains(@class,'BotProfileContainer')]/div");

        console.log((await noofBotProfilesList).length);

        expect(((await noofBotProfilesList).length)).toBeGreaterThanOrEqual(1);

    }

}