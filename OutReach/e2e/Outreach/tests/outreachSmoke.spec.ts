//import { test, expect,Browser} from "@playwright/test";
import test, { expect, Page } from "@playwright/test";
import { POManager } from "../../../page-objects/POManager";
import { CampaignLibraryText } from "../../../test-data/outreachData.json";
import { LoginData } from "../../../test-data/outreachData.json";
import { SegmentationLibraryText } from "../../../test-data/outreachData.json";
import { BrandingConfigurationText } from "../../../test-data/outreachData.json";

//Global Variables
const timestamp = new Date().toISOString();
let campaignName = LoginData.CreateCampaignData.campaignName + timestamp;
let updatedCampaignName =
  LoginData.CreateCampaignData.updatedCampaignName + timestamp;

test.beforeEach("Login", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  //Login Application
  await loginPage.goTo(process.env.URL + "login");
  await loginPage.LoginToApplication(LoginData.email, LoginData.password);
  await page.waitForLoadState("load");
  await expect(page).toHaveURL(LoginData.baseURL + "/home");
  await loginPage.clickOnOpenButton();
  await page.waitForLoadState("load");
  await expect(page).toHaveURL(
    LoginData.baseURL + "/outreach/campaign-library"
  );
  await page.waitForTimeout(2000);
});

test("Verify that user is able to create the campaign", async ({ page }) => {
  const poManager = new POManager(page);
  const createCampaignPage = poManager.getCreateCampaignPage();
  const segmentationPage = poManager.getSegmentationPage();

  //Create Campaign on pop-up
  await createCampaignPage.clickOnCreateCampaignButton();
  expect(await createCampaignPage.getCreateCampaignHeaderText()).toBe(
    LoginData.CreateCampaignData.createCampaignText
  );
  await createCampaignPage.campaignName(campaignName);
  await createCampaignPage.clickOntagField();
  await createCampaignPage.tagField(LoginData.CreateCampaignData.tagName);
  await page.keyboard.press("Enter");
  await createCampaignPage.frequencyField(
    LoginData.CreateCampaignData.frequencyName
  );
  await page.keyboard.press("Enter");
  await createCampaignPage.clickOnserviceLineField();
  await createCampaignPage.serviceLineField(
    LoginData.CreateCampaignData.serviceLineName
  );
  await page.keyboard.press("Enter");
  await createCampaignPage.clickOncontentCategoryField();
  await createCampaignPage.contentCategoryField(
    LoginData.CreateCampaignData.contentCategoryName
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
  await createCampaignPage.clickOnCreateCampaign();
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getSnackbarText()).toBe(
    LoginData.CreateCampaignData.campaignCreatedSnackBar
  );
  expect(await createCampaignPage.getActiveTabText()).toBe(
    LoginData.CreateCampaignData.activeTabText1
  );
  expect(await createCampaignPage.getEmptyStateMessage()).toBe(
    LoginData.CreateCampaignData.emptyScreenText
  );

  //Add Audience Segmentation
  await segmentationPage.searchFieldOnSegmentation(
    LoginData.CreateCampaignData.SegmentText
  );
  await page.waitForTimeout(2000);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(5000);
  await createCampaignPage.clickOnSaveNextButton();
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getSnackbarText()).toBe(
    LoginData.CreateCampaignData.snackBarText
  );
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getActiveTabText()).toBe(
    LoginData.CreateCampaignData.activeTabText2
  );

  //Add Branding Configuration
  await createCampaignPage.selectBrandingConfig(
    LoginData.CreateCampaignData.brandingConfiguration
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getDisplayNameText()).toBe(
    LoginData.CreateCampaignData.displayName
  );
  await page.waitForTimeout(2000);
  await createCampaignPage.clickOnSaveNextButton();
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getSnackbarText()).toBe(
    LoginData.CreateCampaignData.snackBarText
  );
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getActiveTabText()).toBe(
    LoginData.CreateCampaignData.activeTabText3
  );
  await page.waitForTimeout(2000);

  //Configure Content- by adding SMS
  expect(await createCampaignPage.getRadioButtonState()).toBeTruthy();
  await page.waitForTimeout(2000);
  await createCampaignPage.clickOnCreateSMSButton();
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getSMSLabelText()).toBe(
    LoginData.CreateCampaignData.SMSLabel
  );
  await createCampaignPage.AddSMSName(
    LoginData.CreateCampaignData.SMSName + timestamp
  );
  await createCampaignPage.AddSMSContent(
    LoginData.CreateCampaignData.SMSContent
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getFullAddressText()).toContain(
    LoginData.CreateCampaignData.fullAddress
  );
  await createCampaignPage.clickOnSaveChangesButtonOnSMSScreen();
  expect(await createCampaignPage.getSnackbarText()).toBe(
    LoginData.CreateCampaignData.snackBarTextOnSMSScreen2
  );
  await page.waitForTimeout(2000);
  await createCampaignPage.clickOnBackToContentOverviewLink();
  await page.waitForTimeout(5000);
  expect(await createCampaignPage.getSaveButtonState()).toBe(false);
  await page.waitForTimeout(2000);
  await createCampaignPage.clickOnSaveNextButton();
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getActiveTabText()).toBe(
    LoginData.CreateCampaignData.activeTabText4
  );

  //Add Campaign Rules
  await page.waitForTimeout(2000);
  await createCampaignPage.clickOnEnableThrottling();
  expect(await createCampaignPage.getSaveButtonState()).toBe(true);
  await createCampaignPage.AddMessageCOunt("1");
  await createCampaignPage.clickOnMessageDropdown();
  await page.waitForTimeout(2000);
  await createCampaignPage.addMessagePer("day");
  await page.keyboard.press("Enter");
  expect(await createCampaignPage.getSaveButtonState()).toBe(false);
  await createCampaignPage.clickOnSaveNextButton();
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getSnackbarText()).toBe(
    LoginData.CreateCampaignData.snackBarText
  );
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getActiveTabText()).toBe(
    LoginData.CreateCampaignData.activeTabText5
  );
  await page.waitForTimeout(2000);

  //Launch The campaign
  expect(await createCampaignPage.getHeadingOnReviewText(0)).toBe(
    "Audience Segmentation"
  );
  expect(await createCampaignPage.getValueOnReviewPageText(0)).toBe(
    LoginData.CreateCampaignData.SegmentText
  );
  // await createCampaignPage.clickOnLaunchButton();
  // expect (await createCampaignPage.getLaunchModalText()).toBe(LoginData.CreateCampaignData.launchModalText);
  // await page.waitForTimeout(2000);
  // await createCampaignPage.clickOnLaunchButtonOnModal();
  // await page.waitForTimeout(2000);
  // expect (await createCampaignPage.getSuccessLaunchMessageOnModal()).toBe(LoginData.CreateCampaignData.successLaunchMessageOnModal);
});

test("Verify that user is able to edit the campaign", async ({ page }) => {
  const poManager = new POManager(page);
  const createCampaignPage = poManager.getCreateCampaignPage();
  const segmentationPage = poManager.getSegmentationPage();
  const searchCampaignPage = poManager.getSearchCampaignPage();

  //Update Campaign on Pop-up
  await searchCampaignPage.searchField(campaignName);
  await searchCampaignPage.clickOnSearchOption();
  expect(await searchCampaignPage.getSearchText()).toBe(
    LoginData.SearchData.SearchedText1 + campaignName
  );
  await page.waitForTimeout(2000);
  // await searchCampaignPage.clickOnSearchCampaignName();
  // expect (await createCampaignPage.getActiveTabText()).toBe(LoginData.CreateCampaignData.activeTabText1);
  // await searchCampaignPage.clickOnEditCampaignButton();
  // expect (await searchCampaignPage.getEditModalHeadingText()).toBe(LoginData.SearchData.headingOnEditModal);
  // await searchCampaignPage.clickOnCheckbox();
  // expect (await searchCampaignPage.getEditButtonState()).toBe(null);
  // await searchCampaignPage.clickOnEditButtonOnModal();
  // await page.waitForTimeout(2000);
  // expect (await searchCampaignPage.isDraftbadgeVisible()).toBeTruthy();
  // await page.waitForTimeout(2000);
  // await searchCampaignPage.clickOnExitBuilderLink();
  // await page.waitForTimeout(2000);
  // await expect(page).toHaveURL(LoginData.baseURL+'/outreach/campaign-library');
  // await searchCampaignPage.searchField(campaignName);
  // await searchCampaignPage.clickOnSearchOption();
  // expect(await searchCampaignPage.getSearchText()).toBe(LoginData.SearchData.SearchedText1+campaignName);
  await searchCampaignPage.clickOnEllipsis();
  await searchCampaignPage.clickOnEditText();
  expect(await createCampaignPage.getCreateCampaignHeaderText()).toBe(
    LoginData.CreateCampaignData.editCampaignText
  );
  updatedCampaignName =
    LoginData.CreateCampaignData.updatedCampaignName + timestamp;
  await createCampaignPage.campaignName(updatedCampaignName);
  await createCampaignPage.clickOntagField();
  await createCampaignPage.tagField(LoginData.CreateCampaignData.tagName1);
  await page.keyboard.press("Enter");
  await createCampaignPage.frequencyField(
    LoginData.CreateCampaignData.frequencyName1
  );
  await page.keyboard.press("Enter");
  await createCampaignPage.clickOnserviceLineField();
  await createCampaignPage.serviceLineField(
    LoginData.CreateCampaignData.serviceLineName1
  );
  await page.keyboard.press("Enter");
  await createCampaignPage.clickOncontentCategoryField();
  await createCampaignPage.contentCategoryField(
    LoginData.CreateCampaignData.contentCategoryName1
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
  await searchCampaignPage.clickOnUpdateCampaign();
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getSnackbarText()).toBe(
    LoginData.CreateCampaignData.campiagnUpdatedSnackbar
  );

  //Update Audience Segmentation
  await searchCampaignPage.clickOnSearchCampaignName();
  expect(await createCampaignPage.getActiveTabText()).toBe(
    LoginData.CreateCampaignData.activeTabText1
  );
  await page.waitForTimeout(2000);
  await segmentationPage.searchFieldOnSegmentation(
    LoginData.CreateCampaignData.SegmentText1
  );
  await page.waitForTimeout(2000);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(5000);
  await createCampaignPage.clickOnSaveNextButton();
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getSnackbarText()).toBe(
    LoginData.CreateCampaignData.snackBarText
  );
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getActiveTabText()).toBe(
    LoginData.CreateCampaignData.activeTabText2
  );

  //Update Branding Configuration
  await createCampaignPage.selectBrandingConfig(
    LoginData.CreateCampaignData.brandingConfiguration
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(5000);
  expect(await createCampaignPage.getDisplayNameText()).toBe(
    LoginData.CreateCampaignData.displayName
  );
  await page.waitForTimeout(2000);
  await createCampaignPage.clickOnSaveNextButton();
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getSnackbarText()).toBe(
    LoginData.CreateCampaignData.snackBarText
  );
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getActiveTabText()).toBe(
    LoginData.CreateCampaignData.activeTabText3
  );
  await page.waitForTimeout(2000);

  //Configure Content- by adding Email
  await page.waitForTimeout(15000);
  await createCampaignPage.clickOnCreateNewEmailButton();
  await page.waitForTimeout(2000);

  await createCampaignPage.fillEMailName(CampaignLibraryText.Email.Name);
  await page.waitForTimeout(500);

  await createCampaignPage.clickOnEmailSubjectLineDropdown();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(500);

  await createCampaignPage.clickOnEmailBodyDropdown();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(500);

  await createCampaignPage.clickOnDisplayCallToActionToggle();
  await page.waitForTimeout(500);

  await createCampaignPage.clickOnSaveChangesButtonToCreateEmail();
  await page.waitForTimeout(500);
  expect(await createCampaignPage.getSnackbarText()).toBe(
    LoginData.CreateCampaignData.snackBarTextOnEmailScreen2
  );
  await page.waitForTimeout(2000);
  await createCampaignPage.clickOnBackToContentOverviewLink();
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getSaveButtonState()).toBe(false);
  await page.waitForTimeout(2000);
  await createCampaignPage.clickOnSaveNextButton();
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getActiveTabText()).toBe(
    LoginData.CreateCampaignData.activeTabText4
  );

  //Add Campaign Rules
  expect(await createCampaignPage.getEmailSmsDropdownText()).toBe(
    "If both email and mobile number is available, send"
  );
  await createCampaignPage.clickOnMessageDropdown();
  await createCampaignPage.clickOnEmailSmsDropdown();
  await createCampaignPage.addEmailSmsValue("Send both Email & SMS");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
  expect(await createCampaignPage.getSaveButtonState()).toBe(false);
  await page.waitForTimeout(2000);
  await createCampaignPage.clickOnSaveNextButton();
  await page.waitForTimeout(5000);
  expect(await createCampaignPage.getActiveTabText()).toBe(
    LoginData.CreateCampaignData.activeTabText5
  );
  await page.waitForTimeout(2000);

  //Launch The campaign
  expect(await createCampaignPage.getHeadingOnReviewText(0)).toBe(
    "Audience Segmentation"
  );
  expect(await createCampaignPage.getValueOnReviewPageText(0)).toBe(
    LoginData.CreateCampaignData.SegmentText1
  );
  // await createCampaignPage.clickOnLaunchButton();
  // expect (await createCampaignPage.getLaunchModalText()).toBe(LoginData.CreateCampaignData.launchModalText);
  // await page.waitForTimeout(2000);
  // await createCampaignPage.clickOnLaunchButtonOnModal();
  // await page.waitForTimeout(2000);
  // expect (await createCampaignPage.getSuccessLaunchMessageOnModal()).toBe(LoginData.CreateCampaignData.successLaunchMessageOnModal);
});

test("Verify that user is able to delete the campaign", async ({ page }) => {
  const poManager = new POManager(page);
  const createCampaignPage = poManager.getCreateCampaignPage();
  const deleteSegmentationPage = poManager.getDeleteCampaignPage();
  const searchCampaignPage = poManager.getSearchCampaignPage();

  //Search the updated campaign to delete
  await searchCampaignPage.searchField(updatedCampaignName);
  await searchCampaignPage.clickOnSearchOption();
  expect(await searchCampaignPage.getSearchText()).toBe(
    "Showing 1 results for: " + updatedCampaignName
  );
  await page.waitForTimeout(2000);
  // await searchCampaignPage.clickOnSearchCampaignName();
  // expect (await createCampaignPage.getActiveTabText()).toBe(LoginData.CreateCampaignData.activeTabText1);
  // await searchCampaignPage.clickOnEditCampaignButton();
  // expect (await searchCampaignPage.getEditModalHeadingText()).toBe(LoginData.SearchData.headingOnEditModal);
  // await searchCampaignPage.clickOnCheckbox();
  // expect (await searchCampaignPage.getEditButtonState()).toBe(null);
  // await searchCampaignPage.clickOnEditButtonOnModal();
  // await page.waitForTimeout(2000);
  // expect (await searchCampaignPage.isDraftbadgeVisible()).toBeTruthy();
  // await page.waitForTimeout(2000);
  // await searchCampaignPage.clickOnExitBuilderLink();
  // await page.waitForTimeout(2000);
  // await expect(page).toHaveURL(LoginData.baseURL+'/outreach/campaign-library');
  // await searchCampaignPage.searchField(updatedCampaignName);
  // await searchCampaignPage.clickOnSearchOption();
  // expect(await searchCampaignPage.getSearchText()).toBe("Showing 1 results for: "+updatedCampaignName);
  await searchCampaignPage.clickOnEllipsis();
  expect(await deleteSegmentationPage.getDeleteOptionText()).toBe("Delete");
  await page.waitForTimeout(2000);
  await deleteSegmentationPage.clickOnDeleteText();
  await page.waitForTimeout(2000);
  expect(await deleteSegmentationPage.getDeleteTextOnModal()).toBe(
    "Are you sure you want to delete this campaign?"
  );
  await deleteSegmentationPage.clickOnCheckbox();
  await deleteSegmentationPage.clickOnDeleteButton();
  await page.waitForTimeout(5000);
  expect(await searchCampaignPage.getSearchText()).toBe(
    LoginData.SearchData.SearchedText2 + updatedCampaignName
  );
});

test("Verify that user is able to Create Branding configuration by adding mandatary fields on the create pop-up.", async ({
  page,
}) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const createBrandingConfigPage = poManager.getCreateBrandingConfigPage();

  await page.waitForLoadState("load");
  await page.waitForTimeout(5000);

  await createBrandingConfigPage.navigateToBrandingConfig();
  await page.waitForTimeout(5000);
  await createBrandingConfigPage.clickOnCreateBrandingConfigButton();
  await expect(page).toHaveURL(
    LoginData.baseURL + "/outreach/branding-configuration"
  );
  await page.waitForTimeout(2000);

  await createBrandingConfigPage.clickOnMarketDropdownOnCreateBrandingConfigPoUp();
  await page.waitForTimeout(3000);
  await createBrandingConfigPage.selectMarketOnCreateBrandingConfigPoUp(
    BrandingConfigurationText.MarketName
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);

  await createBrandingConfigPage.clickOnLocationLabel();
  await createBrandingConfigPage.selectLocationOnCreateBrandingConfigPoUp(
    BrandingConfigurationText.LocationName
  );
  await page.keyboard.press("Enter");
  await createBrandingConfigPage.clickOnLocationLabelAfterAdding();

  await page.waitForTimeout(2000);
  let dateTime = new Date();
  await createBrandingConfigPage.fillBrandingConfigurationName(
    BrandingConfigurationText.BrandConfigurationEditName + dateTime
  );
  await page.waitForTimeout(2000);

  await createBrandingConfigPage.clickOnCreateBrandingConfigButtonOnCreateBrandingConfigPoUp();
  await page.waitForTimeout(2000);
});

test("Verify that user is able to edit Branding configuration.", async ({
  page,
}) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const createBrandingConfigPage = poManager.getCreateBrandingConfigPage();

  await page.waitForLoadState("load");
  await page.waitForTimeout(5000);
  await createBrandingConfigPage.navigateToBrandingConfig();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL(
    LoginData.baseURL + "/outreach/branding-configuration"
  );
  await page.waitForTimeout(2000);

  await createBrandingConfigPage.clickOnMarketDropdown();
  await createBrandingConfigPage.selectMarket(
    BrandingConfigurationText.MarketNameForEdit
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);

  await createBrandingConfigPage.clickOnCreatedBrandedConfigForEdit();
  let dateTime = new Date();
  await createBrandingConfigPage.fillDisplayName(
    BrandingConfigurationText.BrandConfigurationDisplayName + dateTime
  );
  await createBrandingConfigPage.fillAbbreviatedName(
    BrandingConfigurationText.BrandConfigurationAbbreviatedName + dateTime
  );
  await createBrandingConfigPage.fillAddressLine1(
    BrandingConfigurationText.BrandConfigurationAddressLine1 + dateTime
  );
  await createBrandingConfigPage.fillCity(
    BrandingConfigurationText.BrandConfigurationCity
  );
  await createBrandingConfigPage.fillState(
    BrandingConfigurationText.BrandConfigurationState
  );
  await createBrandingConfigPage.fillZip(
    BrandingConfigurationText.BrandConfigurationZip
  );
  await createBrandingConfigPage.fillCopyright(
    BrandingConfigurationText.BrandConfigurationCopyright
  );

  await createBrandingConfigPage.clickOnSaveChangesButton();
  await page.waitForTimeout(5000);
});

test("Verify that user is able to delete Branding configuration.", async ({
  page,
}) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const createBrandingConfigPage = poManager.getCreateBrandingConfigPage();

  await page.waitForLoadState("load");
  await page.waitForTimeout(5000);

  await createBrandingConfigPage.navigateToBrandingConfig();
  await page.waitForTimeout(15000);
  await expect(page).toHaveURL(
    LoginData.baseURL + "/outreach/branding-configuration"
  );
  await page.waitForTimeout(2000);

  await createBrandingConfigPage.clickOnMarketDropdown();
  await createBrandingConfigPage.selectMarket(
    BrandingConfigurationText.MarketName
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);

  await createBrandingConfigPage.clickOnCreatedBrandedConfig();
  await page.waitForTimeout(2000);

  await createBrandingConfigPage.clickOnDeleteBrandingConfigButton();
  await page.waitForTimeout(2000);

  await createBrandingConfigPage.clickOnDeleteBrandingConfigButtonOnModal();
  await page.waitForTimeout(2000);
});

test("Verify that user is able to Create Segmentation by adding mandatary fields on the create pop-up with include & exclude conditions", async ({
  page,
}) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const segmentationPage = poManager.getSegmentationPage();

  await page.waitForLoadState("load");
  await page.waitForTimeout(5000);

  await segmentationPage.navigateToSegmentationPage();
  await page.waitForTimeout(5000);
  await segmentationPage.clickOnCreateSegmentationButton();
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnDataSourceDropdown();
  await page.waitForTimeout(500);
  await segmentationPage.selectDataSourceValue(
    SegmentationLibraryText.DataSource
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnTagDropdown();
  await segmentationPage.selectTagOption(
    SegmentationLibraryText.TagOptionPhysicianService
  );
  await page.keyboard.press("Enter");

  await page.waitForTimeout(2000);
  let dateTime = new Date();
  await segmentationPage.fillSegmentationName(
    SegmentationLibraryText.Name + " " + dateTime
  );
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnCreateSegmentationButtonOnCreateSegmentationPoUp();
  await page.waitForTimeout(5000);

  await segmentationPage.clickOnAddCriteriaButtonForIncludeAudience();
  await page.waitForTimeout(5000);

  await segmentationPage.clickOnSelectCriteriaDropdownForIncludeAudience();
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnAppointmentCriteriaForIncludeAudience();
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnAppointmentDateCriteriaForIncludeAudience();
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnSelectConditionDropdown();
  await page.waitForTimeout(2000);
  await segmentationPage.selectConditionValue(
    SegmentationLibraryText.Conditions.IsAfter
  );
  await page.keyboard.press("Enter");

  await page.waitForTimeout(2000);

  await segmentationPage.fillValueForAppoitnmentDate(
    SegmentationLibraryText.IncludeAudience.AppointmentDateAfter
  );

  await page.waitForTimeout(2000);

  await segmentationPage.clickOnTimeFrameDropdown();
  await page.waitForTimeout(2000);

  await segmentationPage.selectTimeValue(
    SegmentationLibraryText.IncludeAudience.TimeMonth
  );
  await page.waitForTimeout(500);
  await page.keyboard.press("Enter");

  await page.waitForTimeout(2000);
  await segmentationPage.clickOnSelectLocationMarketCriteriaDropdown();
  await page.waitForTimeout(2000);

  await segmentationPage.selectMarketLocationCriteriaValue(
    SegmentationLibraryText.IncludeAudience.MarketLocationCondition
  );
  await page.waitForTimeout(500);
  await page.keyboard.press("Enter");

  await page.waitForTimeout(2000);
  await segmentationPage.clickOnSelectLocationMarketConditionDropdown();
  await page.waitForTimeout(2000);
  await segmentationPage.selectMarketLocationConditionValue(
    SegmentationLibraryText.Conditions.IsOneOf
  );
  await page.waitForTimeout(500);
  await page.keyboard.press("Enter");

  await page.waitForTimeout(1000);
  await segmentationPage.clickOnSaveChangesButtonOnBuildSegmentationCriteriaSidePanel();
  await page.waitForTimeout(1000);
  await segmentationPage.clickOnCloseButtonOnBuildSegmentationCriteriaSidePanel();
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnAddCriteriaButtonForExcludeAudience();
  await page.waitForTimeout(5000);

  await segmentationPage.clickOnSelectCriteriaDropdownForExcludeAudience();
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnPatientCriteriaForExcludeAudience();
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnPatientStatusCriteriaForExcludeAudience();
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnPatientStatusConditionDropdown();
  await page.waitForTimeout(2000);
  await segmentationPage.selectPatientStatusConditionValue(
    SegmentationLibraryText.Conditions.Is
  );
  await page.waitForTimeout(500);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnPatientStatusValueDropdown();
  await page.waitForTimeout(2000);

  await segmentationPage.selectPatientStatusValue(
    SegmentationLibraryText.ExcludeAudience.PatientStatusInactive
  );
  await page.waitForTimeout(500);

  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnSaveChangesButtonOnBuildSegmentationCriteriaSidePanel();
  await page.waitForTimeout(2000);
  await segmentationPage.clickOnCloseButtonOnBuildSegmentationCriteriaSidePanel();
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnAppointmentCriteriaForIncludeAudience();
  await page.waitForTimeout(2000);
});

test("Verify that user is able to edit name & tag of segmentation only", async ({
  page,
}) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const segmentationPage = poManager.getSegmentationPage();

  await page.waitForLoadState("load");
  await page.waitForTimeout(5000);

  await segmentationPage.navigateToSegmentationPage();
  await page.waitForTimeout(5000);

  await segmentationPage.searchCreatedSegmentation(
    SegmentationLibraryText.SearchedText
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnMenuIcon();
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnEditIconOnSegmenationMenuList();
  await page.waitForTimeout(2000);

  let dateTime = new Date();
  await segmentationPage.fillSegmentationName(
    SegmentationLibraryText.Name + " " + dateTime
  );
  await page.waitForTimeout(1000);

  await segmentationPage.clickOnTagDropdown();
  await page.waitForTimeout(2000);

  await segmentationPage.selectTagOption(
    SegmentationLibraryText.TagOptionHospital
  );
  await page.waitForTimeout(2000);

  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnSaveChangesButton();
  await page.waitForTimeout(2000);
});

test("Verify that user is able to delete segmentation.", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const segmentationPage = poManager.getSegmentationPage();

  await page.waitForLoadState("load");
  await page.waitForTimeout(5000);

  await segmentationPage.navigateToSegmentationPage();
  await page.waitForTimeout(5000);

  await segmentationPage.searchCreatedSegmentation(
    SegmentationLibraryText.SearchedText
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnMenuIcon();
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnDeleteIconOnSegmenationMenuList();
  await page.waitForTimeout(2000);

  await segmentationPage.clickOnCheckbox();
  await page.waitForTimeout(1000);
  await segmentationPage.clickOnDeleteButton();
  await page.waitForTimeout(2000);
});
