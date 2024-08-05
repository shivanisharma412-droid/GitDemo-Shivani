import { Locator, Page, expect } from "@playwright/test";


export class ChatAnalyticsOverall {
    private page: Page
    private downloadCsvLink: Locator
    private dateRangeInput: Locator
    private downloadLink: Locator
    private overAllLink: Locator
    private chatSettingLink: Locator
    constructor(page: Page) {
        this.page = page;

        this.chatSettingLink = page.locator("//a[contains(text(),'Settings')]");

        this.overAllLink = page.locator('sub-nav-link-Overall');

        this.downloadCsvLink = page.locator("//button[contains(text(),'Download CSV')]")

        this.dateRangeInput = page.locator("//input[@placeholder='StartDate - EndDate']");

        this.downloadLink = page.locator("//a[contains(text(),'Download')]");
    }
    // Navigating to chat setting 
    async navigateToChatSetting() {

        await expect(this.chatSettingLink).toBeVisible({ timeout: 50000 });

        await this.chatSettingLink.click({ timeout: 3000 });

        await this.page.waitForTimeout(5000);

        await expect(this.overAllLink).toBeVisible({ timeout: 50000 });

        await this.overAllLink.click({ timeout: 3000 });

        await this.page.waitForTimeout(5000);
    }
    // validating file down with data from start date to end date for as file type .csv
    async verifyDownloadCsvFile(stateDate: string, endDate: string) {
        console.log("Verify download .csv file");

        expect(this.downloadCsvLink).toBeVisible({ timeout: 5000 });

        const dateRange = stateDate + " - " + endDate;

        console.log("data range " + dateRange);

        this.downloadCsvLink.click({ delay: 3000 });

        await this.page.waitForTimeout(3000);
        
        await expect(this.dateRangeInput).toBeVisible({ timeout: 5000 });

        this.dateRangeInput.fill(dateRange)
        await this.downloadLink.click();
        await this.page.waitForTimeout(3000);
        const response = await this.page.waitForResponse(response => response.status() !== 200);
        if (response) {
            await this.page.close();
        }
        else{
        const downloadPromise = this.page.waitForEvent('download');

        const download = await downloadPromise;

        await download.saveAs(download.suggestedFilename());
        }
    }
}
