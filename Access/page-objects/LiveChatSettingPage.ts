import { Page } from "@playwright/test";
import { AddUser } from "./AddUserPage";

export class LiveChatSetting{
    private page:Page
    private addUser:AddUser;
    constructor(page:Page){
        this.page =page; 
        this.addUser = new AddUser(this.page); 
    }

    // Validating add user with email and queues name  in liveChat Setting
    async verifyLiveChatAdduser(email:string,queuesName:string){
        console.log(" verify live chat add user ");
        await this.addUser.addUserDetails(email,queuesName);
    }
}