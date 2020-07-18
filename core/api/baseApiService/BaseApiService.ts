import Axios, { CancelTokenSource, AxiosResponse, AxiosPromise } from 'axios';
import { IApiResponse } from './IApiResponse';

const axiosHeaders:object = { 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8' };
const customHeaders = (customData:object) =>{
    const headers:object = Object.assign({}, axiosHeaders, customData);
    return headers;
}

export class BaseApiService {

    public static async get<T>(url: string, source?: CancelTokenSource) {
        const axiosPromise = source ? BaseApiService.getAxiosPromiseWithSource(url, source) :
            BaseApiService.getAxiosPromise(url);
        const axiosResponse = await BaseApiService.prepareAxiosResponse(axiosPromise);
        return BaseApiService.prepareApiResponse<T>(axiosResponse);
    }

    public static async post<T>(url: string, payload: any = '', source?: CancelTokenSource) {
        const axiosPromise = source ? BaseApiService.postAxiosPromiseWithSource(url, payload, source) :
            BaseApiService.postAxiosPromise(url, payload);
        const axiosResponse = await BaseApiService.prepareAxiosResponse(axiosPromise);
        return BaseApiService.prepareApiResponse<T>(axiosResponse);
    }

    public static async put<T>(url:string, payload:any){
        const axiosPromise = BaseApiService.putAxiosPromise(url, payload);
        const axiosResponse = await BaseApiService.prepareAxiosResponse(axiosPromise);
        return BaseApiService.prepareApiResponse<T>(axiosResponse);
    }

    public static async delete<T>(url: string, source?: CancelTokenSource, customHeader?:object) {
        const axiosPromise = source ? BaseApiService.deleteAxiosPromiseWithSource(url, source, customHeader) :
            BaseApiService.deleteAxiosPromise(url, customHeader);
        const axiosResponse = await BaseApiService.prepareAxiosResponse(axiosPromise);
        return BaseApiService.prepareApiResponse<T>(axiosResponse);
    }
   

    private static async prepareApiResponse<T>(response: AxiosResponse): Promise<IApiResponse<T>> {
        const apiResponse: IApiResponse<T> = {
            status: response.status,
             data: response.data
        }
        return apiResponse;
    }

    private static async prepareAxiosResponse(axiosPromise: AxiosPromise) {
        try{
            const response = await axiosPromise;
            return response;
        }
        catch (error) {
            return Promise.reject(error)
        }
    }

    private static getAxiosPromise(url: string) {
        return Axios({
            method: "GET",
            url
        })
    }

    private static getAxiosPromiseWithSource(url: string, source: CancelTokenSource) {
        return Axios({
            method: "GET",
            url,
            cancelToken: source.token
        })
    }

    private static postAxiosPromise(url: string, payload: any = '') {
        return Axios({
            data: payload,
            headers: axiosHeaders,
            method: 'POST',
            url
        })
    }

    private static postAxiosPromiseWithSource(url: string, payload: any = '', source: CancelTokenSource) {
        return Axios({
            data: payload,
            headers: axiosHeaders,
            method: 'POST',
            url,
            cancelToken: source.token
        })
    }

    private static putAxiosPromise(url:string, payload:any){
        return Axios({
            data: payload,
            headers: axiosHeaders,
            method: 'PUT',
            url
        })
    }

    private static deleteAxiosPromise(url: string, customHeader?:object) {
        return Axios({
            headers: customHeader?customHeaders(customHeader):axiosHeaders,
            method: 'DELETE',
            url
        })
    }

    private static deleteAxiosPromiseWithSource(url: string, source: CancelTokenSource, customHeader?:object) {
        return Axios({
            headers: customHeader?customHeaders(customHeader):axiosHeaders,
            method: 'DELETE',
            url,
            cancelToken: source.token
        })
    }
}