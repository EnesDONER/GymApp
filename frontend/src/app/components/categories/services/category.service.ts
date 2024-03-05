import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { CategoryModel } from '../models/category-model';
import { SingleResponseModel } from '../../../models/single-response.model';
import { ListResponseModel } from '../../../models/list-response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http: GenericHttpService
  ) { }

  add(model: FormData, callBack: (res: SingleResponseModel<CategoryModel>)=> void){
    this._http.post<SingleResponseModel<CategoryModel>>("category/", model, res=> callBack(res));
  }

  update(model: FormData, id:string, callBack: (res:SingleResponseModel<CategoryModel>)=> void){
    this._http.put<SingleResponseModel<CategoryModel>>("category/",id, model, res=> callBack(res));
  }

  getAll(callBack: (res: ListResponseModel<CategoryModel>)=> void){
    this._http.get<ListResponseModel<CategoryModel>>("category/", res=> callBack(res));
  }

  removeById(id: string, callBack: (res: SingleResponseModel<CategoryModel>)=> void){
    this._http.delete<SingleResponseModel<CategoryModel>>("category/", id, res=> callBack(res));
  }


  getById(model: any, callBack: (res: SingleResponseModel<CategoryModel>)=> void){
    this._http.post<SingleResponseModel<CategoryModel>>("category/getById", model, res=> callBack(res));
  }
}
