import { ToastrService } from 'ngx-toastr';
import { TrainingProgramService } from './../../services/training-program.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramModel } from '../../models/program.model';
import { ProgramMovementModel } from '../../models/program-movement.model';
import { ProgramMovementDayModel } from '../../models/program-movement-day.model';
import { ProgramResponseModel } from '../../models/program-response.model';
import { timeInterval } from 'rxjs';
import { promises } from 'dns';

@Component({
  selector: 'app-training-program',
  standalone: true,
  imports: [],
  templateUrl: './training-program.component.html',
  styleUrl: './training-program.component.css'
})
export class TrainingProgramComponent implements OnInit{

  programId:string;
  program:ProgramMovementModel;
  pazartesi:ProgramMovementDayModel[];
  sali:ProgramMovementDayModel[];
  carsamba:ProgramMovementDayModel[];
  persembe:ProgramMovementDayModel[];
  cuma:ProgramMovementDayModel[];
  cumartesi:ProgramMovementDayModel[];
  pazar:ProgramMovementDayModel[];


  constructor(
    private _activated: ActivatedRoute,
    private trainingProgramService:TrainingProgramService,
    private _toastr:ToastrService
  ){
   
  }
  async ngOnInit():Promise<void> {
        this._activated.params.subscribe(res=>{
      if(res["id"]){
      this.programId = res["id"];
      }
    })
    await this.getById();
  }

 

  async getById() {
    try {
        const res = await this.trainingProgramService.getProgramMovementById(this.programId);
        this.program = res.data; 
        await this.setProgramDay();
    } catch (error) {
        console.error(error);
    }
  }
  setProgramDay(){
    this.pazartesi= this.program.Pazartesi;
    this.sali= this.program.Sali;
    this.carsamba= this.program.Carsamba;
    this.persembe= this.program.Persembe;
    this.cuma= this.program.Cuma;
    this.cumartesi= this.program.Cumartesi;
    this.pazar= this.program.Pazar;
    console.log(this.pazartesi,"p")
  }
}
