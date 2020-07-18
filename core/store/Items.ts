import { observable, action } from "mobx";
import { ICrop } from "../api/interfaces/APIData";
import { Crops } from "../api/Crops";

export class Items{
    public static foodItems:Items;

    public static initFoodItems(){
        Items.foodItems = new Items();
    }

    @observable public itemList:ICrop[];
    @observable public filter:{distance:number|undefined};
    @observable public sortType:"asscending"|"descending"|"availability"|"Featured";

    @action
    public async fetchItems(){
        if(this.filter){
            // Call API with filter
        }
        else{
            this.itemList = (await Crops.getAllCrops()).data;
        }
    }

    private constructor(){
        this.itemList = [];
        this.fetchItems();
        this.filter = {
            distance:undefined
        },
        this.sortType = "Featured"
    }
}