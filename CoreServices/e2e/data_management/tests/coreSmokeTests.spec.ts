import { Browser, BrowserContext, Page, test } from "@playwright/test";
import { POManager } from "../../../page-objects/POManager";
import * as providerTestData from "../../../test-data/providersTestData.json";
import * as locationsTestData from "../../../test-data/locationsTestData.json";
import * as specialtiesTestData from "../../../test-data/specialitiesTestData.json";
import * as CnDTestData from "../../../test-data/conditionsAndDiseasesTestData.json";
import * as tnPTestData from "../../../test-data/treatmentsAndProceduresTestData.json";
import * as dataHealthTestData from "../../../test-data/dataHealthTestData.json";

// Smoke test suite
test.describe('Smoke Test Suite', () => {

    let page: Page;
    let pom: POManager;
    let context: BrowserContext;
    let browser: Browser;
    let providerPage;
    let locationsPage;
    let specialitiesPage;
    let cnDPage;
    let tnPPage;
    let dataHealthPage;

    // test.setTimeout(600000);

    /**
     * Test to run before all the tests
     * In this test, we have to call the respective pom class from POManager class.
     */
    test.beforeAll('Pre-requisites', async ({ browser }) => {

        context = await browser.newContext({
            acceptDownloads: true
        });
        page = await context.newPage();

        pom = new POManager(page);
        await pom.getLoginPage().navigateToPortal();
        await pom.getLoginPage().validLogin();
        providerPage = pom.getProviderPage();
        locationsPage = pom.getLocationsPage();
        specialitiesPage = pom.getSpecialitiesPage();
        cnDPage = pom.getConditionsAndDiseasesPage();
        tnPPage = pom.getTreatmentsAndProceduresPage();
        dataHealthPage = pom.getDataHealthPage();
    });

    /**
     * Providers Tests
     * Test to Verify list of providers present on provider page
     */
    test('Verify Provider List On Provider Tab @smoke', async ({ page }) => {
        await providerPage.verifyProvidersList();
    });

    /**
     * Providers Tests
     * Test to add new provider
     */
    test('Add new provider @smoke', async () => {
        await providerPage.addProvider(providerTestData.addnewProviderDetails.NPI, providerTestData.addnewProviderDetails.FirstName,
            providerTestData.addnewProviderDetails.LastName, providerTestData.addnewProviderDetails.displayName,
            providerTestData.addnewProviderDetails.Degree);
    });

    /**
     * Providers Tests
     * Test to add new taxonomy to provider
     */
    test('Add New Taxonomy Field @smoke', async () => {
        await providerPage.addNewTaxonomyFields(providerTestData.addnewProviderDetails.displayName,
            providerTestData.addnewProviderDetails.ConditionsAndDieseasesTerm, providerTestData.addnewProviderDetails.TreatementsAndProceduresTerms);
    });
    
    /**
     * Providers Tests
     * Test to update the provider
     */
    test('Update Provider @smoke', async () => {
        await providerPage.updateProviderDetails(providerTestData.updateProviderDetails.providerName,
            providerTestData.updateProviderDetails.MiddleName, providerTestData.updateProviderDetails.uploadPath,
            providerTestData.updateProviderDetails.uploadImageName);
    });

    /**
     * Providers Tests
     * Test to search the provider
     */
    test('Search Provider @smoke', async () => {
        await providerPage.searchProvider(providerTestData.SearchProviderDetails.Querry1);
    });

    /**
     * Providers Test
     * Test to download list of all providers present on providers page
     */
    test('Download Provider List @smoke', async({page}) => {
        await providerPage.downloadFile(providerTestData.downloadFile.filePath);
        
    })

    /**
     * Providers Tests
     * Test to delete the provider
     */
    test('Delete Provider @smoke', async () => {
        await providerPage.deleteProvider(providerTestData.DeleteProvider.name);
    });

    /**
     * Providers Tests
     * Test to filter the list of providers by provider specialty from the provider page
     */
    test('Filter By Provider Specialty @smoke', async () => {
        await providerPage.filterProviderByProviderSpecialty();
    });

    /**
     * Locations Tests
     * Test add new location 
     */
    test('Add New Location @smoke', async () => {
        await locationsPage.addLocation(locationsTestData.AddNewLocation.LocationName, locationsTestData.AddNewLocation.Address1,
            locationsTestData.AddNewLocation.Address2, locationsTestData.AddNewLocation.City, locationsTestData.AddNewLocation.ZipCode,
            locationsTestData.AddNewLocation.Phone, locationsTestData.AddNewLocation.LocationType);
    });

    /**
     * Locations Tests
     * Test to search location
     */
    test('Search Location @smoke', async () => {
        await locationsPage.searchLocation(locationsTestData.SearchLocationDetails.searchQuerry, locationsTestData.SearchLocationDetails.searchQuerry,
            "Results Found", "Displayed results are not matching with the search querry.", "Filter Result Is Not Matching");
    });

    test('Update Location @smoke', async({page}) => {
        await locationsPage.updateLocation(locationsTestData.UpdateLocations.searchQuerry,
            locationsTestData.UpdateLocations.fax, locationsTestData.UpdateLocations.websiteURL, locationsTestData.UpdateLocations.appointmentURL,
            locationsTestData.UpdateLocations.virtualURL, locationsTestData.UpdateLocations.displayURL);
    });
    /**
     * Locations Tests
     * Test to verify list of locations from location page
     */
    test('Verify Locations List From Locations Tab @smoke', async ({ page }) => {
        await locationsPage.verifyLocationLists();
    });

    /**
     * Locations Tests
     * Test to filter location by location type from the location page
     */
    test('Filter Locations By Location Type @smoke', async () => {
        await locationsPage.filterLocationsByLocationType();
    });

    /**
     * Specialties Tests
     * Test to search specialties
     */
    test('Search Specialty @smoke', async () => {
        await specialitiesPage.searchSpecialities(specialtiesTestData.SpecialtiesDetails.searchQuerry);
    });

    /**
     * Conditions And Diseases Tests
     * Test to search Conditions And Diseases
     */
    test('Search Conditions And Diseases @smoke', async () => {
        await cnDPage.searchConditionsAndDiseases(CnDTestData.search.searchQuerry);
    });

    /**
     * Treatments And Procedures Tests
     * Test to search Treatments And Procedures
     */
    test('Search Treatments And Procedures @smoke', async () => {
        await tnPPage.searchTreatmentsAndProcedures(tnPTestData.Search.searchQuerry);
    });

    /**
     * Data Health  Tests
     * Test to verify Data Health and its sub-Tabs 
     */
    test('Data Health Sub-Tabs Verification @smoke', async ({ page }) => {
        await dataHealthPage.dataHealthSubTabsVerification(dataHealthTestData.Tabs.DataHealth, dataHealthTestData.Tabs.ProfileComplteness,
            dataHealthTestData.Tabs.AuditHistory);
    });

    // test to close the browser context after all the test run.
    test.afterAll(async () => {
        await context.close(); // Clean up the context after all tests
    });
});
