import { SingleResponseModel } from "../../../models/single-response.model";

export interface LoginResponseModel<T> extends SingleResponseModel<T>{
    token: string;
}