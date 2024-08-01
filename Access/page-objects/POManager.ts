
import { Page } from '@playwright/test';

import { DashBoard } from './dashBoard';
import { AddUser } from './AddUserPage';
import { LiveChatAddQueues } from './LiveChatAddQueues';
import { ChatTrends } from './chatTrends';
import { LoginPage } from './LoginPage';
import { AnalyticsTrends } from './AnalyticsTrends';
import { CareSearchSetting } from './CareSearchSetting';
import { CareSearchPromotion } from './CareSearchPromotion';
import { ChatSettingPage } from './ChatSettingPage';
import { LiveChatSetting } from './LiveChatSettingPage';
import { ChatAnalyticsOverall } from './ChatAnalyticsOverall';
import { LiveChatCannedReplies } from './LiveChatCannedReplies';
import { HelathCareSearch } from './HealthCareSearch';

export class POManager {
  private page: Page;
  private loginPage:LoginPage;
  private dashBoard : DashBoard;
  private addUser : AddUser;
  private liveChataddQueues : LiveChatAddQueues;
  private chatTrends : ChatTrends;
  private careSearchPromotion : CareSearchPromotion;
  private analyticsTrends:AnalyticsTrends;
  private careSerchSetting:CareSearchSetting;
  private chatSettingPage :ChatSettingPage;
  private liveChatSettingPage : LiveChatSetting;
  private chatAnalyticsOverallPage: ChatAnalyticsOverall;
  private liveChatCannedRepliesPage:LiveChatCannedReplies;
  private healthCareSearchPage:HelathCareSearch;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashBoard = new DashBoard(this.page);
    this.addUser = new AddUser(this.page);
    this.liveChataddQueues = new LiveChatAddQueues(this.page);
    this.chatTrends = new ChatTrends(this.page);
    this.careSearchPromotion = new CareSearchPromotion(this.page);
    this.analyticsTrends = new AnalyticsTrends(this.page);
    this.careSerchSetting = new CareSearchSetting(this.page);
    this.chatSettingPage = new ChatSettingPage(this.page);
    this.liveChatSettingPage = new LiveChatSetting(this.page);
    this.chatAnalyticsOverallPage = new ChatAnalyticsOverall(this.page);
    this.liveChatCannedRepliesPage = new LiveChatCannedReplies(this.page);
    this.healthCareSearchPage =  new HelathCareSearch(this.page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }
  getDashBoardPage():DashBoard{
    return this.dashBoard;
  }
  getAddUserPage():AddUser{
    return this.addUser;
  }
  getLiveChatAddQueuesPage():LiveChatAddQueues{
    return this.liveChataddQueues;
  }
 
  getCareSearchPromotionPage():CareSearchPromotion{
    return this.careSearchPromotion;
  }
  getAnalyticsTrendsPage():AnalyticsTrends{
    return this.analyticsTrends;
  }
  
  getCareSearchSettingPage():CareSearchSetting{
    return this.careSerchSetting;
  }
  getChatTrendsPage():ChatTrends{
    return this.chatTrends;
  }
  getchatSettingPage():ChatSettingPage{
    return this.chatSettingPage;
  }

  getLiveChatSettingPage():LiveChatSetting{
    return this.liveChatSettingPage;
  }
  getChatAnalyticsOverallPage():ChatAnalyticsOverall{
    return this.chatAnalyticsOverallPage;
  }
  getLiveChatCannedRepliesPage():LiveChatCannedReplies{
    return this.liveChatCannedRepliesPage;
  }
  getHealthCareSearchPage():HelathCareSearch{
    return this.healthCareSearchPage;
  }

}