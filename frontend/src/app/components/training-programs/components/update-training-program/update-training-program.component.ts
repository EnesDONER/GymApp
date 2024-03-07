import { TrainingProgramService } from './../../services/training-program.service';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { ProgramModel } from '../../models/program.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-training-program',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './update-training-program.component.html',
  styleUrl: './update-training-program.component.css'
})
export class UpdateTrainingProgramComponent {
  
  @Input() updatedProgram:ProgramModel;

  constructor(private _toastr : ToastrService,private trainingProgramService:TrainingProgramService){

  }
  
  update(form: NgForm) {

    if (form.valid) {
      let program = form.value;
      let name = program["name"];
      let description = program["description"];

      let formData = new FormData();
      formData.append("_id", this.updatedProgram._id);
      formData.append("name", name);
      formData.append("description", description);

      this.trainingProgramService.updateProgram(formData,this.updatedProgram._id, res=>{
        this._toastr.info(res.message);
        const closeButton = document?.getElementById("closeButton");
        closeButton.click(); 
        location.reload();
      });
    }
  }

}