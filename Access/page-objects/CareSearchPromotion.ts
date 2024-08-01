import { Locator, Page } from "playwright";
import { expect } from "playwright/test";



export class CareSearchPromotion{
    
    private page:Page;
    
    private searchBoxInput :Locator

    private searchResultPromo:Locator
        
    private firstProviderContainer :Locator
    
    private secondProviderContainer : Locator

    private firstProviderNameText : Locator
    
    private secondProviderNameText: Locator

    private clinicalTermsLink: Locator

    private firstCnilicalTermsContainer: Locator

    private secondCnilicalTermsContainer: Locator

    private firstTermNameText : Locator
    
    private secondTermNameText: Locator

    constructor(page:Page){
        this.page =page;

        this.searchBoxInput = page.getByPlaceholder('Search for a clinical term');

        this.searchResultPromo =page.getByRole('link', { name: 'Search Results Promotions' });
        //Specialties
        this.firstProviderContainer = this.page.locator("(//ul[@class='data']/li//div[contains(@class,'provider-container')])[2]");
        
        this.secondProviderContainer = this.page.locator("(//ul[@class='data']/li//div[contains(@class,'provider-container')])[3]");
    
        this.firstProviderNameText = this.page.locator("(//ul[@class='data']/li//div[contains(@class,'provider-container')])[2]//div/span[contains(@class,'ProviderNameText')]");

        this.secondProviderNameText = this.page.locator("(//ul[@class='data']/li//div[contains(@class,'provider-container')])[3]//div/span[contains(@class,'ProviderNameText')]");
        
        // Clinical Terms
        this.clinicalTermsLink = this.page.locator("//a[contains(text(),'Clinical Terms')]");

        this.firstCnilicalTermsContainer = this.page.locator("(//ul[@class='data']//li//div[contains(@class,'term-container')])[1]");
        
        this.secondCnilicalTermsContainer =  this.page.locator("(//ul[@class='data']//li//div[contains(@class,'term-container')])[2]");
        
        this.firstTermNameText = this.page.locator("(//ul[@class='data']//li//div[contains(@class,'term-container')])[1]//div//span[contains(@class,'TermNameText')]");

        this.secondTermNameText = this.page.locator("(//ul[@class='data']//li//div[contains(@class,'term-container')])[2]//div//span[contains(@class,'TermNameText')]")
        

    }
    // searching Specialties then navigating to Specialties details page and verifying provider list then changing the order of provider
    async verifyReorderSpecialtiesPromotedProvider(searchString:string){
        await this.searchResultPromo.click({timeout:3000});
        
        await this.searchBoxInput.fill(searchString);

        await this.page.waitForTimeout(2000);

        console.log("//a[contains(text(),'"+searchString+"')]");

        await this.page.locator("//span[contains(text(),'"+searchString+"')]").click();

        const noOfRows =this.page.$$("//ul[@class='data']/li//div[contains(@class,'provider-container')]")

        if((await noOfRows).length>=3){

            const firstProviderName = await this.firstProviderNameText.textContent();

            const secondProviderName = await this.secondProviderNameText.textContent();
            
            const oneBoundingBox = await this.firstProviderContainer?.boundingBox()
        
            const twoBoundingBox = await this.secondProviderContainer?.boundingBox()
        
            if (oneBoundingBox && twoBoundingBox) {
            await this.page.mouse.move(

                oneBoundingBox.x + oneBoundingBox.width / 2,

                oneBoundingBox.y + oneBoundingBox.height / 2,
                
                { steps: 5 }
            );
            await this.page.mouse.down();

            await this.page.mouse.move(

                twoBoundingBox.x + twoBoundingBox.width / 2,
            
                twoBoundingBox.y + twoBoundingBox.height / 2,
            
                { steps: 5 }
            )
            
            await this.page.mouse.up()
        }
        await this.page.waitForTimeout(5000);
        const firstProviderNameAfterSwap = await this.firstProviderNameText.textContent();

        const secondProviderNameAfterSwap = await this.secondProviderNameText.textContent();
               
        expect(firstProviderName).toEqual(secondProviderNameAfterSwap);
        expect(secondProviderName).toEqual(firstProviderNameAfterSwap);
    }
    else{
        console.log('Provider list not available')
        await expect(this.firstProviderNameText).toBeVisible({timeout:5000});
        await this.page.screenshot({ path: Date.now()+'.png', fullPage: true });
    }
}
 // Searching ClinicalTerms then navigating to ClinicalTerms details page and verifying provider list then changing the order of provider
async verifyReoderClinicalTermsPromoteSpecialties(searchString:string){
    await this.searchResultPromo.click({timeout:3000});

    await this.clinicalTermsLink.click({timeout:3000});
    
    await this.searchBoxInput.fill(searchString);
    
    expect(this.page.locator("//span[contains(text(),'"+searchString+"')]")).toBeVisible({timeout:5000});

    await this.page.locator("//span[contains(text(),'"+searchString+"')]").click();

    await this.page.waitForTimeout(5000);
    
    const noOfTermContainerRows =this.page.$$("//ul[@class='data']//li//div[contains(@class,'term-container')]")
    const noOfRows = (await noOfTermContainerRows).length;
    expect(noOfRows).toBeGreaterThanOrEqual(3)
        console.log((await noOfTermContainerRows).length);
        const firstClinicalTermName = await this.firstTermNameText.textContent();
        
        const secondClinicalTermName = await this.secondTermNameText.textContent();
        
        const oneBoundingBox = await this.firstCnilicalTermsContainer?.boundingBox()
        
        const twoBoundingBox = await this.secondCnilicalTermsContainer?.boundingBox()
        if (oneBoundingBox && twoBoundingBox) {
        await this.page.mouse.move(

                oneBoundingBox.x + oneBoundingBox.width / 2,

                oneBoundingBox.y + oneBoundingBox.height / 2,
                
                { steps: 2 }
            );
            await this.page.mouse.down();

            await this.page.mouse.move(

                twoBoundingBox.x + twoBoundingBox.width / 2,
            
                twoBoundingBox.y + twoBoundingBox.height / 2,
            
                { steps: 2 }
            )
            
            await this.page.mouse.up()
        }
        await this.page.waitForTimeout(5000);
        const firstClinicalTermNamefterSwap = await this.firstTermNameText.textContent();

        const secondClinicalTermNameAfterSwap = await this.secondTermNameText.textContent();
               
        expect(firstClinicalTermName).toEqual(secondClinicalTermNameAfterSwap);

        expect(secondClinicalTermName).toEqual(firstClinicalTermNamefterSwap);
}
}