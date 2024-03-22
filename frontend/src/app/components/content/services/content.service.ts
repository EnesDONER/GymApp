import { ContentModel } from './../models/content.model';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { SingleResponseModel } from '../../../models/single-response.model';
import { ListResponseModel } from '../../../models/list-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private _http: GenericHttpService,
    private http:HttpClient
  ) { }

  // get(page:string, callBack: (res: ListResponseModel<ContentModel>)=> void){
  //   this._http.get<ListResponseModel<ContentModel>>("contents/page/"+page, res=> callBack(res));
  // }

  update(model: FormData, callBack: (res:SingleResponseModel<ContentModel>)=> void){
    this._http.post<SingleResponseModel<ContentModel>>("contents/", model, res=> callBack(res));
  }
  get(page: string): Promise<ListResponseModel<ContentModel>> {
   // const url = `http://localhost:8800/api/contents/page/${page}`;
    const url = `https://gym-app-seen.azurewebsites.net/api/contents/page/${page}`;
    return new Promise((resolve, reject) => {
      this.http.get<ListResponseModel<ContentModel>>(url).subscribe(
        response => resolve(response),
        error => reject(error)
      );
    });
  }
}

