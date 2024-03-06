import { Injectable } from '@angular/core';

import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { LoginResponseModel } from '../models/login-response.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: GenericHttpService
  ) { }

  login(model:LoginModel, callBack: (res:LoginResponseModel<LoginModel>)=> void){
    this._http.post<LoginResponseModel<LoginModel>>("user/login",model,res=>  callBack(res));
  }

  register(model:RegisterModel, callBack: (res:LoginResponseModel<RegisterModel>)=> void){
    this._http.post<LoginResponseModel<RegisterModel>>("user/register",model, res=> callBack(res));
  }
  adminLogin(model:LoginModel, callBack: (res:LoginResponseModel<LoginModel>)=> void){
    this._http.post<LoginResponseModel<LoginModel>>("admin/login",model,res=>  callBack(res));
  }

  adminRegister(model:RegisterModel, callBack: (res:LoginResponseModel<RegisterModel>)=> void){
    this._http.post<LoginResponseModel<RegisterModel>>("admin/register",model, res=> callBack(res));
  }
}
