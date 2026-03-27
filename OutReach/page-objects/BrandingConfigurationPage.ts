import { fail } from "assert";
import { expect } from "@playwright/test";
import { Page, Locator } from 'playwright';
import {LoginData} from "../test-data/outreachData.json"
 
export class CreateBrandingConfigPage {
 
  //create Branding Configuration
  private page: Page;
  private createBrandingConfigButton : Locator;
  private brandingConfigurationNameTextbox : Locator;
  private marketDropdownOnPopup : Locator;
  private marketDropdownValueOnPopup : Locator;
  private locationLabel : Locator;
  private locationDropdown : Locator;
  private locationChipValue : Locator;
  private createBrandingConfigButtonOnCreateBrandingConfigPoUp : Locator;
  private locationLabelAfterAdding : Locator;
  private marketDropdown : Locator;
  private marketDropdownValue : Locator;
  private brandingConfigTab : Locator;
  private displayNameTextbox : Locator;
  private abbreaviatedNameTextbox : Locator;
  private addressLineTextbox : Locator;
  private cityTextbox : Locator;
  private stateTextbox : Locator;
  private zipTextbox : Locator;
  private copyrightTextbox : Locator;
  private saveChangesButton : Locator;
  private deleteBrandingConfigButton : Locator;
  private deleteBrandingConfigButtonOnModal : Locator;
  private brandingConfigTabOnNavBar : Locator;
  private brandingConfigTabForEdit : Locator;
 
 
  constructor(page: Page) {
 
    //Locators to create segmentation
    this.page = page;
    this.brandingConfigTabOnNavBar = page.locator("//a[contains(text(), 'Branding Configuration')]");
    this.createBrandingConfigButton = page.locator("(//span[contains(text(), 'Market')]//parent::div//parent::div//following::button[@data-testref='uniform-button'])[1]");
    this.brandingConfigurationNameTextbox = page.locator("//input[@id='Branding Configuration Name']");
    this.marketDropdownOnPopup = page.locator("//div[contains(@class, 'ReactModal__Content')]//div[contains(@class, 'MarketSingleSelect__indicators')]");
    this.marketDropdownValueOnPopup = page.locator("//div[contains(@class, 'ReactModal__Content')]//input[contains(@class, 'MarketSingleSelect__input')]");
    this.locationLabel = page.locator("//button//div[text()='Add Location']");
    this.locationDropdown = page.locator("//div[contains(@class, 'eactModal__Content')]//div[contains(@class, 'DefaultSelect__indicators')]");
    this.locationChipValue = page.locator("//div[contains(@class, 'eactModal__Content')]//input[contains(@class, 'DefaultSelect')]");
    this.createBrandingConfigButtonOnCreateBrandingConfigPoUp = page.locator("//div[contains(@class, 'eactModal__Content')]//div[text()='Create New Branding Configuration']");
    this.locationLabelAfterAdding = page.locator("//span[text()='Location']");
    this.marketDropdown = page.locator("//div[contains(@class, 'MarketSingleSelect__indicators')]");
    this.marketDropdownValue = page.locator("//input[contains(@class, 'MarketSingleSelect__input')]");
    this.brandingConfigTab = page.locator("(//span[contains(text(), 'aaautomation branding configs to edit')])[1]");
    this.displayNameTextbox = page.locator("//input[@id='Display Name']");
    this.abbreaviatedNameTextbox = page.locator("//input[@id='Abbreviated Name']");
    this.addressLineTextbox = page.locator("//input[@id='Address Line 1']");
    this.cityTextbox = page.locator("//input[@id='City']");
    this.stateTextbox = page.locator("//input[@id='State']");
    this.zipTextbox = page.locator("//input[@id='Zip']");
    this.copyrightTextbox = page.locator("//input[@id='Copyright']");
    this.saveChangesButton = page.locator("//div[contains(text(), 'Save changes')]");
    this.deleteBrandingConfigButton = page.locator("//div[contains(text(), 'Delete Branding Configurations')]");
    this.deleteBrandingConfigButtonOnModal = page.locator("//div[contains(@class, 'ReactModal__Content')]//div[text()='Delete']");
    this.brandingConfigTabForEdit = page.locator("//span[text()= 'automation segmentation for edit [saurabh do not edit]']");
 
  }
 
  async navigateToBrandingConfig(): Promise<void> {
    try {
      const isClickable = await this.brandingConfigTabOnNavBar.isVisible() && await this.brandingConfigTabOnNavBar.isEnabled();
      if (isClickable) {
    console.log('The brandingConfigTabOnNavBar is clickable.');
    await this.brandingConfigTabOnNavBar.click({ timeout: 55000 });
    } else {
    console.log('The brandingConfigTabOnNavBar is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }  
  }
 
  async clickOnCreateBrandingConfigButton(): Promise<void>  {
    try {
      const isClickable = await this.createBrandingConfigButton.isVisible() && await this.createBrandingConfigButton.isEnabled();
      if (isClickable) {
    console.log('The branding configuration button is clickable.');
    await this.createBrandingConfigButton.click({ timeout: 10000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
 async fillBrandingConfigurationName(brandingConfigurationName: string) {
    try {
      await this.brandingConfigurationNameTextbox.waitFor({ state: "visible", timeout: 5000 });
      await this.brandingConfigurationNameTextbox.fill(brandingConfigurationName);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnMarketDropdownOnCreateBrandingConfigPoUp(): Promise<void>  {
    try {
      const isClickable = await this.marketDropdownOnPopup.isVisible() ;
      if (isClickable) {
    console.log('The market dropdown is clickable.');
    await this.marketDropdownOnPopup.click({ timeout: 10000 });
    } else {
    console.log('The market dropdown is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async selectMarketOnCreateBrandingConfigPoUp(marketName: string) {
    try {
      await this.marketDropdownValueOnPopup.waitFor({ state: "visible", timeout: 20000 });
      await this.marketDropdownValueOnPopup.fill(marketName);
      await this.page.waitForTimeout(2000);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnLocationLabel(): Promise<void>  {
    try {
      const isClickable = await this.locationLabel.isVisible() ;
      if (isClickable) {
    console.log('The location label is clickable.');
    await this.locationLabel.click({ timeout: 10000 });
    } else {
    console.log('The location label is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async clickOnLocationDropdown(): Promise<void>  {
    try {
      const isClickable = await this.locationDropdown.isVisible() ;
      if (isClickable) {
    console.log('The location dropdown is clickable.');
    await this.locationDropdown.click({ timeout: 10000 });
    } else {
    console.log('The location dropdown is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async selectLocationOnCreateBrandingConfigPoUp(locationValue: string) {
    try {
      await this.locationChipValue.waitFor({ state: "visible", timeout: 5000 });
      await this.locationChipValue.fill(locationValue);
      await this.page.waitForTimeout(2000);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnLocationLabelAfterAdding(): Promise<void>  {
    try {
      const isClickable = await this.locationLabelAfterAdding.isVisible() ;
      if (isClickable) {
    console.log('The location label is clickable.');
    await this.locationLabelAfterAdding.click({ timeout: 10000 });
    } else {
    console.log('The location label is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async clickOnCreateBrandingConfigButtonOnCreateBrandingConfigPoUp(): Promise<void>  {
    try {
      const isClickable = await this.createBrandingConfigButtonOnCreateBrandingConfigPoUp.isVisible() && await this.createBrandingConfigButtonOnCreateBrandingConfigPoUp.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.createBrandingConfigButtonOnCreateBrandingConfigPoUp.click({ timeout: 10000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async clickOnMarketDropdown(): Promise<void>  {
    try {
      const isClickable = await this.marketDropdown.isVisible() ;
      if (isClickable) {
    console.log('The market dropdown is clickable.');
    await this.marketDropdown.click({ timeout: 10000 });
    } else {
    console.log('The market dropdown is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async selectMarket(marketName: string) {
    try {
      await this.marketDropdownValue.waitFor({ state: "visible", timeout: 5000 });
      await this.marketDropdownValue.fill(marketName);
      await this.page.waitForTimeout(2000);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnCreatedBrandedConfig(): Promise<void>  {
    try {
      const isClickable = await this.brandingConfigTab.isVisible() ;
      if (isClickable) {
    console.log('The created brand tab is clickable.');
    await this.brandingConfigTab.scrollIntoViewIfNeeded();
    await this.brandingConfigTab.click({ timeout: 10000 });
    } else {
    console.log('The created brand tab is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async fillDisplayName(displayName: string) {
    try {
      await this.displayNameTextbox.waitFor({ state: "visible", timeout: 5000 });
      await this.displayNameTextbox.scrollIntoViewIfNeeded();
      await this.displayNameTextbox.fill(displayName);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async fillAbbreviatedName(abbreviatedName: string) {
    try {
      await this.abbreaviatedNameTextbox.waitFor({ state: "visible", timeout: 5000 });
      await this.abbreaviatedNameTextbox.scrollIntoViewIfNeeded();
      await this.abbreaviatedNameTextbox.fill(abbreviatedName);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async fillAddressLine1(address1: string) {
    try {
      await this.addressLineTextbox.waitFor({ state: "visible", timeout: 5000 });
      await this.addressLineTextbox.scrollIntoViewIfNeeded();
      await this.displayNameTextbox.scrollIntoViewIfNeeded();
 
      await this.addressLineTextbox.fill(address1);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async fillCity(city: string) {
    try {
      await this.cityTextbox.waitFor({ state: "visible", timeout: 5000 });
      await this.cityTextbox.scrollIntoViewIfNeeded();
      await this.cityTextbox.fill(city);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async fillState(state: string) {
    try {
      await this.stateTextbox.waitFor({ state: "visible", timeout: 5000 });
      await this.stateTextbox.scrollIntoViewIfNeeded();
      await this.stateTextbox.fill(state);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async fillZip(zip: string) {
    try {
      await this.zipTextbox.waitFor({ state: "visible", timeout: 5000 });
      await this.zipTextbox.scrollIntoViewIfNeeded();
      await this.zipTextbox.fill(zip);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async fillCopyright(copyright: string) {
    try {
      await this.copyrightTextbox.waitFor({ state: "visible", timeout: 5000 });
      await this.copyrightTextbox.scrollIntoViewIfNeeded();
      await this.copyrightTextbox.fill(copyright);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnSaveChangesButton(): Promise<void>  {
    try {
      const isClickable = await this.saveChangesButton.isVisible() ;
      if (isClickable) {
    console.log('The savechanges button is clickable.');
    await this.saveChangesButton.scrollIntoViewIfNeeded();
    await this.saveChangesButton.click({ timeout: 10000 });
    } else {
    console.log('The savechanges button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnDeleteBrandingConfigButton(): Promise<void>  {
    try {
      const isClickable = await this.deleteBrandingConfigButton.isVisible() ;
      if (isClickable) {
    console.log('The delete configuration is clickable.');
    await this.deleteBrandingConfigButton.scrollIntoViewIfNeeded();
    await this.deleteBrandingConfigButton.click({ timeout: 10000 });
    } else {
    console.log('The created brand tab is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnDeleteBrandingConfigButtonOnModal(): Promise<void>  {
    try {
      const isClickable = await this.deleteBrandingConfigButtonOnModal.isVisible() ;
      if (isClickable) {
    console.log('The deleteBrandingConfigButtonOnModal is clickable.');
    await this.deleteBrandingConfigButtonOnModal.click({ timeout: 10000 });
    } else {
    console.log('The deleteBrandingConfigButtonOnModal is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnCreatedBrandedConfigForEdit(): Promise<void>  {
    try {
      const isClickable = await this.brandingConfigTabForEdit.isVisible() ;
      if (isClickable) {
    console.log('The created brand tab is clickable.');
    await this.brandingConfigTabForEdit.scrollIntoViewIfNeeded();
    await this.brandingConfigTabForEdit.click({ timeout: 10000 });
    } else {
    console.log('The created brand tab is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
}