import { fail } from "assert";
import { Locator, Page, expect } from "@playwright/test";
import { escape } from "querystring";
import { Agent } from "http";

export class AddUser {
    private page: Page;
    private adduserButton: Locator
    private userEmailInput: Locator
    private queuesSelecInput : Locator
    private cancelButton : Locator
    private agentCheckBox : Locator
    private queuesOptionOne: Locator
    private queuesOptionTwo: Locator
    

    constructor(page:Page) {
        this.adduserButton =page.locator('//button[normalize-space()="Add User"]');
        this.userEmailInput = page.locator('//input[@name="userName"]');
        this.queuesSelecInput = page.locator('#react-select-2-input');
        this.cancelButton = page.locator('//button[normalize-space()="Cancel"]');
        this.agentCheckBox = page.getByLabel('Agent');
        //this.queuesOptionOne = page.getByRole('option', { name: 'A new queue with no queue' });
        this.queuesOptionOne = page.getByRole('option', { name: 'Creating new queue', exact: true });
       // this.queuesOptionTwo = page.getByRole('option', { name: 'Adding queue test.' })

    }
    async addUserDetails(userEmail:string,queuesName:string){
        await expect(this.adduserButton).toBeVisible({timeout:30000});
        await this.adduserButton.click({timeout:15000});
        await this.userEmailInput.fill(userEmail);
        await this.agentCheckBox.check({timeout:5000});
        await this.queuesSelecInput.click();
        await this.queuesOptionOne.click();
        //await this.queuesOptionTwo.click();
    }
}