import { Locator, Page } from "playwright";
import { expect } from "playwright/test";
import { CommonUtility } from "../Utilities/CommonUtility";
import * as testdata from "../test-data/testdata.json";




export class HealthSystemChat{
    private page: Page;
    private chatLuncher: Locator;
    private messageInput: Locator;
    private commonUtility:CommonUtility;
    private callCard:Locator;
    private readonly faxCard :Locator;
    private readonly bookAppCard:Locator;


    constructor(page:Page){
        this.page = page;
        this.chatLuncher = page.locator("#chat-bubble-svg");
        this.messageInput = page.getByPlaceholder('Try "find a doctor"');
        this.commonUtility = new CommonUtility(this.page);
        this.callCard =this.page.getByRole('button', { name: 'Call'}).first();
        this.faxCard = this.page.getByRole('button', { name: 'Fax'}).first();
        this.bookAppCard = this.page.getByLabel('Book appointment with').first();
    }
    async verifyingCardsDisplayinChatWindow(): Promise<void> {
        console.log('Verifying Cards Display in Chat Window');
        await this.page.waitForTimeout(20000);
        await this.chatLuncher.waitFor({ state: "visible", timeout: 30000 });
        await expect(this.chatLuncher).toBeVisible({ timeout: 30000 });
        await this.chatLuncher.click();
        await this.page.waitForTimeout(2000);
        expect(await this.page.getByRole('button', { name: 'Find a Doctor'}).isVisible({timeout:3000}));
        expect(await this.page.getByRole('button', { name: 'Find a Doctor'}).click());
        await this.page.waitForTimeout(5000);
        await expect(this.page.locator('span').filter({ hasText: 'What kind of speciality' }).first()).toBeVisible({ timeout: 10000 });
        await this.commonUtility.enterValueInTextBox(this.messageInput,testdata.HealthSystemChat.speciality)
        await expect(this.page.getByText('Whats your zip?')).toBeVisible({ timeout: 5000 });
        await this.commonUtility.enterValueInTextBox(this.messageInput,testdata.HealthSystemChat.zip);
        await this.page.waitForTimeout(5000);
        await expect(this.callCard).toBeVisible({timeout:3000});
        await this.callCard.click();
        await this.page.waitForTimeout(1000);
        await expect(this.faxCard).toBeVisible({timeout:3000});
        await this.faxCard.click();
        await this.page.waitForTimeout(1000);
        await expect(this.bookAppCard).toBeVisible({timeout:3000});
        await this.bookAppCard.click();
        await this.page.waitForTimeout(2000);
    }
}