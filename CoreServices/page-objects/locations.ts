import { Locator, Page, expect } from "@playwright/test";
import { VerifyMethod } from "../utilities/assertions";
import * as locationsTestData from "../test-data/locationsTestData.json";
import path from "path";

export class LocationsPage {

    readonly page: Page;
    private readonly verify: VerifyMethod;
    private readonly locationsTab: Locator;
    private readonly searchBar: Locator;
    private readonly table: Locator;
    private readonly tableElement: Locator;
    private readonly noResultsFound: Locator;
    private readonly filterLocationBtn: Locator;
    private readonly filterDropDownMenu: Locator;
    private readonly locationsTypeFilterOption: Locator;
    private readonly applyFiltersBtn: Locator;
    private readonly addNewLocationBtn: Locator;
    private readonly locationName: Locator;
    private readonly address1: Locator;
    private readonly address2: Locator;
    private readonly city: Locator;
    private readonly cityMenuOption: Locator;
    private readonly state1: Locator;
    private readonly state1MenuOption: Locator;
    private readonly zipCode: Locator;
    private readonly phone: Locator;
    private readonly locationType1: Locator;
    private readonly locationType1MenuOption: Locator;
    private readonly ancillaryServiceRadioBtn: Locator;
    private readonly saveBtn: Locator;
    private readonly successMsgToaster: Locator;
    private readonly uploadImage: Locator;
    private readonly fax: Locator;
    private readonly websiteURL: Locator;
    private readonly appointmentURL: Locator;
    private readonly virtualCareURL: Locator;
    private readonly displayURL: Locator;
    private readonly saveChangesBtn: Locator;
    private readonly locationPhotoMenuOption: Locator;
    private readonly locationInformationMenuOption: Locator;
    private readonly removePhotoBtn: Locator;
    private readonly successMsgToaster2: Locator;
    constructor(page: Page) {

        this.page = page;
        this.verify = new VerifyMethod(page);
        this.locationsTab = page.getByRole('link', { name: 'Locations' });
        this.searchBar = page.getByPlaceholder('Search for a Location');
        this.table = page.locator('table tbody');
        this.tableElement = page.getByRole('cell', { name: `${locationsTestData.SearchLocationDetails.searchQuerry}` });
        this.noResultsFound = page.getByRole('heading', { name: 'No Results Found.' });
        this.filterLocationBtn = page.locator('[aria-label="Filter"]');
        this.filterDropDownMenu = page.locator('.ConnectSelect__value-container');
        this.locationsTypeFilterOption = page.locator(`//div[text()= "${locationsTestData.LocationsFilters.LocationType}"]`);
        this.applyFiltersBtn = page.getByRole('button', { name: 'Apply Filters' });
        this.addNewLocationBtn = page.getByRole('button', { name: 'Add Location' });
        this.locationName = page.getByLabel('Enter Location Name');
        this.address1 = page.getByLabel('Enter Address 1');
        this.address2 = page.getByLabel('Enter Address 2');
        this.city = page.getByLabel('Enter City');
        this.state1 = page.locator('.ConnectSelect__control').first();
        this.state1MenuOption = page.getByText(locationsTestData.AddNewLocation.State, { exact: true });
        this.zipCode = page.getByLabel('Enter Zip Code');
        this.phone = page.getByLabel('Enter Phone');
        this.locationType1 = page.locator('.ConnectSelect__control').nth(1);
        this.locationType1MenuOption = page.getByLabel('Modal Label').getByText(locationsTestData.AddNewLocation.LocationType, { exact: true });
        this.ancillaryServiceRadioBtn = page.locator('label').filter({ hasText: 'No' }).locator('span');
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.successMsgToaster = page.getByText((/You’ve successfully added \d+ new location to Connect\./));
        this.uploadImage = page.locator('[type="file"]');
        this.fax = page.locator('#faxNumber');
        this.websiteURL = page.getByLabel('Website URL');
        this.appointmentURL = page.getByLabel('Appointment URL');
        this.virtualCareURL = page.getByLabel('Virtual Care URL');
        this.displayURL = page.getByLabel('Display URL');
        this.saveChangesBtn = page.getByRole('button', { name: 'Save Changes' });
        this.locationPhotoMenuOption = page.locator('div nav ul li').filter({ hasText: 'Location Photo' });
        this.locationInformationMenuOption = page.locator('div nav ul li').filter({ hasText: 'Location Information' });
        this.removePhotoBtn = page.getByRole('button', { name: 'Remove Photo' });
        this.successMsgToaster2 = page.locator(':text("Successfully updated.")');
    }

    /**
     * 
     * @param locationName : Name of location to be added
     * @param address1 : Address1 of location to be added
     * @param address2 : Address2 of location to be added
     * @param city : City of location to be added
     * @param zipCode : ZipCode of location to be added
     * @param phone : Phone number of location to be added
     * @param locationType1 : Type of location to be added
     */
    async addLocation(locationName: string, address1: string, address2: string, city: string,
        zipCode: string, phone: string, locationType1: string) {

        await this.page.waitForSelector('//a[@data-tip="Locations"]', { state: 'visible' });
        await this.locationsTab.click();
        await this.addNewLocationBtn.click()
        await this.locationName.click();
        await this.locationName.fill(locationName);
        await this.address1.click();
        await this.address1.fill(address1);
        await this.address2.click();
        await this.address2.fill(address2);
        await this.city.fill(city);
        await this.state1.click();
        await this.state1MenuOption.click();
        await this.zipCode.click();
        await this.zipCode.fill(zipCode);
        await this.phone.click();
        await this.phone.fill(phone);
        await this.locationType1.click();
        await this.locationType1MenuOption.click();
        await this.ancillaryServiceRadioBtn.click();
        await this.saveBtn.click();
        await this.successMsgToaster.waitFor({ state: 'visible' });
        await this.searchLocation(locationName);
    }

    async updateLocation(location: string, fax: string, websiteURL: string, appointmentURL: string,
        virtualCareURL: string, displayURL: string) {

        await this.page.waitForSelector('//a[@data-tip="Locations"]', { state: 'visible' });
        await this.locationsTab.click();
        await this.searchLocation(location);

        //navigating to provider from search results
        await this.page.waitForSelector(`text="${location}"`, { state: 'visible' });
        await this.tableElement.click();

        await this.locationPhotoMenuOption.click();
        await this.uploadFile(locationsTestData.UpdateLocations.uploadFilePath, locationsTestData.UpdateLocations.uploadFileName,);
        await this.locationInformationMenuOption.click();
        // await this.fax.click();
        // await this.fax.selectText();
        // await this.page.keyboard.press('backspace');
        // await this.fax.fill(fax);
        await this.websiteURL.click();
        await this.websiteURL.fill(websiteURL);
        await this.appointmentURL.click();
        await this.appointmentURL.fill(appointmentURL);
        await this.virtualCareURL.click();
        await this.virtualCareURL.fill(virtualCareURL);
        await this.displayURL.click();
        await this.displayURL.fill(displayURL);
        await this.saveChangesBtn.waitFor({ state: "attached", timeout: 5000 });
        await this.saveChangesBtn.click();

        await this.successMsgToaster2.waitFor({ state: 'visible' });
        await expect(this.successMsgToaster2).toBeVisible();

        await this.searchLocation(location);
        await this.page.waitForSelector(`text="${location}"`, { state: 'visible' });
        await this.tableElement.click();
        await this.page.waitForLoadState('domcontentloaded');

        try {
            await this.locationPhotoMenuOption.click();
            await this.page.waitForTimeout(10000);
            await expect(this.removePhotoBtn).toBeVisible({ timeout: 50000 });
            console.log("Image Upload Verified Successfully");
        } catch (error) {
            console.log("Image Upload Verification Failed");
            throw new Error("Image Upload Verification Failed");
        }

        try {
            await this.locationInformationMenuOption.click();
            
            // await this.verify.verifyAttribute(this.fax, "value", locationsTestData.UpdateLocations.fax,
            // "Updated Location Fax Number Successfully", "Fax Number Not Updated to Location");
            
            await this.verify.verifyAttribute(this.websiteURL, "value", locationsTestData.UpdateLocations.websiteURL,
            "Updated Location Website URL Successfully", "Website URL Not Updated to Location");

            await this.verify.verifyAttribute(this.appointmentURL, "value", locationsTestData.UpdateLocations.appointmentURL,
            "Updated Location Appointment URL Successfully", "Appointment URL Not Updated to Location");

            await this.verify.verifyAttribute(this.virtualCareURL, "value", locationsTestData.UpdateLocations.virtualURL,
            "Updated Location Virtual Care URL Successfully", "Virtual Care URL Not Updated to Location");

            await this.verify.verifyAttribute(this.displayURL, "value", locationsTestData.UpdateLocations.displayURL,
            "Updated Location Display URL Successfully", "Display URL Not Updated to Location");
        } catch (error) {
            console.error("Location Not Updated");
            throw new Error("Location Not Updated");
        }



    }
    async uploadFile(filePath: string, fileName: String) {

        // uncomment searchProvider method below when using uploadFile method individually

        // Search and select provider
        // this.searchProvider(providerName);

        await this.uploadImage.setInputFiles(path.join(filePath, `${fileName}`));
    }

    /**
     * verify list of location present on Locations tab
     */
    async verifyLocationLists() {

        await this.page.waitForSelector('//a[@data-tip="Locations"]', { state: 'visible' });
        await this.locationsTab.click();
        
        await expect(this.table).toBeVisible({ timeout: 100000 });
        const rowCount = await this.table.locator('tr').count();
        if (rowCount > 0) {
            console.log("Verified Locations List.");
        } else {
            console.log("Locations List not Verified. Data Not Available.");
            throw new Error("Locations List not Verified. Data Not Available.");
        }
    }

    /*
     * Function to search Location 
     * @param searchQuerry : Querry to search Location
     * @param expected : Expected value to check with actual
     * @param successMsg : Success message when test pass
     * @param failureMsg1 : Failure message when test fails
     * @param failureMsg2 : Failure message when expect is missing from result table
     */

    async searchLocation(searchQuerry: string) {

        // Search location.
        await this.page.waitForSelector('//a[@data-tip="Locations"]', { state: 'visible' });
        await this.locationsTab.click();
        await this.page.waitForSelector('[placeholder="Search for a Location"]', { state: 'visible' });
        await this.searchBar.click();
        await this.searchBar.clear();
        await this.searchBar.fill(searchQuerry);

        await this.verify.verifyTableData(0, this.noResultsFound, searchQuerry, "Results Found", "Results Not Found", "Result Are Not Matching");
    }

    // Function to filter Location by Location Type
    async filterLocationsByLocationType() {

        await this.page.waitForSelector('//a[@data-tip="Locations"]', { state: 'visible' });
        await this.locationsTab.click();
        await this.searchBar.clear();
        await this.filterLocationBtn.click();
        await this.filterDropDownMenu.first().click();
        await this.locationsTypeFilterOption.click();
        await this.applyFiltersBtn.click();

        await this.verify.verifyTableData(2, this.noResultsFound, locationsTestData.LocationsFilters.LocationType,
            "Locations Results Filtered Successfully.", "Results Not Found.", "Filter Result Is Not Matching");
    }
}