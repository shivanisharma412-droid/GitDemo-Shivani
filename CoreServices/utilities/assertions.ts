import { Page, expect, Locator } from "@playwright/test";
import { error } from "console";

export class VerifyMethod {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyAttribute(locator: Locator, attributeName: string, containsValue: string, consolePassMsg: string, consoleErrorMsg: string) {

        try {
            const value = await locator.getAttribute(attributeName);
            await expect(value).toContain(containsValue);
            console.log(consolePassMsg)
        } catch (error) {
            console.log(`${consoleErrorMsg} ${error}`);
            throw new Error();
        }

    }

    async verifyTextContent(actual: string | null, containsValue: string, consolePassMsg: string, consoleErrorMsg: string) {

        try {
            await expect(actual).toContain(containsValue);
            console.log(consolePassMsg);
        } catch (error) {
            console.log(`${consoleErrorMsg} ${error}`);
            throw error;
        }
    }

    async verifyTableData(number: number, noResults: Locator, expectedValue: string | null, successMsg: string, failureMsg1: string, failureMsg2: string) {
        try {
            const status = await noResults.isVisible();
            let textFound = "Not Found";
            if (!status) {
                const tableRows = this.page.locator('table tbody tr');
                const tableSize = await tableRows.count();
                let cellText: string | null;
                let tableData: Locator;
                try {
                    for (let i = 0; i < tableSize; i++) {
                        tableData = tableRows.nth(i).locator('td').nth(number);
                        cellText = await tableData.textContent();
                        if (cellText == expectedValue) {
                            textFound = "Found";
                            await this.verifyTextContent(textFound, "Found",
                                successMsg, failureMsg2);
                            break;
                        }
                    }
                } catch (error) {
                    console.error("Location Type is different at row :", error.message);
                    throw new Error;
                }
            } else {
                if(textFound == "Not Found"){
                console.log(failureMsg1);
                throw new Error(failureMsg1);
                }
            }
        } catch (error) {
            console.log(failureMsg1);
            throw new Error(failureMsg1);
        }
    }

    async verifySearch(columnNumber: number, tableElement: Locator, noResultLocator: Locator, expected: string, successMsg: string, failureMsg: string) {

        try {
            await this.page.waitForSelector('table tbody', { state: 'attached' , timeout: 30000});
            const status = await noResultLocator.isVisible();
            if (!status) {
                // Get all rows in the table
                const rows = await this.page.locator('table tbody tr');
                const rowCount = await rows.count();

                // Initialize a variable to store all rows' text
                let allColumnsText = '';

                // Iterate through each row and collect the text content
                for (let i = 0; i < rowCount; i++) {
                    const columnText = await rows.nth(i).locator('td').nth(columnNumber).innerText();
                    allColumnsText += columnText + ' '; // Concatenate each row's text
                }

                // Verify if the collected text contains the expected string
                expect(allColumnsText).toContain(expected);
                console.log(successMsg);
            }
        } catch (error) {
            console.error(failureMsg);
            throw new Error(failureMsg);
        }
    }
}