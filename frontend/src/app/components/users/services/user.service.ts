import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { UserModel } from '../models/user.model';
import { ListResponseModel } from '../../../models/list-response.model';
import { SingleResponseModel } from '../../../models/single-response.model';
import { UserProgramModel } from '../models/user-program.model';

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
  addUserProgram(model: FormData, callBack: (res: SingleResponseModel<UserProgramModel>)=> void){
    this._http.post<SingleResponseModel<UserProgramModel>>("user-programs/", model, res=> callBack(res));
  }
  updateUserProgram(id:string,model: FormData, callBack: (res: SingleResponseModel<UserProgramModel>)=> void){
    this._http.put<SingleResponseModel<UserProgramModel>>("user-programs/",id, model, res=> callBack(res));
  }
}
