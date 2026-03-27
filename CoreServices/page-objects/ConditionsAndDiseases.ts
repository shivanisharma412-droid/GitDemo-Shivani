import { Page, Locator, expect } from "@playwright/test";
import * as CnDTestData from "../test-data/conditionsAndDiseasesTestData.json";
import { VerifyMethod } from "../utilities/assertions";

export class ConditionsAndDieseasesPage {

    readonly page: Page;
    private readonly verify: VerifyMethod;
    private readonly conditionsAndDiseasesTab: Locator;
    private readonly searchBar: Locator;
    private readonly table: Locator;
    private readonly firstTableElement: Locator;
    private readonly headingText: Locator;

    constructor(page: Page) {

        this.conditionsAndDiseasesTab = page.getByRole('link', { name: 'Conditions & Diseases' });
        this.searchBar = page.getByPlaceholder('Search for Condition, Disease, or Synonym');
        this.table = page.locator('table tbody');
        this.headingText = page.getByText(CnDTestData.search.searchQuerry);
        this.firstTableElement = page.getByRole('cell', { name: CnDTestData.search.searchQuerry });
    }

    /**Function to search Conditions & Dieseases
     *  @ param searchQuerry: Querry to search Conditions & Dieseases
     **/ 

    async searchConditionsAndDiseases(searchQuerry: string) {

        await this.conditionsAndDiseasesTab.click();
        await this.searchBar.click();
        await this.searchBar.fill(CnDTestData.search.searchQuerry);
        await this.firstTableElement.click();
        try {
            await expect(this.headingText).toHaveText(searchQuerry);
            console.log("Results Verified");
        } catch (error) {
            console.log("Failed to verify results");
            throw error;
        }
    }

}