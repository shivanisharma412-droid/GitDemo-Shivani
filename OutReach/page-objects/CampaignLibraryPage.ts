import { fail } from "assert";
import { expect } from "@playwright/test";
import { Page, Locator } from 'playwright';
 
export class CreateCampaignPage {

  //create Campaign
  private createCampaignButton : Locator;
  private createCampaignHeaderText : Locator;
  private campaignNameTextField : Locator;
  private tag : Locator;
  private frequency : Locator;
  private serviceLine : Locator;
  private contentCategory : Locator;
  private createCampaign : Locator;
  private navBar : Locator;
  private tagDropdown : Locator;
  private serviceLineDropdown : Locator;
  private contentCategoryDropdown : Locator;
  private selectAudienceSegmentationText : Locator;
  private saveNextButton : Locator;
  private emptyStateText : Locator;
  private activetabText : Locator;
  private brandingConfigurationDropdown : Locator;
  private displayName : Locator;
  private displayName1 : Locator;
  private SMSButton : Locator;
  private SMSInputField : Locator;
  private SMSLabelText : Locator;
  private SMSContent : Locator;
  private fullAddress : Locator
  private saveChangesButtonOnSMSScreen : Locator;
  private successfullMessageOnSnackbar : Locator;
  private backToContentOverviewLink : Locator;
  private launchButton : Locator;
  private launchModalText : Locator;
  private launchButtonOnModal : Locator;
  private successLaunchMessageOnModal : Locator;
  private generalRadioButton : Locator;
  private throtllingToggleButton : Locator;
  private marketLabel : Locator;
  private messageCount : Locator;
  private messageDropdown : Locator;
  private messagePer : Locator;
  private headingOnReviewPage : Locator;
  private valueOnReviewPage : Locator;
  private emailSmsDropdownText : Locator;
  private emailSmsValue : Locator;
  private createNewEmailButton: Locator;
  private emailNameTextbox: Locator;
  private emailSubjectLineDropdown: Locator;
  private emailBodyDropdown: Locator;
  private displayCallToActionToggle: Locator;
  private saveChangesButton: Locator;

  constructor(page: Page) {

    //create
    this.createCampaignButton = page.locator("//button//div[text()='Create New Campaign']");
    this.createCampaignHeaderText = page.locator("//*[@class='ReactModalPortal']/div//h1/div[2]");
    this.campaignNameTextField = page.locator("[label='Campaign Name']");
    this.tag = page.locator("//*[@class='Tag__input']");
    this.frequency = page.locator("//*[@class='FrequencyModal__input']");
    this.serviceLine = page.locator("//*[@class='ServiceLine__input']");
    this.contentCategory = page.locator("//*[@class='ContentCategory__input']");
    this.createCampaign = page.locator("//*[contains(@class, 'ReactModal__Content')]//button/div[text()= 'Create New Campaign']");
    this.navBar = page.locator("//div/nav/a");
    this.tagDropdown = page.locator("//*[@id='tag']/div/div[2]");
    this.serviceLineDropdown = page.locator("//*[@id='service-line']/div/div[2]");
    this.contentCategoryDropdown = page.locator("//*[@id='content-category']/div/div[2]");
    this.selectAudienceSegmentationText = page.locator("//p[text()= 'Select Audience Segmentation']");
    this.saveNextButton = page.locator("//button/div[text()= 'Save & Next']");
    this.emptyStateText = page.locator("//p[contains(@class,'styles__EmptyStateMessage')]");
    this.activetabText = page.locator("[href*='/campaign-builder'][aria-current]");
    this.brandingConfigurationDropdown = page.locator("[class='DefaultSelect__input']");
    this.displayName = page.locator("//td[text()= 'Lever Cirrhosis']");
    this.displayName1 = page.locator("//div[2]/table/tbody/tr/td[3]");
    this.SMSButton = page.locator("//section/div/button[2]");
    this.SMSInputField = page.locator("[label='SMS Name']");
    this.SMSLabelText = page.locator("[for='SMS Name']");
    this.SMSContent = page.locator("//*[contains(@class,'DefaultSelect__input-container')]/input");
    this.fullAddress = page.locator("//*[contains(@class,'styles__TextMessage')]/div/div");
    this.saveChangesButtonOnSMSScreen = page.locator("//div/button[2]");
    this.successfullMessageOnSnackbar = page.locator("//div[@role='status']/span");
    this.backToContentOverviewLink = page.locator("//div/div/div/div[2]/div[1]/div[1]/a");
    this.launchButton = page.locator("//div/div/div/div[2]/div/button[2]");
    this.launchModalText = page.locator("//div[@aria-modal='true']/h1/div[2]");
    this.launchButtonOnModal = page.locator("//button[contains(@class,'styles__ModalFooterPrimaryButton')]");
    this.successLaunchMessageOnModal = page.locator("//*[contains(@class,'styles__ModalBody')]/div/div[2]");
    this.generalRadioButton = page.locator("[id='general-radio']");
    this.throtllingToggleButton = page.locator("//div[3]/div[1]/div[1]/div");
    this.marketLabel = page.locator("//th[1]/div[contains(@class,'styles__StyledHeaderCellContent')]");
    this.messageCount = page.locator("//*[contains(@class,'styles__ThrottlingMessageDetailsInput')]");
    this.messageDropdown = page.locator("//*[contains(@class,'DefaultSelect__indicators')]");
    this.messagePer = page.locator("//div[contains(@class,'DefaultSelect__input')]/input");
    this.headingOnReviewPage = page.locator("//div[contains(@class,'styles__SectionHeading')]/span");
    this.valueOnReviewPage = page.locator("//div[contains(@class,'styles__SectionTitle')]");
    this.emailSmsDropdownText = page.locator("//div[contains(@class,'styles__ChannelsHeader')]");
    this.emailSmsValue = page.locator("//input[contains(@class,'DefaultSelect__input')]");
    this.createNewEmailButton = page.locator("//button//div[text()='Create New Email']");
    this.emailNameTextbox = page.locator("//input[@label='Email Name']");
    this.emailSubjectLineDropdown = page.locator("(//div[contains(@class, 'DefaultSelect__indicators')])[1]");
    this.emailBodyDropdown = page.locator("(//div[contains(@class, 'DefaultSelect__indicators')])[3]");
    this.displayCallToActionToggle = page.locator("//label[contains(text(), 'Display Call to Action Button')]//following-sibling::div//input");
    this.saveChangesButton = page.locator("//button/div[text()= 'Save Changes']");
  }
 
 
  async clickOnCreateCampaignButton(): Promise<void>  {
    try {
      const isClickable = await this.createCampaignButton.isVisible();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.createCampaignButton.click({ timeout: 10000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async getCreateCampaignHeaderText() {
    try {
      // Wait for the element to be visible
      await this.createCampaignHeaderText.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await this.createCampaignHeaderText.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async campaignName(campaignname: string): Promise<void>  {
    try {
      await this.campaignNameTextField.waitFor({ state: "visible", timeout: 5000 });
      await this.campaignNameTextField.fill(campaignname);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async tagField(tagname: string): Promise<void> {
    try {
      await this.tag.waitFor({ state: "visible", timeout: 5000 });
      await this.tag.fill(tagname);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  
 
  async frequencyField(frequencyname: string): Promise<void> {
    try {
      await this.frequency.waitFor({ state: "visible", timeout: 5000 });
      await this.frequency.fill(frequencyname);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

 
  async serviceLineField(serviceLinename: string): Promise<void> {
    try {
      await this.serviceLine.waitFor({ state: "visible", timeout: 5000 });
      await this.serviceLine.fill(serviceLinename);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async contentCategoryField(contentCategoryname: string): Promise<void> {
    try {
      await this.contentCategory.waitFor({ state: "visible", timeout: 5000 });
      await this.contentCategory.fill(contentCategoryname);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnCreateCampaign() {
    try {
      const isClickable = await this.createCampaign.isVisible() && await this.createCampaign.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.createCampaign.click({ timeout: 10000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async clickOnNavBar() {
    try {
      const isClickable = await this.navBar.isVisible() && await this.navBar.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.navBar.click({ timeout: 10000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOntagField() {
    try {
      const isClickable = await this.tagDropdown.isVisible() && await this.tagDropdown.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.tagDropdown.click({ timeout: 20000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }


  
  async clickOnserviceLineField() {
    try {
      const isClickable = await this.serviceLineDropdown.isVisible() && await this.serviceLineDropdown.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.serviceLineDropdown.click({ timeout: 20000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOncontentCategoryField() {
    try {
      const isClickable = await this.contentCategoryDropdown.isVisible() && await this.contentCategoryDropdown.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.contentCategoryDropdown.click({ timeout: 20000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  } 
  async getActiveTabText() {
    try {
      // Wait for the element to be visible
      await this.activetabText.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await this.activetabText.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getSlectAudienceSegmentationText() {
    try {
      // Wait for the element to be visible
      await this.selectAudienceSegmentationText.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await this.selectAudienceSegmentationText.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  
  async getEmptyStateMessage() {
    try{
     // Wait for the element to be visible
     await this.emptyStateText.waitFor({ state: "visible", timeout: 20000 });
     // Get the text content of the element
     return await this.emptyStateText.textContent();

    }
    catch(e){
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnSaveNextButton(): Promise<void>  {
    try {
      const isClickable = await this.saveNextButton.isVisible() && await this.saveNextButton.isEnabled();
      if (isClickable) {
    console.log('Save & Next button is clickable.');
    await this.saveNextButton.click({ timeout: 10000 });
    } else {
    console.log('Save & Next button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async selectBrandingConfig(brandingConfigName: string): Promise<void> {
    try {
      await this.brandingConfigurationDropdown.waitFor({ state: "visible", timeout: 5000 });
      await this.brandingConfigurationDropdown.fill(brandingConfigName);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getDisplayNameText() {
    try {
      // Wait for the element to be visible
      await this.displayName.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await this.displayName.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getDisplayNameText1() {
    try {
      // Wait for the element to be visible
      await this.displayName1.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await this.displayName1.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnCreateSMSButton(): Promise<void>  {
    try {
      await this.SMSButton.scrollIntoViewIfNeeded();
      const isClickable = await this.SMSButton.isVisible() && await this.SMSButton.isEnabled();
      if (isClickable) {
    console.log('SMS button is clickable.');
    await this.SMSButton.click({ timeout: 10000 });
    } else {
    console.log('SMS button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getSMSLabelText() {
    try {
      // Wait for the element to be visible
      await this.SMSLabelText.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await this.SMSLabelText.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async AddSMSName(value: string): Promise<void>  {
    try {
      const isClickable = await this.SMSInputField.isVisible() && await this.SMSInputField.isEnabled();
      if (isClickable) {
    console.log('SMS input field is clickable.');
    await this.SMSInputField.click({ timeout: 10000 });
    await this.SMSInputField.fill(value);
    } else {
    console.log('SMS input field is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async AddSMSContent(value: string): Promise<void>  {
    try {
      const isClickable = await this.SMSContent.isVisible() && await this.SMSContent.isEnabled();
      if (isClickable) {
    console.log('SMS content field is clickable.');
    await this.SMSContent.click({ timeout: 10000 });
    await this.SMSContent.fill(value);
    } else {
    console.log('SMS content field is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getFullAddressText() {
    try {
      // Wait for the element to be visible
      await this.fullAddress.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await this.fullAddress.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnSaveChangesButtonOnSMSScreen() {
    try {
      const isClickable = await this.saveChangesButtonOnSMSScreen.isVisible();
      if (isClickable) {
    console.log('Save changes button on SMS create screen is clickable.');
    await this.saveChangesButtonOnSMSScreen.click({ timeout: 20000 });
    } else {
    console.log('Save changes button on SMS create screen is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getSnackbarText() {
    try {
      // Wait for the element to be visible
      await this.successfullMessageOnSnackbar.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await this.successfullMessageOnSnackbar.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnBackToContentOverviewLink() {
    try {
      const isClickable = await this.backToContentOverviewLink.isVisible();
      if (isClickable) {
    console.log('Back to Content Overview Link is clickable.');
    await this.backToContentOverviewLink.click({ timeout: 20000 });
    } else {
    console.log('Back to Content Overview Link is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getSaveButtonState(){
    try{
      const isDisabled = await this.saveNextButton.isDisabled();
    console.log('Save button is disabled: ' + isDisabled);
    return isDisabled;
    }
    catch (e){
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnLaunchButton() {
    try {
      const isClickable = await this.launchButton.isVisible() && await this.launchButton.isEnabled();
      if (isClickable) {
    console.log('The launch button is clickable.');
    await this.launchButton.click({ timeout: 5000 });
    } else {
    console.log('The launch button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getLaunchModalText() {
    try {
      // Wait for the element to be visible
      await this.launchModalText.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await this.launchModalText.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnLaunchButtonOnModal() {
    try {
      const isClickable = await this.launchButtonOnModal.isVisible() && await this.launchButtonOnModal.isEnabled();
      if (isClickable) {
    console.log('The launch button on modal is clickable.');
    await this.launchButtonOnModal.click({ timeout: 20000 });
    } else {
    console.log('The launch button on modal is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getSuccessLaunchMessageOnModal() {
    try {
      // Wait for the element to be visible
      await this.successLaunchMessageOnModal.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await this.successLaunchMessageOnModal.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getRadioButtonState() {
    try {
      const isChecked = await this.generalRadioButton.isChecked();
      console.log('Radio button is checked: ' + isChecked);
      return isChecked;
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnEnableThrottling() {
    try {
      await this.throtllingToggleButton.scrollIntoViewIfNeeded();
      const isClickable = await this.throtllingToggleButton.isVisible();
      if (isClickable) {
    console.log('Throtlling Toggle Button is clickable.');
    await this.throtllingToggleButton.click({ timeout: 20000 });
    } else {
    console.log('Throtlling Toggle Button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getMarketLabel() {
    try {
      // Wait for the element to be visible
      await this.marketLabel.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await this.marketLabel.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async AddMessageCOunt(value: string): Promise<void>  {
    try {
      const isClickable = await this.messageCount.isVisible();
      if (isClickable) {
    console.log('SMS input field is clickable.');
    await this.messageCount.click({ timeout: 10000 });
    await this.messageCount.fill("");
    await this.messageCount.fill(value);
    } else {
    console.log('SMS input field is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnMessageDropdown(): Promise<void>  {
    try {
      const isClickable = await this.messageDropdown.isVisible();
      if (isClickable) {
    console.log('Message dropdown is clickable.');
    await this.messageDropdown.click({ timeout: 10000 });
    } else {
    console.log('Message dropdown is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async addMessagePer(value: string): Promise<void> {
    try {
      await this.messagePer.waitFor({ state: "visible", timeout: 5000 });
      await this.messagePer.fill(value);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async getHeadingOnReviewText(value: number) {
    try {
      const firstElement = this.headingOnReviewPage.nth(value);
      // Wait for the element to be visible
      await firstElement.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await firstElement.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getValueOnReviewPageText(value: number) {
    try {
      const firstElement = this.valueOnReviewPage.nth(value);
      // Wait for the element to be visible
      await firstElement.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await firstElement.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getEmailSmsDropdownText() {
    try {
      const secondElement = this.emailSmsDropdownText.nth(1);
      // Wait for the element to be visible
      await secondElement.waitFor({ state: "visible", timeout: 20000 });
      // Get the text content of the element
      return await secondElement.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async clickOnEmailSmsDropdown(): Promise<void>  {
    try {
      const isClickable = await this.emailSmsValue.isVisible();
      if (isClickable) {
    console.log('Message dropdown is clickable.');
    await this.emailSmsValue.click({ timeout: 10000 });
    } else {
    console.log('Message dropdown is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async addEmailSmsValue(value: string): Promise<void> {
    try {
      await this.emailSmsValue.waitFor({ state: "visible", timeout: 5000 });
      await this.emailSmsValue.fill(value);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  clickOnCreateNewEmailButton = async () => {
    try {
      await this.createNewEmailButton.waitFor({ state: "visible", timeout: 50000 });
      await this.createNewEmailButton.scrollIntoViewIfNeeded();
      await this.createNewEmailButton.click();
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
 
  async fillEMailName(EmailName: string) {
    try {
      await this.emailNameTextbox.waitFor({ state: "visible", timeout: 5000 });
      await this.emailNameTextbox.fill(EmailName);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnEmailSubjectLineDropdown(): Promise<void> {
    try {
      const isClickable = await this.emailSubjectLineDropdown.isVisible();
      if (isClickable) {
        console.log('The emailSubjectLineDropdown is clickable.');
        await this.emailSubjectLineDropdown.scrollIntoViewIfNeeded();
        await this.emailSubjectLineDropdown.click({ timeout: 10000 });
      } else {
        console.log('The emailSubjectLineDropdown is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnEmailBodyDropdown(): Promise<void> {
    try {
      const isClickable = await this.emailBodyDropdown.isVisible();
      if (isClickable) {
        console.log('The emailBodyDropdown is clickable.');
        await this.emailBodyDropdown.scrollIntoViewIfNeeded();
        await this.emailBodyDropdown.click({ timeout: 10000 });
      } else {
        console.log('The emailBodyDropdown is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnDisplayCallToActionToggle(): Promise<void> {
    try {
      const isClickable = await this.displayCallToActionToggle.isVisible();
      if (isClickable) {
        console.log('The displayCallToActionToggle is clickable.');
        await this.displayCallToActionToggle.scrollIntoViewIfNeeded();
        await this.displayCallToActionToggle.click({ timeout: 10000 });
      } else {
        console.log('The displayCallToActionToggle is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnSaveChangesButtonToCreateEmail(): Promise<void> {
    try {
      const isClickable = await this.saveChangesButton.isVisible();
      if (isClickable) {
        console.log('The saveChangesButton is clickable.');
        await this.saveChangesButton.scrollIntoViewIfNeeded();
        await this.saveChangesButton.click({ timeout: 10000 });
      } else {
        console.log('The saveChangesButton is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
}
 