import { fail } from "assert";
import { expect } from "@playwright/test";
import { Page, Locator } from 'playwright';
 
export class SearchCampaignPage {

  //search campaign
  private search : Locator;
  private selectOptionFromSearch : Locator;
  private searchText : Locator;
  private clearSearchText : Locator;
  private tagDropdown : Locator;
  private serviceLineDropdown : Locator;
  private contentCategoryDropdown : Locator;
  private searchedCampaignName : Locator;
  private editCampaignButton : Locator;
  private checkboxOnEditModal : Locator;
  private editModalHeading : Locator;
  private editButtonOnModal : Locator;
  private draftText : Locator;
  private exitBuilderLink : Locator;
  private ellipsis : Locator;
  private editText : Locator;
  private updateCampaignButton : Locator;
  private editMarketLink : Locator;

  constructor(page: Page) {
  
    this.search = page.locator("input[placeholder='Search for Campaigns']");
    this.selectOptionFromSearch = page.locator("//div/button[2]");
    this.searchText = page.locator("//div[2]/div/div/div[2]/div[1]/span");
    this.clearSearchText = page.locator("//div[2]/div[2]/button");
    this.tagDropdown = page.locator("//*[@id='tag']/div/div[2]");
    this.serviceLineDropdown = page.locator("//*[@id='service-line']/div/div[2]");
    this.contentCategoryDropdown = page.locator("//*[@id='content-category']/div/div[2]");
    this.searchedCampaignName = page.locator("//*[contains(@class,'styles__StyledCampaignName')]")
    this.editCampaignButton = page.locator("//div/div/div/div[2]/div[2]/button[2]");
    this.checkboxOnEditModal = page.locator("//*[contains(@class,'styles__CheckboxCustom')]");
    this.editModalHeading = page.locator("//*[contains(@class,'styles__ModalHeader')]");
    this.editButtonOnModal = page.locator("//*[contains(@class,'styles__ModalFooterPrimaryButton')]");
    this.draftText = page.locator("//div/div[1][contains(@class,'styles__BadgeInner')]");
    this.exitBuilderLink = page.locator("//button[contains(@class,'styles__StyledExitButton')]");
    this.ellipsis = page.locator("//table/tbody/tr[1]/td[9]/div");
    this.editText = page.locator("//div[2]/div/ul/li[2]/div");
    this.updateCampaignButton = page.locator("//button/div[text()= 'Save Changes']");
    this.editMarketLink = page.locator("//button[contains(@class,'styles__EditMarketsButton')]");
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

  async searchField(stringname: string) {
    try {
      await this.search.waitFor({ state: "visible", timeout: 5000 });
      await this.search.fill(stringname);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnSearchOption() {
    try {
      const isClickable = await this.selectOptionFromSearch.isVisible() && await this.selectOptionFromSearch.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.selectOptionFromSearch.click({ timeout: 10000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async getSearchText() {
    try {
      // Wait for the element to be visible
      await this.searchText.waitFor({ state: "visible", timeout: 10000 });
      // Get the text content of the element
      return await this.searchText.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnClearSearchText() {
    try {
      const isClickable = await this.clearSearchText.isVisible() && await this.clearSearchText.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.clearSearchText.click({ timeout: 10000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnSearchCampaignName() {
    try {
      const isClickable = await this.searchedCampaignName.isVisible() && await this.searchedCampaignName.isEnabled();
      if (isClickable) {
    console.log('The link is clickable.');
    await this.searchedCampaignName.click({ timeout: 10000 });
    } else {
    console.log('The link is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnEditCampaignButton() {
    try {
      const isClickable = await this.editCampaignButton.isVisible() && await this.editCampaignButton.isEnabled();
      if (isClickable) {
    console.log('The link is clickable.');
    await this.editCampaignButton.click({ timeout: 10000 });
    } else {
    console.log('The link is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getEditModalHeadingText() {
    try {
      // Wait for the element to be visible
      await this.editModalHeading.waitFor({ state: "visible", timeout: 10000 });
      // Get the text content of the element
      return await this.editModalHeading.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnCheckbox() {
    try {
      const isClickable = await this.checkboxOnEditModal.isVisible() && await this.checkboxOnEditModal.isEnabled();
      if (isClickable) {
    console.log('The link is clickable.');
    await this.checkboxOnEditModal.click({ timeout: 10000 });
    } else {
    console.log('The link is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getEditButtonState(){
    try{
      const isDisabled = await this.editButtonOnModal.getAttribute('disabled');
      console.log('Value is '+isDisabled);
       return isDisabled;
    }
    catch (e){
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnEditButtonOnModal() {
    try {
      const isClickable = await this.editButtonOnModal.isVisible() && await this.editButtonOnModal.isEnabled();
      if (isClickable) {
    console.log('The link is clickable.');
    await this.editButtonOnModal.click({ timeout: 10000 });
    } else {
    console.log('The link is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async isDraftbadgeVisible() {
    try {
      // Wait for the element to be visible
      await this.draftText.waitFor({ state: "visible", timeout: 10000 });
      // Get the text content of the element
      return await this.draftText.isVisible();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnExitBuilderLink() {
    try {
      const isClickable = await this.exitBuilderLink.isVisible() && await this.exitBuilderLink.isEnabled();
      if (isClickable) {
    console.log('The exit builder Link  is clickable.');
    await this.exitBuilderLink.click({ timeout: 20000 });
    } else {
    console.log('The exit builder Link is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnEllipsis() {
    try {
      const isClickable = await this.ellipsis.isVisible() && await this.ellipsis.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.ellipsis.click({ timeout: 10000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getEditOptionText() {
    try {
      // Wait for the element to be visible
      await this.editText.waitFor({ state: "visible", timeout: 5000 });
      // Get the text content of the element
      return await this.editText.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnEditText() {
    try {
      const isClickable = await this.editText.isVisible() && await this.editText.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.editText.click({ timeout: 10000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async getSearchedCampaignNameText() {
    try {
      // Wait for the element to be visible
      await this.searchedCampaignName.waitFor({ state: "visible", timeout: 10000 });
      // Get the text content of the element
      return await this.searchedCampaignName.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnUpdateCampaign() {
    try {
      const isClickable = await this.updateCampaignButton.isVisible() && await this.updateCampaignButton.isEnabled();
      if (isClickable) {
    console.log('The Save Changes button is clickable.');
    await this.updateCampaignButton.click({ timeout: 10000 });
    } else {
    console.log('The Save Changes button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }

  async clickOnEditMarketLink() {
    try {
      const isClickable = await this.editMarketLink.isVisible() && await this.editMarketLink.isEnabled();
      if (isClickable) {
    console.log('The edit market link is clickable.');
    await this.editMarketLink.click({ timeout: 10000 });
    } else {
    console.log('The edit market link is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
}
