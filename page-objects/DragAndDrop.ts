import { Locator, Page } from "playwright";



export class DragAndDrop{
    
    private page:Page;
    
    private searchResultPromo:Locator
    
    private searchResultOption:Locator
    
    private elementOne :Locator
    
    private elementTwo : Locator

    constructor(page:Page){
        this.page =page;
        
        this.searchResultPromo =page.getByRole('link', { name: 'Search Results Promotions' });

        this.searchResultOption =page.getByRole('link', { name: 'Acute Care' });
        
        this.elementOne = page.getByRole('button', { name: '2 provider pic David Sartoris' });
        
        this.elementTwo  = page.getByRole('button', { name: '3 provider pic Wendi' });
    }
    async dragAndDropPromotedProvider(){
        await this.searchResultPromo.click({timeout:3000});

        await this.searchResultOption.click({timeout:3000});
        
        const oneBoundingBox = await this.elementOne?.boundingBox()
        
        const twoBoundingBox = await this.elementTwo?.boundingBox()
        
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
    }
}