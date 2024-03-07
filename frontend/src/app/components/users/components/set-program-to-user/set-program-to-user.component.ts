import { UserService } from './../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TrainingProgramService } from './../../../training-programs/services/training-program.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProgramModel } from '../../../training-programs/models/program.model';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../../../common/shared/shared.module';

@Component({
  selector: 'app-set-program-to-user',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './set-program-to-user.component.html',
  styleUrl: './set-program-to-user.component.css'
})
export class SetProgramToUserComponent implements OnInit {

  @Input() userId:string;
  trainingPrograms:ProgramModel[];
  constructor(
    private trainingProgramService:TrainingProgramService,
    private _toastr:ToastrService,
    private userService:UserService
  ){

  }
  ngOnInit() {
    this.getAllProgram();
  }
  getAllProgram(){
    this.trainingProgramService.getAllProgram(res=>
      this.trainingPrograms = res.data
      )
  }
  add(form:NgForm){
    if (form.valid) {
      let userProgram = form.value;
      let programId = userProgram["programsSelect"];


      let formData = new FormData();
      formData.append("programsId", programId);
      formData.append("userId", this.userId);

      console.log(formData)
      this.userService.addUserProgram(formData, res=>{
        if(res.succeded){
          const closeButton = document?.getElementById("closeButton");
          closeButton.click(); 
          this._toastr.success(res?.message);
          form.reset();
          //location.reload();
        }
      });
    }
  }

}
