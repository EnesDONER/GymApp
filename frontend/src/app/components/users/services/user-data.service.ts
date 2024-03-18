import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { ProgramModel } from '../../training-programs/models/program.model';
import { UserProgramModel } from '../models/user-program.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private users : UserModel[];
  private program : ProgramModel[];
  private userProgram : UserProgramModel;
  constructor() { }

  set( users : UserModel[]){
    this.users = users;
  }

  setProgram( program : ProgramModel[]){
    this.program = program;
  }

  get(){
    return this.users;
  }

  removeProgram(id:string){
    this.users.find(c=>c.userProgramsId == id).programId ='';

  }
  statusChange(id:string){
    const user = this.users.find(c => c._id === id);
    if (user) {
      user.isStatus = !user.isStatus; 
    }
    
  }

}
