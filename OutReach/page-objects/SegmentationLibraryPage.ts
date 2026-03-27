import { fail } from "assert";
import { expect } from "@playwright/test";
import { Page, Locator } from 'playwright';
 
export class SegmentationPage {
 
  //Locators when newtab is opened during edit of segmentation
  private searchSegmentation: Locator;
  private editIconOnSegmenation: Locator;
  private frequencyDropdown: Locator;
 
  //create Segmentation
  private page: Page;
  private createSegmentationButton: Locator;
  private segmentationNameTextbox: Locator;
  private dataSourceDropdown: Locator;
  private dataSourceValue: Locator;
  private tagDropdown: Locator;
  private tagOptionValue: Locator;
  private createSegmentationButtonOnCreateSegmentationPoUp: Locator;
  private editLabelOnMenuList: Locator;
  private menuIcon: Locator;
  private searchCreatedSegmentationTextbox: Locator;
  private deleteLabelOnMenuList: Locator;
  private checkboxOnDeleteModal: Locator;
  private deleteButton: Locator;
  private saveChangesButton: Locator;
  private searchText: Locator;
  private addCriteriaIncludeAudience: Locator;
  private selectCriteriaDropdown: Locator;
  private selectAppointment: Locator;
  private selectAppointmentDate: Locator;
  private selectAppointmentConditionDropdown: Locator;
  private conditionAppointmentValue: Locator;
  private dateValueTextbox: Locator;
  private selectTimeFrameDropdown: Locator;
  private timeFrameConditionValue: Locator;
  private selectLocationMarketCriteriaDropdown: Locator;
  private locationMarketCriteriaValue: Locator;
  private selectLocationConditionDropdown: Locator;
  private locationMarketConditionValue: Locator;
 
  private addCriteriaExcludeAudience: Locator;
  private selectPatient: Locator;
  private patientStatus: Locator;
  private selectPatientStatusConditionDropdown: Locator;
  private patientStatusConditionValue: Locator;
  private saveChangesButtonOnSegmentationPanel: Locator;
  private closeButtonOnSegmentationPanel: Locator;
  private selectPatientStatusValueDropdown: Locator;
  private patientStatusValue: Locator;
  private segmentationLibraryTabOnNavBar: Locator;
 
  constructor(page: Page) {
    this.searchSegmentation = page.locator("//*[contains(@class, 'AudienceSegmentation__input-container ')]/input");
    this.editIconOnSegmenation = page.locator("//*[contains(@class,'styles__StyledDrpdwnEditIcon')]");
    this.frequencyDropdown = page.locator("//*[@id='frequency']/div/div[2]");
    // Locators when segmentation is created
 
    this.page = page;
    this.segmentationLibraryTabOnNavBar = page.locator("(//a[contains(text(), 'Segmentation Library')])[1]");
    this.createSegmentationButton = page.locator("//h1[text()= 'Segmentation Library']//parent::div//parent::div//div[2]/button");
    this.segmentationNameTextbox = page.locator("//input[@id='Segmentation Name']");
    this.dataSourceDropdown = page.locator("//div[contains(@class, 'ReactModal__Content')]//div[contains(@class, 'DataSource__indicators')]");
    this.dataSourceValue = page.locator("//div[contains(@class, 'ReactModal__Content')]//input[contains(@class, 'DataSource__input')]");
    this.tagDropdown = page.locator("//div[contains(@class, 'ReactModal__Content')]//div[contains(@class, 'Tag__indicators ')]");
    this.tagOptionValue = page.locator("//div[contains(@class, 'ReactModal__Content')]//input[contains(@class, 'Tag__input')]");
    this.createSegmentationButtonOnCreateSegmentationPoUp = page.locator("//div[contains(@class, 'ReactModal__Content')]//button//div[text()='Create Segmentation']");
    this.editLabelOnMenuList = page.locator("//div[text()='Edit']");
    this.menuIcon = page.locator("(//tbody//tr//td[6]//div)[1]");
    this.searchCreatedSegmentationTextbox = page.locator("//input [@placeholder='Search']");
    this.deleteLabelOnMenuList = page.locator("//div[text()='Delete']");
    this.checkboxOnDeleteModal = page.locator("(//label[contains(@class, 'delete-disclaimer-checkbox')]//span)[1]");
    this.deleteButton = page.locator("//div[contains(@class, 'campaign__footer')]//div[text()='Delete Segmentation']");
    this.saveChangesButton = page.locator("//div[contains(@class, 'ReactModal__Content')]//button//div[text()='Save Changes']");
    this.searchText = page.locator("//span[contains(text(), 'Showing')]");
    this.addCriteriaIncludeAudience = page.locator("(//div[contains(text(), 'Add Criteria')])[1]");
    this.selectCriteriaDropdown = page.locator("(//div[contains(@class, 'CriteriaSelect__indicator')])[1]");
    this.selectAppointment = page.locator("//div[contains(@class, 'criteria-left-menu-container')]//div[contains(text(), 'Appointment')]");
    this.selectAppointmentDate = page.locator("//div[contains(@class, 'CriteriaSelect__menu-list')]//div[contains(text(), 'Date')]");
    this.selectAppointmentConditionDropdown = page.locator("(//div[contains(@class, 'CritieriaOperatorSelect__indicators')])[1]");
    this.conditionAppointmentValue = page.locator("(//div[contains(@class, 'CritieriaOperatorSelect__control')]//input[contains(@class, 'CritieriaOperatorSelect__input')])[1]");
    this.dateValueTextbox = page.locator("(//input[@placeholder='Enter Value'])[1]");
    this.selectTimeFrameDropdown = page.locator("(//div[contains(@class, 'DefaultSelect__indicators')])[1]");
    this.timeFrameConditionValue = page.locator("(//div[contains(@class, 'DefaultSelect__input-container')]//input[contains(@class, 'DefaultSelect__input')])[1]");
    this.selectLocationMarketCriteriaDropdown = page.locator("(//div[contains(@class, 'DefaultSelect__indicators')])[2]");
    this.locationMarketCriteriaValue = page.locator("(//div[contains(@class, 'DefaultSelect__input-container')]//input[contains(@class, 'DefaultSelect__input')])[2]");
    this.selectLocationConditionDropdown = page.locator("(//div[contains(@class, 'CritieriaOperatorSelect__indicators')])[2]");
    this.locationMarketConditionValue = page.locator("(//div[contains(@class, 'CritieriaOperatorSelect__control')]//input[contains(@class, 'CritieriaOperatorSelect__input')])[2]");
 
    this.addCriteriaExcludeAudience = page.locator("(//div[contains(text(), 'Add Criteria')])[1]");
    this.selectPatient = page.locator("//div[contains(@class, 'criteria-left-menu-container')]//div[contains(text(), 'Patient')]");
    this.patientStatus = page.locator("//div[contains(@class, 'CriteriaSelect__menu-list')]//div[contains(text(), 'Patient Status')]");
    this.selectPatientStatusConditionDropdown = page.locator("(//div[contains(@class, 'CritieriaOperatorSelect__indicators')])[1]");
    this.patientStatusConditionValue = page.locator("(//div[contains(@class, 'CritieriaOperatorSelect__control')]//input[contains(@class, 'CritieriaOperatorSelect__input')])[1]");
    this.saveChangesButtonOnSegmentationPanel = page.locator("//button//div[text()='Save Changes']");
    this.closeButtonOnSegmentationPanel = page.locator("//button//div[text()='Close']");
    this.selectPatientStatusValueDropdown = page.locator("(//div[contains(@class, 'CritieriaValueSelect__indicator')])[1]");
    this.patientStatusValue = page.locator("(//div[contains(@class, 'CritieriaValueSelect__value-container')]//input[contains(@class, 'CritieriaValueSelect__input')])[1]");
 
  }
 
  async navigateToSegmentationPage(): Promise<void> {
    try {
      const isClickable = await this.segmentationLibraryTabOnNavBar.isVisible() && await this.segmentationLibraryTabOnNavBar.isEnabled();
      if (isClickable) {
    console.log('The segmentationLibraryTabOnNavBar is clickable.');
    await this.segmentationLibraryTabOnNavBar.click({ timeout: 55000 });
    } else {
    console.log('The segmentationLibraryTabOnNavBar is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }  
  }
 
  async searchFieldOnSegmentation(stringname: string) {
    try {
      await this.searchSegmentation.waitFor({ state: "visible", timeout: 5000 });
      await this.searchSegmentation.fill(stringname);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  clickOnEditIconOnSegmenation = async () => {
    try {
      await this.editIconOnSegmenation.waitFor({ state: "visible", timeout: 50000 });
      await this.editIconOnSegmenation.click();
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
 
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
 
  async clickOnCreateSegmentationButton(): Promise<void> {
    try {
      const isClickable = await this.createSegmentationButton.isVisible() && await this.createSegmentationButton.isEnabled();
      if (isClickable) {
        console.log('The create segmentation button is clickable.');
        await this.createSegmentationButton.click({ timeout: 10000 });
      } else {
        console.log('The create segmentation button is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async fillSegmentationName(segmentationName: string) {
    try {
      await this.segmentationNameTextbox.waitFor({ state: "visible", timeout: 5000 });
      await this.segmentationNameTextbox.fill(segmentationName);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnDataSourceDropdown(): Promise<void> {
    try {
      const isClickable = await this.dataSourceDropdown.isVisible();
      if (isClickable) {
        console.log('The market dropdown is clickable.');
        await this.dataSourceDropdown.click({ timeout: 10000 });
      } else {
        console.log('The market dropdown is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async selectDataSourceValue(dataSource: string) {
    try {
      await this.dataSourceValue.waitFor({ state: "visible", timeout: 5000 });
      await this.dataSourceValue.fill(dataSource);
      await this.page.waitForTimeout(2000);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnTagDropdown(): Promise<void> {
    try {
      const isClickable = await this.tagDropdown.isVisible();
      if (isClickable) {
        console.log('The tag dropdown is clickable.');
        await this.tagDropdown.click({ timeout: 10000 });
      } else {
        console.log('The tag dropdown label is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async selectTagOption(tagValue: string) {
    try {
      await this.tagOptionValue.waitFor({ state: "visible", timeout: 5000 });
      await this.tagOptionValue.fill(tagValue);
      await this.page.waitForTimeout(2000);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnCreateSegmentationButtonOnCreateSegmentationPoUp(): Promise<void> {
    try {
      const isClickable = await this.createSegmentationButtonOnCreateSegmentationPoUp.isVisible();
      if (isClickable) {
        console.log('The createSegmentationButtonOnCreateSegmentationPoUp is clickable.');
        await this.createSegmentationButtonOnCreateSegmentationPoUp.click();
        await this.createSegmentationButtonOnCreateSegmentationPoUp.click();
 
      } else {
        console.log('The createSegmentationButtonOnCreateSegmentationPoUp is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  clickOnMenuIcon = async () => {
    try {
      await this.menuIcon.waitFor({ state: "visible", timeout: 50000 });
      await this.menuIcon.click();
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
 
  clickOnEditIconOnSegmenationMenuList = async () => {
    try {
      await this.editLabelOnMenuList.waitFor({ state: "visible", timeout: 50000 });
      await this.editLabelOnMenuList.click();
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
 
  async searchCreatedSegmentation(searchSegment: string) {
    try {
      await this.searchCreatedSegmentationTextbox.waitFor({ state: "visible", timeout: 5000 });
      await this.searchCreatedSegmentationTextbox.fill(searchSegment);
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  clickOnDeleteIconOnSegmenationMenuList = async () => {
    try {
      await this.deleteLabelOnMenuList.waitFor({ state: "visible", timeout: 50000 });
      await this.deleteLabelOnMenuList.click();
    } catch (error) {
      fail('Failed due to exception ' + error);
    }
  };
 
  async clickOnCheckbox() {
    try {
      const isClickable = await this.checkboxOnDeleteModal.isVisible() && await this.checkboxOnDeleteModal.isEnabled();
      if (isClickable) {
        console.log('The checkboxOnDeleteModal is clickable.');
        await this.checkboxOnDeleteModal.click({ timeout: 10000 });
      } else {
        console.log('The checkboxOnDeleteModal is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnDeleteButton() {
    try {
      const isClickable = await this.deleteButton.isVisible() && await this.deleteButton.isEnabled();
      if (isClickable) {
        console.log('The deleteButton is clickable.');
        await this.deleteButton.click({ timeout: 10000 });
      } else {
        console.log('The deleteButton is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnSaveChangesButton() {
    try {
      const isClickable = await this.saveChangesButton.isVisible() && await this.saveChangesButton.isEnabled();
      if (isClickable) {
        console.log('The saveChangesButton is clickable.');
        await this.saveChangesButton.click({ timeout: 10000 });
      } else {
        console.log('The saveChangesButton is not clickable.');
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
 
  async clickOnAddCriteriaButtonForIncludeAudience() {
    try {
      const isClickable = await this.addCriteriaIncludeAudience.isVisible() && await this.addCriteriaIncludeAudience.isEnabled();
      if (isClickable) {
        console.log('The addCriteriaIncludeAudience is clickable.');
        await this.addCriteriaIncludeAudience.click({ timeout: 10000 });
      } else {
        console.log('The addCriteriaIncludeAudience is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnSelectCriteriaDropdownForIncludeAudience() {
    try {
      const isClickable = await this.selectCriteriaDropdown.isVisible() && await this.selectCriteriaDropdown.isEnabled();
      if (isClickable) {
        console.log('The selectCriteriaDropdown is clickable.');
        await this.selectCriteriaDropdown.click({ timeout: 10000 });
      } else {
        console.log('The selectCriteriaDropdown is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnAppointmentCriteriaForIncludeAudience() {
    try {
      const isClickable = await this.selectAppointment.isVisible() && await this.selectAppointment.isEnabled();
      if (isClickable) {
        console.log('The selectAppointment is clickable.');
        await this.selectAppointment.click({ timeout: 10000 });
      } else {
        console.log('The selectAppointment is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnAppointmentDateCriteriaForIncludeAudience() {
    try {
      const isClickable = await this.selectAppointmentDate.isVisible() && await this.selectAppointmentDate.isEnabled();
      if (isClickable) {
        console.log('The selectAppointmentDate is clickable.');
        await this.selectAppointmentDate.click({ timeout: 10000 });
      } else {
        console.log('The selectAppointmentDate is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnSelectConditionDropdown(): Promise<void> {
    try {
      const isClickable = await this.selectAppointmentConditionDropdown.isVisible();
      if (isClickable) {
        console.log('The selectAppointmentConditionDropdown is clickable.');
        await this.selectAppointmentConditionDropdown.click({ timeout: 10000 });
      } else {
        console.log('The selectAppointmentConditionDropdown is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async selectConditionValue(conditionValue: string) {
    try {
      await this.conditionAppointmentValue.waitFor({ state: "visible", timeout: 20000 });
      await this.conditionAppointmentValue.fill(conditionValue);
      await this.page.waitForTimeout(2000);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async fillValueForAppoitnmentDate(dateValue: string) {
    try {
      await this.dateValueTextbox.waitFor({ state: "visible", timeout: 5000 });
      await this.dateValueTextbox.fill(dateValue);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnTimeFrameDropdown(): Promise<void> {
    try {
      const isClickable = await this.selectTimeFrameDropdown.isVisible();
      if (isClickable) {
        console.log('The selectTimeFrameDropdown is clickable.');
        await this.selectTimeFrameDropdown.click({ timeout: 10000 });
      } else {
        console.log('The selectTimeFrameDropdown is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async selectTimeValue(timeValue: string) {
    try {
      await this.timeFrameConditionValue.waitFor({ state: "visible", timeout: 5000 });
      await this.timeFrameConditionValue.fill(timeValue);
      await this.page.waitForTimeout(2000);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnSelectLocationMarketCriteriaDropdown(): Promise<void> {
    try {
      const isClickable = await this.selectLocationMarketCriteriaDropdown.isVisible();
      if (isClickable) {
        console.log('The selectLocationMarketCriteriaDropdown is clickable.');
        await this.selectLocationMarketCriteriaDropdown.click({ timeout: 10000 });
      } else {
        console.log('The selectLocationMarketCriteriaDropdown is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async selectMarketLocationCriteriaValue(locationMarketCriteriaValue: string) {
    try {
      await this.locationMarketCriteriaValue.waitFor({ state: "visible", timeout: 5000 });
      await this.locationMarketCriteriaValue.fill(locationMarketCriteriaValue);
      await this.page.waitForTimeout(2000);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnSelectLocationMarketConditionDropdown(): Promise<void> {
    try {
      const isClickable = await this.selectLocationConditionDropdown.isVisible();
      if (isClickable) {
        console.log('The selectLocationConditionDropdown is clickable.');
        await this.selectLocationConditionDropdown.click({ timeout: 10000 });
      } else {
        console.log('The selectLocationConditionDropdown is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async selectMarketLocationConditionValue(locationMarketConditionValue: string) {
    try {
      await this.locationMarketConditionValue.waitFor({ state: "visible", timeout: 5000 });
      await this.locationMarketConditionValue.fill(locationMarketConditionValue);
      await this.page.waitForTimeout(2000);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnSaveChangesButtonOnBuildSegmentationCriteriaSidePanel(): Promise<void> {
    try {
      const isClickable = await this.saveChangesButtonOnSegmentationPanel.isVisible();
      if (isClickable) {
        console.log('The saveChangesButtonOnSegmentationPanel is clickable.');
        await this.saveChangesButtonOnSegmentationPanel.click({ timeout: 10000 });
      } else {
        console.log('The saveChangesButtonOnSegmentationPanel is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnCloseButtonOnBuildSegmentationCriteriaSidePanel(): Promise<void> {
    try {
      const isClickable = await this.closeButtonOnSegmentationPanel.isVisible();
      if (isClickable) {
        console.log('The closeButtonOnSegmentationPanel is clickable.');
        await this.closeButtonOnSegmentationPanel.click({ timeout: 10000 });
      } else {
        console.log('The closeButtonOnSegmentationPanel is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnAddCriteriaButtonForExcludeAudience() {
    try {
      const isClickable = await this.addCriteriaExcludeAudience.isVisible() && await this.addCriteriaExcludeAudience.isEnabled();
      if (isClickable) {
        console.log('The addCriteriaExcludeAudience is clickable.');
        await this.addCriteriaExcludeAudience.click({ timeout: 10000 });
      } else {
        console.log('The addCriteriaExcludeAudience is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnSelectCriteriaDropdownForExcludeAudience() {
    try {
      const isClickable = await this.selectCriteriaDropdown.isVisible() && await this.selectCriteriaDropdown.isEnabled();
      if (isClickable) {
        console.log('The selectCriteriaDropdown is clickable.');
        await this.selectCriteriaDropdown.click({ timeout: 10000 });
      } else {
        console.log('The selectCriteriaDropdown is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnPatientCriteriaForExcludeAudience() {
    try {
      const isClickable = await this.selectPatient.isVisible() && await this.selectPatient.isEnabled();
      if (isClickable) {
        console.log('The selectPatient is clickable.');
        await this.selectPatient.click({ timeout: 10000 });
      } else {
        console.log('The selectPatient is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async clickOnPatientStatusCriteriaForExcludeAudience() {
    try {
      const isClickable = await this.patientStatus.isVisible() && await this.patientStatus.isEnabled();
      if (isClickable) {
        console.log('The patientStatus is clickable.');
        await this.patientStatus.click({ timeout: 10000 });
      } else {
        console.log('The patientStatus is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnPatientStatusConditionDropdown() {
    try {
      const isClickable = await this.selectPatientStatusConditionDropdown.isVisible() && await this.selectPatientStatusConditionDropdown.isEnabled();
      if (isClickable) {
        console.log('The selectPatientStatusConditionDropdown is clickable.');
        await this.selectPatientStatusConditionDropdown.click({ timeout: 10000 });
      } else {
        console.log('The selectPatientStatusConditionDropdown is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async selectPatientStatusConditionValue(patientStatusConditionValue: string) {
    try {
      await this.patientStatusConditionValue.waitFor({ state: "visible", timeout: 5000 });
      await this.patientStatusConditionValue.fill(patientStatusConditionValue);
      await this.page.waitForTimeout(2000);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async clickOnPatientStatusValueDropdown() {
    try {
      const isClickable = await this.selectPatientStatusValueDropdown.isVisible() && await this.selectPatientStatusValueDropdown.isEnabled();
      if (isClickable) {
        console.log('The selectPatientStatusValueDropdown is clickable.');
        await this.selectPatientStatusValueDropdown.click({ timeout: 10000 });
      } else {
        console.log('The selectPatientStatusValueDropdown is not clickable.');
      }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
  async selectPatientStatusValue(patientStatusValue: string) {
    try {
      await this.patientStatusValue.waitFor({ state: "visible", timeout: 5000 });
      await this.patientStatusValue.fill(patientStatusValue);
      await this.page.waitForTimeout(2000);
 
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
}