import { ListResponseModel } from "./list-response.model";

export interface PaginateResponseModel<T> extends ListResponseModel<T>{
    totalRecord:number;
}