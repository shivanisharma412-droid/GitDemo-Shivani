import { Locator, Page, expect } from "@playwright/test";
import * as testdata from "../test-data/providersTestData.json";
import path from "path";
import { VerifyMethod } from "../utilities/assertions";

export class ProviderPage {

    readonly page: Page;
    private readonly verify: VerifyMethod;
    private readonly NewProviderBtn: Locator;
    private readonly searchBar: Locator;
    private readonly downloadBtn: Locator;
    private readonly npi: Locator;
    private readonly specialtyMenu: Locator;
    private readonly specialtyOption: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly displayName: Locator;
    private readonly degree: Locator;
    private readonly addProviderBtn: Locator;
    private readonly successMsgToaster: Locator;
    private readonly table: Locator;
    private readonly tableElement: Locator;
    private readonly uploadImage: Locator;
    private readonly deleteProviderBtn: Locator;
    private readonly okBtnDeleteConfirmation: Locator;
    private readonly providerPhotoMenuOption: Locator;
    private readonly basicInformationMenuOption: Locator;
    private readonly middleName: Locator;
    private readonly removePhotoBtn: Locator;
    private readonly saveChangesBtn: Locator;
    private readonly successMsgToaster2: Locator;
    private readonly providerTab: Locator;
    private readonly deleteSuccessToasterMsg: Locator;
    private readonly imageLocator: Locator;
    private readonly noResultsFound: Locator;
    private readonly taxonomyBtn: Locator;
    private readonly addTaxonomyButton: Locator;
    private readonly searchBarTaxonomy: Locator;
    private readonly searchResultsTaxonomy: Locator;
    private readonly treatementsAndProceduresBtn: Locator;
    private readonly addSelectionBtn: Locator;
    private readonly noTaxonomyFound: Locator;
    private readonly addTaxonomySuccessMsgToaster: Locator;
    private readonly filterProviderBtn: Locator;
    private readonly providerSpecialtyFilterDropDown: Locator;
    private readonly providerSpecialtyFilterOption: Locator;
    private readonly applyFiltersBtn: Locator;

    constructor(page: Page) {

        this.page = page;
        this.verify = new VerifyMethod(page);

        this.NewProviderBtn = page.getByRole('button', { name: 'Add Provider' });
        this.searchBar = page.getByPlaceholder('Search for a Provider');
        this.downloadBtn = page.locator('.styles__DownloadIcon-sc-gv3q4a-4 ZDlOk');
        this.npi = page.locator('[name="npi"]');
        this.specialtyMenu = page.locator('[class="Select__input"]');
        this.specialtyOption = page.locator('.Select__menu-list .Select__option').nth(2);
        this.firstName = page.locator('[name="firstName"]');
        this.lastName = page.locator('[name="lastName"]');
        this.degree = page.locator('[name="degree"]');
        this.addProviderBtn = page.getByRole('button', { name: 'Add Provider' });
        this.successMsgToaster = page.getByText((/You’ve successfully added \d+ new provider to Connect\./));
        this.table = page.locator('table tbody');
        this.tableElement = page.locator('tbody').locator('tr').getByText(testdata.SearchProviderDetails.Querry1);
        this.uploadImage = page.locator('[type="file"]');
        this.deleteProviderBtn = page.locator('[class="container-body"]').locator('div').locator('button').getByText('Delete Provider');
        this.okBtnDeleteConfirmation = page.getByRole('button', { name: "Yes, I'm sure" });
        this.providerPhotoMenuOption = page.locator('div nav ul li').filter({ hasText: 'Provider Photo' });
        this.basicInformationMenuOption = page.locator('div nav ul li').filter({ hasText: 'Basic Information' });
        this.middleName = page.locator('#middleName');
        this.removePhotoBtn = page.getByRole('button', { name: 'Remove Photo' });
        this.saveChangesBtn = page.getByRole('button', { name: "Save Changes" });
        this.successMsgToaster2 = page.locator(':text("Successfully updated.")');
        this.providerTab = page.locator('[data-tip="Providers"]');
        this.deleteSuccessToasterMsg = page.locator('[role = "status"]').locator(':text("You’ve successfully deleted")');
        this.imageLocator = page.locator('//div[@xpath="1"]');
        this.noResultsFound = page.getByText('No Results Found.');
        this.taxonomyBtn = page.getByRole('button', { name: 'Taxonomy' });
        this.addTaxonomyButton = page.getByLabel('Open taxonomy');
        this.searchBarTaxonomy = page.getByPlaceholder('Search for specific taxonomies to associate');
        this.searchResultsTaxonomy = page.getByRole('cell', { name: 'Check row' }).locator('span');
        this.treatementsAndProceduresBtn = page.locator('#remote-root-wrapper').getByRole('link', { name: 'Treatments & Procedures' });
        this.addSelectionBtn = page.getByRole('button', { name: '+ Add Selection(s)' });
        this.noTaxonomyFound = page.getByRole('heading', { name: 'No taxonomy to show' });
        this.addTaxonomySuccessMsgToaster = page.locator('[role = "status"]').locator(':text("Successfully updated.")');
        this.filterProviderBtn = page.locator('[aria-label="Filter"]');
        this.providerSpecialtyFilterDropDown = page.getByText('Select a Specialty');
        this.providerSpecialtyFilterOption = page.locator(`[class="react-select-container"] div div :text-is("${testdata.FilterProvider.ProviderSpecialty}")`);
        this.applyFiltersBtn = page.getByRole('button', { name: 'Apply Filters' });
    }

    /**
     * verify list of Providers present on Providers Page
     */
    async verifyProvidersList() {

        await expect(this.table).toBeVisible({ timeout: 100000 });
        const rowCount = await this.table.locator('tr').count();
        if (rowCount > 0) {
            console.log("Verified Provider List.");
        } else {
            console.log("Provider List not Verified. Data Not Available.");
            throw new Error("Provider List not Verified. Data Not Available.");
        }
    }

    /**
     * Function to add Provider to connect
     * @param npi : NPI value of the Provider which is unique
     * @param firstName : First Name of Provider to be added
     * @param lastName : Last Name of Provider to be added
     * @param displayName : Display Name of Provider to be added
     * @param degree : Degree of Provider to be added
     */
    async addProvider(npi: string, firstName: string, lastName: string, displayName: string, degree: string) {

        // Navigate to add new provider window
        await this.NewProviderBtn.click();

        // Fill all the details of new provider
        await this.page.waitForSelector('[name="npi"]');
        await this.npi.fill(npi);
        await this.firstName.click();
        await this.firstName.fill(firstName);
        await this.lastName.click();
        await this.lastName.fill(lastName);
        await this.specialtyMenu.click();
        await this.specialtyOption.click();
        await this.degree.click();
        await this.degree.fill(degree);
        await this.addProviderBtn.click();
        await this.page.waitForLoadState('domcontentloaded');

        try {
            // Wait for the success message to be visible
            await this.successMsgToaster.waitFor({ state: 'visible' });

            // Verify that the success message is visible
            await expect(this.successMsgToaster).toBeVisible();
            await expect(this.successMsgToaster).toContainText('You’ve successfully added 1 new provider to Connect.')
            console.log("Successfully added Provider");
        } catch (error) {
            console.log("Error occured: Provider not added");
        }

        await this.searchProvider(displayName);
    }

    /**
     * This function will search for the provider based on input.
     * @param provider : Provider Name for searching provider
     */
    async searchProvider(provider: string) {

        // Navigating to search provider.
        await this.providerTab.click();
        // Wait for the search input to be available and interactable
        await this.page.waitForSelector('[placeholder="Search for a Provider"]', { state: 'visible' });
        await this.searchBar.click();
        await this.searchBar.clear();
        await this.searchBar.fill(provider);
        await this.verify.verifyTableData(0, this.noResultsFound, provider,
            "Results Found", "Results Not Found", "Result Are Not Matching");
    }

    /**
     * Function to update the provider
     * @param providerName : Name of the Provider to be updated
     * @param updatedValue : Value that needs to be updated in a field. Here we are considering updating Middle Name of the Provider
     * @param filePath : Path of the file that is required to be uploaded. Here we are uploading profile img.
     * @param fileName : File name of the img.
     */
    async updateProviderDetails(providerName: string, updatedValue: string, filePath: string, fileName: string) {

        console.log("Updating user details.");

        // Search provider which needs to be updated
        await this.searchProvider(providerName);

        //navigating to provider from search results
        await this.page.waitForSelector(`text="${providerName}"`, { state: 'visible' });
        await this.tableElement.click();

        // upload profile image
        await this.providerPhotoMenuOption.click();
        await this.uploadFile(filePath,
            fileName);

        // updating middle name
        await this.basicInformationMenuOption.click();
        await expect(this.middleName).toBeVisible({ timeout: 10000 });
        await this.middleName.click();
        await this.middleName.fill(updatedValue);

        await this.saveChangesBtn.waitFor({ state: "attached", timeout: 5000 });
        await this.saveChangesBtn.click();
        await this.successMsgToaster2.waitFor({ state: 'visible' });
        await expect(this.successMsgToaster2).toBeVisible();
        this.searchProvider(providerName);

        //navigating to provider from search results
        await this.page.waitForSelector(`text="${providerName}"`, { state: 'visible' });
        await this.tableElement.click();
        await this.page.waitForLoadState('domcontentloaded');

        try {
            await this.providerPhotoMenuOption.click();
            await this.page.waitForTimeout(10000);
            await expect(this.removePhotoBtn).toBeVisible({ timeout: 50000 });
            console.log("Image Upload Verified Successfully");
        } catch (error) {
            console.log("Image Upload Verification Failed");
            throw new Error("Image Upload Verification Failed");
        }

        try {
            await this.basicInformationMenuOption.click();
            await expect(this.middleName).toHaveValue(updatedValue);
            let actual = await this.middleName.inputValue() ?? '';
            await this.verify.verifyTextContent(actual, updatedValue,
                "Updated Provider Middle Name Successfully", "Provider Not Updated");
        } catch (error) {
            console.error("Provider Not Updated");
            throw new Error("Provider Not Updated");
        }
    }

    /**
     * Function to upload file
     * @param filePath : Path of the file that is required to be uploaded. Here we are uploading profile img.
     * @param fileName : File name of the img.
     */

    async uploadFile(filePath: string, fileName: String) {

        // uncomment searchProvider method below when using uploadFile method individually

        // Search and select provider
        // this.searchProvider(providerName);

        await this.uploadImage.setInputFiles(path.join(filePath, `${fileName}`));
    }

    /**
     * Function to download file
     * @param filePath : Path of the file that is required to be uploaded. Here we are uploading profile img.
     */

    async downloadFile(downloadPath: string) {

        // Navigating to search provider.
        await this.providerTab.click();

        // Wait for the download event and handle it
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadBtn.click()
        ]);

        // Save the downloaded file to the specified path
        const suggestedFilename = download.suggestedFilename();
        const filePath = path.resolve(downloadPath, 'downloads', suggestedFilename);
        await download.saveAs(filePath);

        console.log(`File downloaded and saved at ${filePath}`);
    }

    /**
     * This function will delete the provider.
     * @param providerName : Name of the provider to be deleted.
     */

    async deleteProvider(providerName: string) {

        await this.searchProvider(providerName);

        //navigating to provider from search results
        await this.page.waitForSelector(`text="${providerName}"`, { state: 'visible' });
        await this.tableElement.click();
        await this.deleteProviderBtn.click();
        await this.page.waitForLoadState('load');
        await this.okBtnDeleteConfirmation.click();

        // Navigating to search provider.
        await this.providerTab.click();
        // Wait for the search input to be available and interactable
        await this.page.waitForSelector('[placeholder="Search for a Provider"]', { state: 'visible' });
        await this.searchBar.click();
        await this.searchBar.clear();
        await this.searchBar.fill(providerName);
        await this.page.waitForTimeout(7000);

        try {
            const status = await this.noResultsFound.isVisible();
            if (status) {
                console.log("Provider profile deleted successfully");
            } else {
                console.log("Failed to Delete The Provider Profile.");
                throw new Error("Failed to Delete The Provider Profile.");
            }
        } catch (error) {
            console.log("Failed to Delete The Provider Profile.");
            throw new Error("Failed to Delete The Provider Profile.");
        }
    }

    /**
     * Function to add new taxonomy field to provider
     * @param providerName : Name of the provider where Taxonomy required to be added.
     * @param taxonomy1 : Taxonomy for Conditions And Diseases.
     * @param taxonomy2 : Taxonomy for Treatments And Procedures.
     */
    async addNewTaxonomyFields(providerName: string, taxonomy1: string, taxonomy2: string) {

        // Search provider
        await this.searchProvider(providerName);
        await this.page.waitForSelector(`text="${providerName}"`, { state: 'visible' });

        // select provider
        await this.tableElement.click();
        await this.page.waitForSelector(':text-is("Taxonomy")', { state: 'visible' });

        // Navigate to taxonomy
        await this.taxonomyBtn.click();
        await this.page.waitForSelector('//p[@class="description-header"]', { state: 'visible' });

        // Add Taxonomy to Conditions & Dieseases.
        await this.addTaxonomyButton.click();
        await this.searchBarTaxonomy.click();
        await this.searchBarTaxonomy.fill(taxonomy1);
        await this.page.waitForSelector('table tbody', { state: 'visible' });
        await this.searchResultsTaxonomy.first().click();
        await this.addSelectionBtn.click();
        await this.saveChangesBtn.click();
        await this.page.waitForLoadState('load');
        await this.page.waitForSelector('table tbody', { state: 'visible' });

        await this.verify.verifySearch(1, this.table, this.noResultsFound, taxonomy1,
            "Taxonomy Added to Conditions & Dieseases Successfully", "Failed to add taxonomy in Conditions & Dieseases.");

        // Add Taxonomy to Treatments and Procedures.
        await this.treatementsAndProceduresBtn.click();
        await this.addTaxonomyButton.click();
        await this.searchBarTaxonomy.click();
        await this.searchBarTaxonomy.fill(taxonomy2);
        await this.page.waitForSelector('table tbody tr', { state: 'visible' });

        await this.searchResultsTaxonomy.first().click();
        await this.addSelectionBtn.click();
        await this.saveChangesBtn.click();
        await this.page.waitForSelector('table tbody tr');

        await this.verify.verifySearch(1, this.table, this.noResultsFound, taxonomy2,
            "Taxonomy Added to Treatements and Procedures Successfully.", "Failed to add taxonomy in Treatements and Procedures.");

    }

    /**
     * Function to filter the providers by specialty
     */

    async filterProviderByProviderSpecialty() {

        // Navigating to search provider.
        await this.providerTab.click();
        await this.searchBar.clear();
        await this.filterProviderBtn.click();
        await this.providerSpecialtyFilterDropDown.first().click();
        await this.providerSpecialtyFilterOption.click();
        await this.applyFiltersBtn.click();

        await this.verify.verifyTableData(1, this.noResultsFound, testdata.FilterProvider.ProviderSpecialty,
            "Provider Results Filtered Successfully.", "Failed to Filter Provider Results.", "Filter Result Is Not Matching");
    }

}
