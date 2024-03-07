import { Component, Input } from '@angular/core';
import { ProgramModel } from '../../../training-programs/models/program.model';
import { TrainingProgramService } from '../../../training-programs/services/training-program.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../../../common/shared/shared.module';

@Component({
  selector: 'app-update-user-program',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './update-user-program.component.html',
  styleUrl: './update-user-program.component.css'
})
export class UpdateUserProgramComponent {
  @Input() userId:string;
  @Input() updatedUserProgramId:string;
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
  update(form:NgForm){
    if (form.valid) {
      let userProgram = form.value;
      let programId = userProgram["programsSelect"];


      let formData = new FormData();
      formData.append("programsId", programId);
      formData.append("userId", this.userId);

      console.log(formData)
      this.userService.updateUserProgram(this.updatedUserProgramId,formData, res=>{
        if(res.succeded){
          const closeButton = document?.getElementById("closeButton");
          closeButton.click(); 
          this._toastr.success(res?.message);
          form.reset();
          location.reload();
        }
      });
    }
  }

}
