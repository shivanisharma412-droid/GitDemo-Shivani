import { Locator, Page } from "playwright"

export class CommonUtility{
    private page:Page
    constructor(page:Page){
    this.page =page;
    }
    async enterValueInTextBox(inputLocator:Locator,value:string){
        await inputLocator.fill(value)
        await inputLocator.press("Enter")
    }
}