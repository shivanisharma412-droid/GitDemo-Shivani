import { Page, Locator, expect } from "@playwright/test";
import * as dataHealthTestData from "../test-data/dataHealthTestData.json";
import { VerifyMethod } from "../utilities/assertions";

export class DataHealthPage {

    readonly page: Page;
    private readonly verify: VerifyMethod;
    private readonly dataHealthTab: Locator;
    private readonly dataHealthPageHeading: Locator;
    private readonly profileCompletenessTab: Locator;
    private readonly profileCompltenessPageHeading: Locator;
    private readonly auditHistoryTab: Locator;
    private readonly auditHistoryPageHeading: Locator;

    constructor(page: Page) {

        this.verify = new VerifyMethod(page);
        this.dataHealthTab = page.getByRole('link', { name: 'Data Health' });
        this.dataHealthPageHeading = page.getByRole('heading');
        this.profileCompletenessTab = page.getByRole('link', { name: 'Profile Completeness' });
        this.profileCompltenessPageHeading = page.getByRole('main');
        this.auditHistoryTab = page.getByRole('link', { name: 'Audit History' });
        this.auditHistoryPageHeading = page.getByRole('heading');
    }

    /**
     * Function to verify Data Health tab and it's sub-tabs.
     * @ param tab1: Data Health page first tab which is Data Health
     * @ param tab2: Data Health page second tab which is Profile Completeness
     * @ param tab3: Data Health page third tab which is Audit History
     */
    async dataHealthSubTabsVerification(tab1: string, tab2: string, tab3: string) {

        // Verifying sub tabs based on page heading.
        // Verifying Data Health tab heading
        await this.dataHealthTab.click();
        let heading1 = await this.dataHealthPageHeading.textContent() ?? '';
        await this.verify.verifyTextContent(heading1, tab1, "Verified Data Health Tab Successfully",
            "Tab Verification Failed");

        // Verifying Profile Completeness tab page heading.
        await this.profileCompletenessTab.click();
        let heading2 = await this.profileCompltenessPageHeading.textContent() ?? '';
        await this.verify.verifyTextContent(heading2, tab2, "Verified Profile Completeness Tab Successfully",
            "Tab Verification Failed");

        // Verifying Audit History tab page heading.
        await this.auditHistoryTab.click();
        let heading3 = await this.auditHistoryPageHeading.textContent() ?? '';
        await this.verify.verifyTextContent(heading3, tab3, "Verified Audit History Tab Successfully",
            "Tab Verification Failed");
    }

}