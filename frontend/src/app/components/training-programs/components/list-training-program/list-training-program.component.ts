import { SwalService } from './../../../../common/services/swal.service';
import { ProgramModel } from '../../models/program.model';
import { TrainingProgramService } from './../../services/training-program.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddTrainingProgramComponent } from '../add-training-program/add-training-program.component';
import { UpdateTrainingProgramComponent } from '../update-training-program/update-training-program.component';
import { CopyTrainingProgramComponent } from '../copy-training-program/copy-training-program.component';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../../../../common/shared/shared.module';

@Component({
  selector: 'app-list-training-program',
  standalone: true,
  imports: [SharedModule,RouterModule,AddTrainingProgramComponent,UpdateTrainingProgramComponent,CopyTrainingProgramComponent,InputTextModule ],
  templateUrl: './list-training-program.component.html',
  styleUrl: './list-training-program.component.css'
})
export class ListTrainingProgramComponent implements OnInit{
  filter:string;
  filtredPrograms:ProgramModel[]=[];
  updatedProgram:ProgramModel;
  copyedProgramId:string;
  programs:ProgramModel[]=[];
  constructor(private trainingProgramService :TrainingProgramService,
    private _toastr:ToastrService, private _swal:SwalService){

  }
  ngOnInit(){
    this.getAll();
  }

  getAll(){
    this.trainingProgramService.getAllProgram(res=>{
      this.programs = res.data;
      this.filtredPrograms=this.programs;
    })
    
  }
  remove(id:string){
    this._swal.callSwal("Program Silinsin mi?","Program Sil","Sil",()=>{
      this.trainingProgramService.removeProgramById(id,(res)=>{
        this._toastr.error(res.message);
        location.reload();
      })
    })
 
  }
  search(){
    this.filtredPrograms = 
    this.programs.filter(p=>p.description.toLowerCase().includes(this.filter.toLowerCase()) 
    || p.name.toLowerCase().includes(this.filter.toLowerCase()));
  }
}
