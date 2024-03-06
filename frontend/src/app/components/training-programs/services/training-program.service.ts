import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { ProgramModel } from '../models/program.model';
import { SingleResponseModel } from '../../../models/single-response.model';
import { ListResponseModel } from '../../../models/list-response.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingProgramService {
  constructor(
    private _http: GenericHttpService
  ) { }

  addProgram(model: FormData, callBack: (res: SingleResponseModel<ProgramModel>)=> void){
    this._http.post<SingleResponseModel<ProgramModel>>("programs/", model, res=> callBack(res));
  }

  updateProgram(model: FormData,id:string, callBack: (res:SingleResponseModel<ProgramModel>)=> void){
    this._http.put<SingleResponseModel<ProgramModel>>("programs/",id, model, res=> callBack(res));
  }
  getAllProgram(callBack: (res: ListResponseModel<ProgramModel>)=> void){
    this._http.get<ListResponseModel<ProgramModel>>("programs/", res=> callBack(res));
  }

  removeProgramById(id: string, callBack: (res: SingleResponseModel<ProgramModel>)=> void){
    this._http.delete<SingleResponseModel<ProgramModel>>("programs/", id, res=> callBack(res));
  }


  getProgramById(id:string, callBack: (res: SingleResponseModel<ProgramModel>)=> void){
    this._http.get<SingleResponseModel<ProgramModel>>("programs/get/"+ id, res=> callBack(res));
  }
}

