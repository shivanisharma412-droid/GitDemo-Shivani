import { Page, Locator, expect } from "@playwright/test";
import * as tnPTestData from "../test-data/treatmentsAndProceduresTestData.json";
import { VerifyMethod } from "../utilities/assertions";

export class TreatmentsAndProceduresPage {

    readonly page: Page;
    private readonly verify: VerifyMethod;
    private readonly treatmentsAndProceduresPage: TreatmentsAndProceduresPage;
    private readonly treatmentsAndProceduresTab: Locator;
    private readonly searchBar: Locator;
    private readonly table: Locator;
    private readonly headingText: Locator;
    private readonly firstTableElement: Locator;

    constructor(page) {

        this.treatmentsAndProceduresTab = page.getByRole('link', { name: 'Treatments & Procedures' });
        this.searchBar = page.getByPlaceholder('Search for Treatment, Procedure, or Synonym');
        this.table = page.locator('table tbody');
        this.headingText = page.getByText(tnPTestData.Search.searchQuerry);
        this.firstTableElement = page.getByRole('cell', { name: tnPTestData.Search.searchQuerry, exact: true });
    }

    /**
     * Function to search TreatmentsAndProcedures
     * @param searchQuerry : Querry to search TreatmentsAndProcedures
     */
    
    async searchTreatmentsAndProcedures(searchQuerry: string) {

        this.treatmentsAndProceduresTab.click();
        this.searchBar.click();
        this.searchBar.fill(searchQuerry);

        await this.firstTableElement.click();
        try {
            await expect(this.headingText.nth(2)).toHaveText(searchQuerry);
            console.log("Results Verified");
        } catch (error) {
            console.log("Failed to verify results");
            throw error;
        }
    }

}