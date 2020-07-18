import {crops} from '../mock/cropsList';
import { ICrop } from './interfaces/APIData';
import { IApiResponse } from './baseApiService/IApiResponse';

export class Crops{
    public static async getAllCrops():Promise<IApiResponse<ICrop[]>>{
        return {
            data:crops,
            status:200
        };
    }
}