import { LoginPage } from "./LoginPage";
import { CreateCampaignPage } from "./CampaignLibraryPage";
import { CreateBrandingConfigPage } from "./BrandingConfigurationPage";
import { SegmentationPage } from "./SegmentationLibraryPage";
import { FilterPage } from "./FilterPage";
import { SearchCampaignPage } from "./SearchCampaignPage";
import { DeleteCampaignPage } from "./DeleteCampaignPage";
import { Page, Locator } from "playwright";

export class POManager {
  private page: Page;
  private loginPage: LoginPage;
  private createCampaignPage: CreateCampaignPage;
  private filterPage: FilterPage;
  private searchCampaignPage: SearchCampaignPage;
  private deleteCampaignPage: DeleteCampaignPage;
  private createBrandingConfigPage: CreateBrandingConfigPage;
  private segmentationPage: SegmentationPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.createCampaignPage = new CreateCampaignPage(this.page);
    this.filterPage = new FilterPage(this.page);
    this.searchCampaignPage = new SearchCampaignPage(this.page);
    this.deleteCampaignPage = new DeleteCampaignPage(this.page);
    this.createBrandingConfigPage = new CreateBrandingConfigPage(this.page);
    this.segmentationPage = new SegmentationPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }
  getCreateCampaignPage() {
    return this.createCampaignPage;
  }
  getFilterPage() {
    return this.filterPage;
  }
  getSearchCampaignPage() {
    return this.searchCampaignPage;
  }
  getDeleteCampaignPage() {
    return this.deleteCampaignPage;
  }
  getCreateBrandingConfigPage() {
    return this.createBrandingConfigPage;
  }
  getSegmentationPage() {
    return this.segmentationPage;
  }
}
