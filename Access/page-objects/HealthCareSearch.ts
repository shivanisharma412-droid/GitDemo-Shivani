import { Locator, Page } from "playwright";
import { expect } from "playwright/test";
export class HelathCareSearch {
    private page: Page;
    private searchInput: Locator;
    private searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator("//input[@name='query']");
        this.searchButton = page.locator("//button[contains(text(),'Search')]");
    }

    async performSearch(searchString: string): Promise<void> {
        console.log("Perform Search");
        await this.searchInput.fill(searchString);
        await this.searchButton.click();
        await this.page.waitForTimeout(20000);
        const searchResult: boolean = await this.page.getByText("results found").isVisible();
        console.log("Search Result " + searchResult);
        const noSearchResult: boolean = await this.page.getByText("Please try your search again.").isVisible();
        console.log("No Search Result " + noSearchResult);
        if (searchResult) {
            await this.verifyFilterOption();
        }
        else if (!searchResult && noSearchResult) {
            await this.verifyFilterOption();
        }
    }

    // Validating Search and filter options
    async verifyFilterOption(): Promise<void> {
        console.log("Verify Filter options");
        await expect(this.page.getByText("results found")).toBeVisible({ timeout: 15000 });
        await expect(this.page.locator("#searchSortBy")).toBeVisible({ timeout: 2000 });
        await expect(this.page.getByRole('heading', { name: 'Insurance' })).toBeVisible({ timeout: 2000 });
        await expect(this.page.locator("#maxDistance")).toBeVisible({ timeout: 2000 });
        await expect(this.page.getByPlaceholder("Enter address, city, or zip code")).toBeVisible({ timeout: 2000 });
        await expect(this.page.locator("#specialty")).toBeVisible({ timeout: 2000 });
        await expect(this.page.getByRole('checkbox', { name: 'Male', exact: true })).toBeVisible({ timeout: 2000 });
        await expect(this.page.getByRole('checkbox', { name: 'Female', exact: true })).toBeVisible({ timeout: 2000 });
        await expect(this.page.locator('#language')).toBeVisible({ timeout: 2000 });
        await expect(this.page.getByTestId('isAcceptingNewPatients')).toBeVisible({ timeout: 1000 });
        await expect(this.page.getByTestId('isOnlineSchedulingAvailable')).toBeVisible({ timeout: 1000 });
        await expect(this.page.getByTestId('fhp')).toBeVisible({ timeout: 1000 });

        await this.page.waitForTimeout(5000);
    }

   

     // validating all chat options are available in chat window
    async verifyingChatOptions(): Promise<void> {
        let allOptionFound: boolean = false;
        console.log("Validating all chat options are available on chat window");
        await this.page.waitForTimeout(20000);
        await this.page.locator("#chat-bubble-svg").waitFor({ state: "visible", timeout: 30000 });
        await expect(this.page.locator("#chat-bubble-svg")).toBeVisible({ timeout: 30000 });
        await this.page.locator("#chat-bubble-svg").click();

        const chatOption: readonly string[] = ["Find a Doctor","COVID-19 Information", "Find a Location", "Get Directions"];
        for (let i: number = 0; i < chatOption.length; i++) {
           allOptionFound =false;
           if(await this.page.getByRole('button', { name: chatOption[i], exact: true }).isVisible()){
            expect(await this.page.getByRole('button', { name: chatOption[i], exact: true }).isVisible(),chatOption[i]+" is visible").toBeTruthy();
           }
           else{
            expect(await this.page.getByRole('button', { name: chatOption[i], exact: true }).isVisible(),chatOption[i]+" is not visible").toBeTruthy();
           }
           
        }
       
    }
}