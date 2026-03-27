import { fail } from "assert";
import { Page, Locator } from 'playwright';
 
export class DeleteCampaignPage {

  private ellipsis : Locator;
  private deleteText : Locator;
  private deleteModalText : Locator;
  private checkboxOnDeleteModal : Locator;
  private deleteButton : Locator;
 
  constructor(page: Page) {

    this.ellipsis = page.locator("//tr[contains(@class, 'styles__StyledRow')]/td[9]/div");
    this.deleteText = page.locator("//li/div[text()= 'Delete']");
    this.deleteModalText = page.locator("//*[contains(@class, 'styles__ModalSubheader')]");
    this.checkboxOnDeleteModal = page.locator("//*[contains(@class, 'styles__CheckboxCustom')]");
    this.deleteButton = page.locator("//*[contains(@class, 'styles__ModalFooterPrimaryButton')]");
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
 
  async getDeleteOptionText() {
    try {
      // Wait for the element to be visible
      await this.deleteText.waitFor({ state: "visible", timeout: 5000 });
      // Get the text content of the element
      return await this.deleteText.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnDeleteText() {
    try {
      const isClickable = await this.deleteText.isVisible() && await this.deleteText.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.deleteText.click({ timeout: 10000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async getDeleteTextOnModal() {
    try {
      // Wait for the element to be visible
      await this.deleteModalText.waitFor({ state: "visible", timeout: 5000 });
      // Get the text content of the element
      return await this.deleteModalText.textContent();
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnCheckbox() {
    try {
      const isClickable = await this.checkboxOnDeleteModal.isVisible() && await this.checkboxOnDeleteModal.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.checkboxOnDeleteModal.click({ timeout: 10000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
 
  async clickOnDeleteButton() {
    try {
      const isClickable = await this.deleteButton.isVisible() && await this.deleteButton.isEnabled();
      if (isClickable) {
    console.log('The button is clickable.');
    await this.deleteButton.click({ timeout: 10000 });
    } else {
    console.log('The button is not clickable.');
    }
    } catch (e) {
      fail("Failed due to exception: " + e);
    }
  }
}
 