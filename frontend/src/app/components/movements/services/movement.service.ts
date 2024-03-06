import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { MovementModel } from '../models/movement.model';
import { ListResponseModel } from '../../../models/list-response.model';
import { SingleResponseModel } from '../../../models/single-response.model';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  constructor(
    private _http: GenericHttpService
  ) { }

  add(model: FormData, callBack: (res: SingleResponseModel<MovementModel>)=> void){
    this._http.post<SingleResponseModel<MovementModel>>("movement/", model, res=> callBack(res));
  }

  update(model: FormData,id:string, callBack: (res:SingleResponseModel<MovementModel>)=> void){
    this._http.put<SingleResponseModel<MovementModel>>("movement/",id, model, res=> callBack(res));
  }
  getAll(callBack: (res: ListResponseModel<MovementModel>)=> void){
    this._http.get<ListResponseModel<MovementModel>>("movement/", res=> callBack(res));
  }

  removeById(id: string, callBack: (res: SingleResponseModel<MovementModel>)=> void){
    this._http.delete<SingleResponseModel<MovementModel>>("movement/", id, res=> callBack(res));
  }


  getById(model: any, callBack: (res: SingleResponseModel<MovementModel>)=> void){
    this._http.post<SingleResponseModel<MovementModel>>("movement/getById", model, res=> callBack(res));
  }
}
