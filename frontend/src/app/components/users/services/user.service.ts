import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { UserModel } from '../models/user.model';
import { ListResponseModel } from '../../../models/list-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: GenericHttpService
  ) { }

  getAll(callBack: (res:ListResponseModel<UserModel>)=> void){
    this._http.get<ListResponseModel<UserModel>>("admin/user-list",res=>  callBack(res));
  }
}
