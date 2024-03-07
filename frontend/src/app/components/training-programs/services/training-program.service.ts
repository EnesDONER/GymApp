import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { ProgramModel } from '../models/program.model';
import { SingleResponseModel } from '../../../models/single-response.model';
import { ListResponseModel } from '../../../models/list-response.model';
import { ProgramMovementModel } from '../models/program-movement.model';
import { ProgramResponseModel } from '../models/program-response.model';
import { HttpClient } from '@angular/common/http';
import { AddProgramMovementModel } from '../models/add-program-movement.model';
import { ProgramMovementDayModel } from '../models/program-movement-day.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingProgramService {
  constructor(
    private _http: GenericHttpService,
    private http : HttpClient
  ) { }

  addProgram(model: FormData, callBack: (res: SingleResponseModel<ProgramModel>)=> void){
    this._http.post<SingleResponseModel<ProgramModel>>("programs/", model, res=> callBack(res));
  }
  addProgramMovement(model: FormData, callBack: (res: SingleResponseModel<AddProgramMovementModel>)=> void){
    this._http.post<SingleResponseModel<AddProgramMovementModel>>("program-movement/", model, res=> callBack(res));
  }
  copyProgram(id:string, model: FormData, callBack: (res: SingleResponseModel<ProgramModel>)=> void){
    this._http.post<SingleResponseModel<ProgramModel>>("programs/copy"+id, model, res=> callBack(res));
  }
  updateProgram(model: FormData,id:string, callBack: (res:SingleResponseModel<ProgramModel>)=> void){
    this._http.put<SingleResponseModel<ProgramModel>>("programs/",id, model, res=> callBack(res));
  }
  updateProgramMovement(model: FormData,id:string, callBack: (res:SingleResponseModel<ProgramMovementDayModel>)=> void){
    this._http.put<SingleResponseModel<ProgramMovementDayModel>>("program-movement/",id, model, res=> callBack(res));
  }

  getAllProgram(callBack: (res: ListResponseModel<ProgramModel>)=> void){
    this._http.get<ListResponseModel<ProgramModel>>("programs/", res=> callBack(res));
  }
  getProgramById(id:string,callBack: (res: SingleResponseModel<ProgramModel>)=> void){
    this._http.get<SingleResponseModel<ProgramModel>>("programs/"+id, res=> callBack(res));
  }
  removeProgramById(id: string, callBack: (res: SingleResponseModel<ProgramModel>)=> void){
    this._http.delete<SingleResponseModel<ProgramModel>>("programs/", id, res=> callBack(res));
  }
  removeProgramMovementById(id: string, callBack: (res: SingleResponseModel<ProgramModel>)=> void){
    this._http.delete<SingleResponseModel<ProgramModel>>("program-movement/", id, res=> callBack(res));
  }

  getProgramMovementById(programId: string): Promise<any> {
    const url = `http://localhost:8800/api/program-movement/${programId}`
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(response => resolve(response), error => reject(error));
    });
}

}

