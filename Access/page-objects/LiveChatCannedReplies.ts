import { Locator, Page, expect } from "@playwright/test";
import test from "node:test";
import { escape } from "querystring";

export class LiveChatCannedReplies{

    private page:Page

    private navLinkCannedReplies:Locator
    
    private createNewCannedReplayButton:Locator

    private addCategoryInput:Locator

    private addQueuesButton:Locator

    private replyTextContext:Locator

    private saveChangesButton:Locator

    private searchInput:Locator

    private editButton:Locator

    private deleteButton:Locator

    private confirmDeleteButton:Locator

    constructor(page:Page){

        this.page=page;
    
        this.navLinkCannedReplies = page.getByTestId('sub-nav-link-CannedReplies');

        this.createNewCannedReplayButton = page.getByTestId('create-new-canned-reply');

        this.addCategoryInput = page.getByTestId('add-canned-reply-category');

        this.addQueuesButton = page.locator('button').filter({ hasText: 'Add to a queue +' });

        this.replyTextContext = page.getByTestId('reply-text-context');
        
        this.saveChangesButton = page.getByTestId('save-canned-reply');
        
        this.searchInput =  page.getByPlaceholder('Search...');

        this.editButton =page.locator('//button[@data-testid="edit-canned-reply"]')

        this.deleteButton = page.getByTestId('delete-canned-reply');
        
        this.confirmDeleteButton =  page.getByTestId('confirm-delete-canned-reply')



    }
    // Navigate to Canned Replies
    async navigateToCannedReplies(){

        console.log('Navigate to Canned Replies');

        expect(this.navLinkCannedReplies).toBeVisible({timeout:30000});

        this.navLinkCannedReplies.click({timeout:3000});

        await this.page.waitForTimeout(10000);

    }
    // validating create Canned response with category name,queues name and replayText
    async createCannedResponse(categoryName:string,queuesName:string, replayText:string){

        await this.navigateToCannedReplies();

        expect(this.createNewCannedReplayButton).toBeVisible({timeout:30000});

        this.createNewCannedReplayButton.click();
        
        await this.addCategory(categoryName,false);

        await this.selectAndQueues(queuesName);

        await this.replyTextContext.fill(replayText);

        await this.saveChangesButton.click({timeout:3000});

        await expect(this.page.getByText('Success', { exact: true })).toBeVisible({timeout:5000});

        await this.page.screenshot({path:'./Screenshots/'+Date.now().toString()+".png",fullPage:true});
    }
    // validating search for created canned response
    async  filterCannedResponse(addedReplayText:string) {
        console.log('Filter Canned Response')
        
        await this.navigateToCannedReplies();

        await this.searchInput.click();
        
        await this.searchInput.fill(addedReplayText);
        
        expect(this.editButton).toBeVisible({timeout:20000});

    }
    // Validating edit for added canned Response
    async editCannedResponse(categoryName:string, replayText:string){
        
        console.log("Edit canned Response");
        
        expect(this.editButton).toBeVisible({timeout:5000});

        this.editButton.click();

        await this.page.waitForTimeout(1000);

        await this.addCategory(categoryName,true);

        await this.replyTextContext.fill(replayText);

        await this.saveChangesButton.click({timeout:3000});

        expect(this.page.getByText('Success', { exact: true })).toBeVisible({timeout:5000});

        this.page.screenshot({path:'./Screenshots/'+Date.now().toString()+".png",fullPage:true});
        
    }
    // Validating delete by searching created canned response and delete
    async filterAndDeleteCannedResponse(CannedResponse:string){
        console.log("Filter and delete canned Response");

        await this.filterCannedResponse(CannedResponse);

        await this.editButton.click({timeout:2000});

        await this.deleteButton.click({timeout:2000});
        
        this.page.waitForTimeout(2000);

        expect(this.confirmDeleteButton).toBeVisible({timeout:3000});

        await this.confirmDeleteButton.click();

        expect(this.page.getByText('Success', { exact: true })).toBeVisible({timeout:5000})

        this.page.screenshot({path:'./Screenshots/'+Date.now().toString()+".png",fullPage:true})

    }

    // Using this function adding category of canned response
    async addCategory(categoryNameExp:string,editCategory:boolean){
        
        console.log("enter and select category:  "+categoryNameExp +" Editable :  "+editCategory );
        if(editCategory===true){

            expect(this.addCategoryInput).toBeEditable({editable:true,timeout:3000});

            await this.addCategoryInput.click({timeout:3000});
            
            await this.addCategoryInput.selectText();

            await this.page.keyboard.press("Backspace");
    
            await this.addCategoryInput.fill(categoryNameExp);
        }
        else{
            await this.addCategoryInput.click({timeout:3000});

            await this.addCategoryInput.fill(categoryNameExp);
        }
        await this.page.waitForTimeout(1000);

        const categoryList = await this.page.$$("//div[contains(@class,'TypeaheadInput__Dropdown')]/div");

        console.log("Category list "+ categoryList.length);
        
        for(let option of categoryList){

            const categoryName = await option.textContent();

            console.log(categoryName);

            if(categoryName===categoryNameExp){
                
                console.log(categoryName+ "is equal to :"+categoryNameExp);

                await option.click();
                
                break;
            }
        }
    }
    async selectAndQueues(queuesNameExpected:string){

        console.log("Select and Queues");
        
        await this.addQueuesButton.click();

        await this.page.waitForTimeout(1500);

        const queuesList = await this.page.$$("//div[contains(@class,'DropdownContainer')]/ul/li/button");

        console.log('Queues list'+queuesList.length);
        for(let option of queuesList){
            const queuesName = await option.textContent();

            console.log(queuesName);
                
                if(queuesName === queuesNameExpected)
                {
                   console.log(queuesName+ "is equal to :"+queuesNameExpected)
                   
                   await option.click();
                   
                   break;
                }
        }
    }
}