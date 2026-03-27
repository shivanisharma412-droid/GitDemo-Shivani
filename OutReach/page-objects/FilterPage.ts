import { fail } from "assert";
import { expect } from "@playwright/test";
import { Page, Locator } from 'playwright';
 
export class FilterPage {

  //filter
  private filterButton : Locator;
  private campaignStatusDropdown : Locator;
  private selectCampaignStatus : Locator;
  private frequencyDropdown : Locator;
  private marketDropdown : Locator;
  private selectMarket : Locator;
  private dateRangeDatePicker : Locator;
  private filterAppliedText : Locator;
  private applyFilterButton : Locator;
  private filterForm : Locator;
  
  constructor(page: Page) {
  
    //filter
    this.filterButton = page.locator("//div[text()='Filter']");
    this.campaignStatusDropdown = page.locator("(//div[contains(@class, 'campaign-filters__indicators')])[1]");
    this.selectCampaignStatus = page.locator("(//*[@class='campaign-filters__input'])[1]");
    this.marketDropdown = page.locator("(//div[contains(@class, 'campaign-filters__indicators')])[3]");
    this.selectMarket = page.locator("(//*[@class='campaign-filters__input'])[3]");
    this.dateRangeDatePicker = page.locator("//input[@name='custom-datepicker-input']");
    this.filterForm = page.locator("//div[@data-testref='filter-container']");
    this.applyFilterButton = page.locator("//div[text()='Apply Filters']");
    this.filterAppliedText = page.locator("//button[text()='Clear Filters']");
  }
 
  
  async clickOnfrequencyField() {
    try {
      const isClickable = await this.frequencyDropdown.isVisible() && await this.frequencyDropdown.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.frequencyDropdown.click({ timeout: 20000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  
 
  clickOnFilterButton = async () => {
    try {
      await this.filterButton.waitFor({ state: "visible", timeout: 50000 });
      await this.filterButton.click();
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
  clickOnCampaignStatusFilterDropdown = async () => {
    try {
 
      await this.campaignStatusDropdown.waitFor({ state: "visible", timeout: 50000 });
      await this.campaignStatusDropdown.click();
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
  selectFilterDropdownValue = async (dropdownValue: string) => {
    try {
      await this.selectCampaignStatus.waitFor({ state: "visible", timeout: 5000 });
      await this.selectCampaignStatus.fill(dropdownValue);
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
 
 
  clickOnMarketFilterDropdown = async () => {
    try {
      await this.marketDropdown.waitFor({ state: "visible", timeout: 50000 });
      await this.marketDropdown.click();
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
  selectMarketFilterDropdownValue = async (dropdownValue: string) => {
    try {
      await this.selectMarket.waitFor({ state: "visible", timeout: 5000 });
      await this.selectMarket.fill(dropdownValue);
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
 
  getFilterAppliedText = async () => {
    try {
      await this.filterAppliedText.waitFor({ state: "visible", timeout: 5000 });
      return await this.filterAppliedText.textContent();
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
 
  clickOnClearFilter = async () => {
    try {
      await this.filterAppliedText.waitFor({ state: "visible", timeout: 50000 });
      await this.filterAppliedText.click();
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
 
 clickOnApplyFiltersButton = async () => {
    try {
      await this.applyFilterButton.waitFor({ state: "visible", timeout: 50000 });
      await this.applyFilterButton.click();
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
 
  
  selectStartDateRangeValue = async (startDate: string) => {
    try {
      await this.dateRangeDatePicker.waitFor({ state: "visible", timeout: 5000 });
      await this.dateRangeDatePicker.fill(startDate);
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
 
  selectEndDateRangeValue = async (endDate: string) => {
    try {
      await this.dateRangeDatePicker.waitFor({ state: "visible", timeout: 5000 });
      await this.dateRangeDatePicker.type(endDate);
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
  clickOnFilterForm = async () => {
    try {
      await this.filterForm.waitFor({ state: "visible", timeout: 50000 });
      await this.filterForm.click();
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
}