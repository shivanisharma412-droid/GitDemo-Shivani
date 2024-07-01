
import { Page } from '@playwright/test';

import { DashBoard } from './dashBoard';
import { AddUser } from './AddUserPage';
import { AddQueues } from './AddQueues';
import { ChatTrends } from './chatTrends';
import { DragAndDrop } from './DragAndDrop';
import { LoginPage } from './LoginPage';


export class POManager {
  private page: Page;
  private loginPage:LoginPage;
  private dashBoard : DashBoard;
  private addUser : AddUser;
  private addQueues : AddQueues;
  private chatTrends : ChatTrends;
  private dragAndDrop : DragAndDrop;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashBoard = new DashBoard(this.page);
    this.addUser = new AddUser(this.page);
    this.addQueues = new AddQueues(this.page);
    this.chatTrends = new ChatTrends(this.page);
    this.dragAndDrop = new DragAndDrop(this.page);
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
  getAddQueuesPage():AddQueues{
    return this.addQueues;
  }
  getChatTrendsPage():ChatTrends{
    return this.chatTrends;
  }
  getDragAndDropPage():DragAndDrop{
    return this.dragAndDrop;
  }


}