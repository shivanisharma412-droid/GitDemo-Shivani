import { Page, Locator, expect } from "@playwright/test";
import * as testData from "../test-data/specialitiesTestData.json";
import { VerifyMethod } from "../utilities/assertions";

export class SpecialitiesPage {

    readonly page: Page;
    private readonly verify: VerifyMethod;
    private readonly specialitiesTab: Locator;
    private readonly searchBar: Locator;
    private readonly table: Locator;
    private readonly tableElement: Locator;
    private readonly noResultFound: Locator;

    constructor(page: Page) {

        this.page = page;
        this.verify = new VerifyMethod(page);

        this.specialitiesTab = page.getByRole('link', { name: 'Specialties' });
        this.searchBar = page.getByPlaceholder('Search for Specialty or Synonym');
        this.table = page.locator('table tbody');
        this.tableElement = page.locator('tbody').locator('tr').getByText(testData.SpecialtiesDetails.searchQuerry);
        this.noResultFound = page.getByRole('heading', { name: 'No Results Found.' });
    }

    /**
     * Function to search Specialties
     * @param searchQuerry : Querry to search Specialty
     */
    
    async searchSpecialities(searchQuerry: string) {

        await this.specialitiesTab.click();
        await this.page.waitForSelector('[placeholder="Search for Specialty or Synonym"]', { state: 'visible' });
        await this.searchBar.click();
        await this.searchBar.fill(testData.SpecialtiesDetails.searchQuerry);

        await this.verify.verifyTableData(0, this.noResultFound, testData.SpecialtiesDetails.searchQuerry, "Results Found",
            "Results Not Found", "Displayed results are not matching with the search querry.");
    }
}