import { Injectable } from '@angular/core';
import { ProgramModel } from '../models/program.model';
import { ProgramMovementModel } from '../models/program-movement.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingProgramDataService {

  programs : ProgramModel[];
  movement:ProgramMovementModel;
  constructor() { }
 
  set(programs:ProgramModel[]){
    this.programs =programs;
  }

  remove(id:string){
    const removedProgram = this.programs.findIndex(c=>c._id == id);
    if (removedProgram !== -1) {
      this.programs.splice(removedProgram,1)
    }
  }

  update(id: string, data: ProgramModel) {
    const updatedProgramIndex = this.programs.findIndex(c => c._id === id);
    if (updatedProgramIndex !== -1) {
      this.programs.splice(updatedProgramIndex, 1, data);
    }
  }

  search(filter:string){

    return this.programs.filter(p=>p.description.toLowerCase().includes(filter.toLowerCase()) 
    || p.name.toLowerCase().includes(filter.toLowerCase()));
  }

  add(program:ProgramModel){
    this.programs.push(program);
  }


}
