import { test, expect } from '@playwright/test';
import { POManager } from '../../../page-objects/POManager';
import * as testdata from "../../../test-data/testdata.json";

// Validating list of popular queries list availability in care search
test("Verify Popular Queries list availability under trends.@Smoke", async ({page})=> {

    const poManager = new POManager(page);

    const analyticsTrendsPage = poManager.getAnalyticsTrendsPage();

    const dashBoardPage = poManager.getDashBoardPage();

    await dashBoardPage.navigateToCareSearch();
    
    await page.waitForTimeout(15000);
    
    analyticsTrendsPage.verifyQueriesdisplying();
  });
  // validating lists of specialites promte provider and re-ordering promte providers in care search 
  test("Verify Promote Providers Within Specialties list availability under specialties and reordering Promote Providers.@Smoke", async ({page}) => {

    const poManager = new POManager(page);

    const dashBoardPage = poManager.getDashBoardPage();
    
    const careSearchPromotionPage =poManager.getCareSearchPromotionPage();
    
    await dashBoardPage.navigateToCareSearch();
    
    await careSearchPromotionPage.verifyReorderSpecialtiesPromotedProvider(testdata.PromotedProvider.SpecialtiesPromotedProvider);
  });
  // validating lists of clinical term promte provider and re-ordering promte providers in care search 
  test("Verify Promote Providers list availablilty under clinical term and reodering order specialties.@Smoke", async ({page}) => {

    const poManager: POManager = new POManager(page);

    const dashBoardPage = poManager.getDashBoardPage();
    
    const careSearchPromotionPage =poManager.getCareSearchPromotionPage();
    
    await dashBoardPage.navigateToCareSearch();
    
    await careSearchPromotionPage.verifyReoderClinicalTermsPromoteSpecialties(testdata.PromotedProvider.ClinicalTermsPromoteSpecialties);
  });
  // Validating list of profile on CareSearch setting
  test("Verify profiles lists availibilty on CareSearch setting page@Smoke", async ({page}) => {

    const poManager = new POManager(page);

    const dashBoardPage = poManager.getDashBoardPage();

    await dashBoardPage.navigateToCareSearch();
    
    const careSearchSettingPage = poManager.getCareSearchSettingPage();
    
    await careSearchSettingPage.navigateToSetting();
    
    await page.waitForTimeout(1500);
    
    await careSearchSettingPage.validateProfileListDisplayed();
  });
   // Validating list of profile on chat setting
  test("Verify profiles lists availibilty on Chat setting page@smoke", async ({page}) => {

    const poManager = new POManager(page);

    const dashBoardPage = poManager.getDashBoardPage();
    
    const chatSettingPage = poManager.getchatSettingPage();
    
    await dashBoardPage.navigateToChat();
    
    await chatSettingPage.verifyListOfBotProfiles();
  
  });
  // validating select specific date range and download file
  test("Verify overall Bot performance data downloading as .csv file under Chat setting overall page@smoke", async ({page}) => {

    const poManager = new POManager(page);

    const dashBoardPage = poManager.getDashBoardPage();
    
    const chatAnalyticsOverallPage = poManager.getChatAnalyticsOverallPage();
    
    await dashBoardPage.navigateToChat();
    
    await chatAnalyticsOverallPage.verifyDownloadCsvFile(testdata.chatAnalyticsOverallDateRange.StartDate,testdata.chatAnalyticsOverallDateRange.EndDate);
  
  });
  // Validating add user with required details in chat setting
  test("Verify Add User on Chat setting page@smoke", async ({page}) => {

    const poManager = new POManager(page);

    const dashBoardPage = poManager.getDashBoardPage();

    const chatSettingPage = poManager.getchatSettingPage();

    await dashBoardPage.navigateToChat();

    await chatSettingPage.verifyAdduser(testdata.addUser.email,testdata.addUser.queuesName);
  
  });
  // Validating add user with required details in live chat setting
  test("Verify Add User on Live Chat setting page@smoke", async ({page}) => {

    const poManager = new POManager(page);

    const dashBoardPage = poManager.getDashBoardPage();
    
    const liveChatSettingPage = poManager.getLiveChatSettingPage();
    
    await dashBoardPage.navigateToLiveChat();
    
    await liveChatSettingPage.verifyLiveChatAdduser(testdata.addUser.email,testdata.addUser.queuesName);
  
  });
   // Validating add queues with required details in live chat setting
  test('Add queues and verify in queues list on Live Chat setting page@smoke', async ({ page }) => {
    
    console.log('Add queues and verify in queues list');

    const poManager = new POManager(page);
    
    const dashBoardPage = poManager.getDashBoardPage();
    
    const liveChataddQueuesPage = poManager.getLiveChatAddQueuesPage();
    
    await dashBoardPage.navigateToLiveChat();
    
    await liveChataddQueuesPage.addQueuesAndVerifyInQueuesList("equeusMessage","Central");
    
    
  });
   // Validating add Canned replies with required details in live chat setting
  test('Add Canned Replies on Live Chat setting page@smoke', async ({ page }) => {
    
    console.log('Add Canned Replies and verify successfully added');

    const poManager = new POManager(page);
    
    const dashBoardPage = poManager.getDashBoardPage();
    
    const liveChatCannedRepliesPage = poManager.getLiveChatCannedRepliesPage();
    
    await dashBoardPage.navigateToLiveChat();

    await liveChatCannedRepliesPage.createCannedResponse(testdata.addCannedReplies.category,testdata.addCannedReplies.queuesName,testdata.addCannedReplies.CannedResponse)
    
    
  });
// Validating filter and edit Canned replies with required details in live chat setting
  test('Filter and Edit Canned Replies on Live Chat setting page@smoke', async ({ page }) => {
    
    console.log('Filter and edit Canned Replies and verify successfully updated');

    const poManager = new POManager(page);
    
    const dashBoardPage = poManager.getDashBoardPage();
    
    const liveChatCannedRepliesPage = poManager.getLiveChatCannedRepliesPage();
    
    await dashBoardPage.navigateToLiveChat();

    await liveChatCannedRepliesPage.filterCannedResponse(testdata.addCannedReplies.CannedResponse);

    await liveChatCannedRepliesPage.editCannedResponse(testdata.EditCannedReplies.category,testdata.EditCannedReplies.CannedResponse);
    
    await page.waitForTimeout(5000);
    
  });
  // Validating filter and delete Canned replies with required details in live chat setting
  test('Filter and Delete Canned Replies on Live Chat setting page@smoke', async ({ page }) => {
    
    console.log('Filter and edit Canned Replies and verify successfully updated');

    const poManager = new POManager(page);
    
    const dashBoardPage = poManager.getDashBoardPage();
    
    const liveChatCannedRepliesPage = poManager.getLiveChatCannedRepliesPage();
    
    await dashBoardPage.navigateToLiveChat();

    await liveChatCannedRepliesPage.filterAndDeleteCannedResponse(testdata.EditCannedReplies.CannedResponse);
    
    await page.waitForTimeout(5000);
    
  });
  // Validating search provider and filter options availabe in scrantonhealth 
  test("verify search and filter option on HealthCare domain@smoke",async({page})=>{
    const poManager = new POManager(page);
    
    const loginPage = poManager.getLoginPage();
    
    await loginPage.navigateToHelathCare(testdata.logInDetails.healthCareURL,testdata.logInDetails.email);

    const healthCareSearchPage =poManager.getHealthCareSearchPage();
    
    await healthCareSearchPage.performSearch("general surgery");
})
// Validating chat window all chat options availabe in scrantonhealth 
test("verify all chat option on HealthCare domain@smoke",async({page})=>{
    const poManager = new POManager(page);
    
    const loginPage = poManager.getLoginPage();
    
    await loginPage.navigateToHelathCare(testdata.logInDetails.healthCareURL,testdata.logInDetails.email);

    const healthCareSearchPage =poManager.getHealthCareSearchPage();
    
    await healthCareSearchPage.verifyingChatOptions();
})
 

