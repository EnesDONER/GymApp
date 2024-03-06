import { SwalService } from './../../../../common/services/swal.service';
import { SharedModule } from 'primeng/api';
import { ProgramModel } from '../../models/program.model';
import { TrainingProgramService } from './../../services/training-program.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddTrainingProgramComponent } from '../add-training-program/add-training-program.component';

@Component({
  selector: 'app-list-training-program',
  standalone: true,
  imports: [SharedModule,RouterModule,AddTrainingProgramComponent],
  templateUrl: './list-training-program.component.html',
  styleUrl: './list-training-program.component.css'
})
export class ListTrainingProgramComponent implements OnInit{

  programs:ProgramModel[]=[];
  constructor(private trainingProgramService :TrainingProgramService,
    private _toastr:ToastrService, private _swal:SwalService){

  }
  ngOnInit(){
    this.getAll();
  }

  getAll(){
    this.trainingProgramService.getAllProgram(res=>
     this.programs = res.data )
  }
  remove(id:string){
    this._swal.callSwal("Program Silinsin mi?","Program Sil","Sil",()=>{
      this.trainingProgramService.removeProgramById(id,(res)=>{
        this._toastr.error(res.message);
        location.reload();
      })
    })
 
  }
}
