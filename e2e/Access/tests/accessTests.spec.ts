import { test, expect } from '@playwright/test';
import { POManager } from '../../../page-objects/POManager';
import * as testdata from "../../../test-data/testdata.json";

test.only('Verifying AddQueues', async ({ page }) => {
  const poManager: POManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const dashBoardPage = poManager.getDashBoardPage();
  const addQueuesPage = poManager.getAddQueuesPage();
  await loginPage.goTo(testdata.logInDetails.baseURL);
  await loginPage.LoginToApplication(testdata.logInDetails.email,testdata.logInDetails.password);
  //page.waitForTimeout(10000);
  const dashBoardText = await dashBoardPage.verifyDashBoard();
    
  expect(dashBoardText).toBe("Dashboard");
    
    await dashBoardPage.navigateToLiveChat();

    await addQueuesPage.navigateToQueues();

    var randomNum =new Date().getTime();
    
    var equesName = "emidsDemo"+ randomNum;
    
    await addQueuesPage.addQueues(equesName,"equeusMessage"+randomNum,"Central");
    
    await page.waitForTimeout(10000);
    
    await addQueuesPage.verifyAddedQueuesList(equesName);
  
});
test('Verifying AddUser', async ({ page }) => {
  const poManager: POManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const dashBoardPage = poManager.getDashBoardPage();
  const addUserPage = poManager.getAddUserPage();
  await loginPage.goTo(testdata.logInDetails.baseURL);
  await loginPage.LoginToApplication(testdata.logInDetails.email,testdata.logInDetails.password);

  const dashBoardText = await dashBoardPage.verifyDashBoard();
    
  expect(dashBoardText).toBe("Dashboard");
    
  await dashBoardPage.navigateToLiveChat();

  await addUserPage.addUserDetails(testdata.addUser.email,testdata.addUser.queuesName);
  
});

test("Verifying Darg and drop", async ({page}) => {

  const poManager: POManager = new POManager(page);
  
  const loginPage = poManager.getLoginPage();
  
  const dashBoardPage = poManager.getDashBoardPage();
  
  const dragAndDropPage =poManager.getDragAndDropPage();
  
  await loginPage.goTo(testdata.logInDetails.baseURL);
  
  await loginPage.LoginToApplication(testdata.logInDetails.email,testdata.logInDetails.password);
  
  const dashBoardText = await dashBoardPage.verifyDashBoard();
  
  expect(dashBoardText).toBe("Dashboard");

  await dashBoardPage.navigateToCareSearch();
  
  await dragAndDropPage.dragAndDropPromotedProvider();
});

test("Verifying selectDates", async ({page}) => {

  const poManager: POManager = new POManager(page);
const loginPage = poManager.getLoginPage();
const dashBoardPage = poManager.getDashBoardPage();
const chatTrendsPage = poManager.getChatTrendsPage();
  
await loginPage.goTo(testdata.logInDetails.baseURL);
await loginPage.LoginToApplication(testdata.logInDetails.email,testdata.logInDetails.password);

const dashBoardText = await dashBoardPage.verifyDashBoard();
  
expect(dashBoardText).toBe("Dashboard");

  await dashBoardPage.navigateToChat();
  await chatTrendsPage.selectDateForTrends();

});