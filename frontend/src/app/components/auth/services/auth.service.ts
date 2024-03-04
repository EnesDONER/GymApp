import { Injectable } from '@angular/core';

import { LoginResponseModel } from '../models/login-response.model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { GenericHttpService } from '../../../common/services/generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: GenericHttpService
  ) { }

  login(model:LoginModel, callBack: (res:LoginResponseModel)=> void){
    this._http.post<LoginResponseModel>("user/login",model,res=>  callBack(res));
  }

  register(model:RegisterModel, callBack: (res:LoginResponseModel)=> void){
    this._http.post<LoginResponseModel>("user/register",model, res=> callBack(res));
  }
  adminLogin(model:LoginModel, callBack: (res:LoginResponseModel)=> void){
    this._http.post<LoginResponseModel>("admin/login",model,res=>  callBack(res));
  }

  adminRegister(model:RegisterModel, callBack: (res:LoginResponseModel)=> void){
    this._http.post<LoginResponseModel>("admin/register",model, res=> callBack(res));
  }
}
