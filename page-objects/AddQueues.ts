import { fail } from "assert";
import { Locator, Page, expect } from "@playwright/test";
export class AddQueues {
    private page: Page;
    readonly queuesLink:Locator;
    readonly addQueue:Locator;
    readonly nameQueuesInput : Locator;
    readonly conversationTimeoutPlus :Locator
    readonly agentsPlusButton : Locator
    readonly maxConverstationPlus : Locator
    readonly msgQueuesInput : Locator
    readonly liveHealthRadioButton : Locator
    readonly saveQueuesButton : Locator
    readonly listOfQueues : Locator
    readonly timeZoneDropdownArrow : Locator
    readonly timeZoneValueLocator : Locator
    private  fromTimeSetArrow : Locator
    private fromTimeSelect : Locator

    constructor(page:Page) {
        this.page =page;
        this.queuesLink = page.locator("//ul[@role='tabpanel']/li/a[normalize-space()='Queues']");
        this.addQueue = page.locator("//button[normalize-space()='+ Add Queue']");
        this.nameQueuesInput = page.locator("//input[@name='description']");
        this.conversationTimeoutPlus = page.locator("//div[@data-testid='queue-main-details-conversation-timeout-plus']//*[name()='svg']");
        this.agentsPlusButton = page.locator("//div[@data-testid='queue-main-details-minimum-agents-plus']//*[name()='svg']");
        this.maxConverstationPlus = page.locator("//div[@data-testid='queue-main-details-maximum-conversations-plus']//*[name()='svg']");
        this.msgQueuesInput = page.locator("//textArea[@name='noAgentsAvailableMessage']");
        this.liveHealthRadioButton = page.locator("#dispositionEnabled");
        this.saveQueuesButton = page.locator('button[name="save"]');
        this.listOfQueues = page.locator('//div[@class="QueueList__ListWrapper-sc-tssrll-2 iEuVEM"]/div');
        this.timeZoneDropdownArrow = page.locator('//div[contains(@class,"timezone-field__FieldWrapper")]//div[contains(@class,"Select__dropdown")]');
        this.timeZoneValueLocator = page.locator('//div[(contains(@id,"listbox")) and @role="listbox"]//div[@role="option" and (contains(text(),"Eastern"))]');
        this.fromTimeSetArrow = page.locator('//span[contains(@class,"styles__DayNameWrapper") and contains(text(),"monday")]//..//div[contains(@class,"styles__QueueDayTimeSelectWrapper")][1]//div[contains(@class,"Select__indicators ")]');
        this.fromTimeSelect =page.locator('//div[contains(@class,"Select__menu-list")]//div[@role="option" and (contains(text(),"9:00 AM"))]');
    }
 async navigateToQueues(){
    
    await this.queuesLink.waitFor({state:"visible",timeout:10000});
    
    await this.queuesLink.click({timeout:5000});
    
    await this.addQueue.waitFor({ state: "visible", timeout: 50000 });
 }
 async addQueues(queuesName:string,messageQueues:string,timeZoneValue:string){
    
    await this.addQueue.click({timeout:5000});
    
    await this.queuesLink.waitFor({state:"visible",timeout:10000});
    
    await this.enterAndSaveQueues(queuesName,messageQueues,timeZoneValue);
 }
async enterAndSaveQueues(name:string,queuesmessage:string,timeZoneText:string){
    await this.nameQueuesInput.fill(name);

    await this.conversationTimeoutPlus.click({timeout:5000});
    
    await this.agentsPlusButton.click({timeout:5000});
    
    await this.maxConverstationPlus.click({timeout:5000});
    
    await this.msgQueuesInput.fill(queuesmessage);
    
    await this.liveHealthRadioButton.click({timeout:5000});
    
    await this.selectTimeZone(timeZoneText);
    
    await expect(this.fromTimeSetArrow).toBeVisible({ timeout: 4000 });
    await this.fromTimeSetArrow.click();
         
    await expect(this.fromTimeSelect).toBeVisible({ timeout: 2000 });
    await this.fromTimeSelect.click();
         
    await expect(this.page.locator("//span[contains(@class,'styles__DayNameWrapper') and contains(text(),'monday')]//..//div[contains(@class,'styles__QueueDayTimeSelectWrapper')][2]//div[contains(@class,'Select__indicators ')]")).toBeVisible({ timeout: 4000 });
    await this.page.locator("//span[contains(@class,'styles__DayNameWrapper') and contains(text(),'monday')]//..//div[contains(@class,'styles__QueueDayTimeSelectWrapper')][2]//div[contains(@class,'Select__indicators ')]").click();
         
    await expect(this.page.locator("//div[contains(@class,'Select__menu-list')]//div[@role='option' and (contains(text(),'9:45 AM'))]")).toBeVisible({ timeout: 2000 });
    await this.page.locator("//div[contains(@class,'Select__menu-list')]//div[@role='option' and (contains(text(),'9:45 AM'))]").click();
    
    await this.saveQueuesButton.click({timeout:5000});
    }
    async selectTimeZone(timeZone){
        await this.timeZoneDropdownArrow.click({timeout:10000});
        await this.timeZoneValueLocator.waitFor({state:"visible",timeout:300000});
        this.page.locator("//div[(contains(@id,'listbox')) and @role='listbox']//div[@role='option' and (contains(text(),'"+timeZone+"'))]").click({timeout:10000});
    }

    async verifyAddedQueuesList(expectedValue:string){
        const options = await this.page.$$("//div[@class='QueueList__ListWrapper-sc-tssrll-2 iEuVEM']/div");
        
        for(let option of options)
            {
                const queuesName = await option.textContent();
                
                if(queuesName===expectedValue)
                {
                    console.log(queuesName+ "is equal to :"+expectedValue)
                    expect(queuesName).toBe(expectedValue);
                   // await option.click();
                    break;
                }
            }
    }
}
