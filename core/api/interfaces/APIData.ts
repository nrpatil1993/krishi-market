export interface ICrop {
    _id: string,
    crop: string,
    cropType: string,
    stockStatus: "In Stock" | "Out of Stock",
    sellStatus: boolean,
    contact: string,
    quantity:string
}