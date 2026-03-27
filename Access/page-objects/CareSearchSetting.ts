import { expect } from "@playwright/test";
import { Locator, Page } from "playwright";

export class CareSearchSetting {
    private page: Page;
    private settingMenu: Locator;
    private createNewSettingsProfile: Locator
    private patientConnectsettings: Locator;
    constructor(page: Page) {
        this.page =page;
        this.settingMenu = page.locator("//a[contains(text(),'Settings')]")
        this.createNewSettingsProfile = page.locator("//div[contains(text(),'Create New Settings Profile')]");
        this.patientConnectsettings = page.locator('//div[contains(@class,"EntityDetailHeader")]')

    }
    // Navigating to Care search setting
    async navigateToSetting() {
        console.log('Navigate to Care search Setting');
        await expect(this.settingMenu).toBeVisible({ timeout: 20000 });
        await this.settingMenu.click({ timeout: 30000 });
        await expect(this.createNewSettingsProfile).toBeVisible({ timeout: 20000 })
    }
    // validating profile list under care search setting
    async validateProfileListDisplayed() {
        expect(this.patientConnectsettings).toBeVisible({ timeout: 30000 });
    }
}