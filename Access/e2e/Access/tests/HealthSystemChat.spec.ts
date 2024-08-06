import { test, expect } from '@playwright/test';
import { POManager } from '../../../page-objects/POManager';
import * as testdata from "../../../test-data/testdata.json";

test.only("verify Cards Display in Chat Window @Access-1200",async({page})=>{
  const poManager = new POManager(page);
  
  const loginPage = poManager.getLoginPage();
  
  await loginPage.navigateToHelathCare(testdata.logInDetails.healthCareURL,testdata.logInDetails.email);

  const healthSystemChatPage =poManager.getHealathSystemChatPage();
  
  await healthSystemChatPage.verifyingCardsDisplayinChatWindow();
})