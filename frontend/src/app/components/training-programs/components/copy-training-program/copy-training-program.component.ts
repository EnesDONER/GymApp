import { NgForm } from '@angular/forms';
import { TrainingProgramService } from './../../services/training-program.service';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-copy-training-program',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './copy-training-program.component.html',
  styleUrl: './copy-training-program.component.css'
})
export class CopyTrainingProgramComponent {
  @Input() copyedProgramId: string;
  constructor(private trainingProgramService:TrainingProgramService,private _toastr:ToastrService){

  }
  copy(form:NgForm){
    if (form.valid) {
      let program = form.value;
      let name = program['name'];
      let description = program['description'];

      let formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);

      this.trainingProgramService.copyProgram(this.copyedProgramId,formData, (res) => {
        if (res.succeded) {
          const closeButton = document?.getElementById('closeButton');
          closeButton.click();
          this._toastr.success(res?.message);
          form.reset();
          location.reload();
        }
      });
    }
  }
}
