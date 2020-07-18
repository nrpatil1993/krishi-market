import { observable, action } from 'mobx';
import { ICrop } from '../api/interfaces/APIData';

export class UserInfo {
    public static userInfo: UserInfo;

    public static initUserInfo() {
        UserInfo.userInfo = new UserInfo();
    }

    @observable public isLoggedIn: boolean;
    @observable public userExistingContact: string;
    @observable public userNewContact: string;
    @observable public userName: string;
    @observable public myFoodItems:ICrop[];

    @action
    public addNewFoodItem(item:ICrop){
        const items = [...this.myFoodItems];
        items.push(item);
        this.myFoodItems = items;
    }

    private constructor() {
        // API CALL to check login status
        this.isLoggedIn = false;
        this.userExistingContact = "";
        this.userNewContact = "";
        this.userName = "";
        this.myFoodItems = this.fetchMyFoodItems();
    }

    private fetchMyFoodItems(){
        return [];
    }
}