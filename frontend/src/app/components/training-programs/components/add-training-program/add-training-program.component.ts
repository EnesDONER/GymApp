import { TrainingProgramDataService } from './../../services/training-program-data.service';
import { TrainingProgramService } from './../../services/training-program.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../../../common/shared/shared.module';
import { ProgramModel } from '../../models/program.model';

@Component({
  selector: 'app-add-training-program',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-training-program.component.html',
  styleUrl: './add-training-program.component.css',
})
export class AddTrainingProgramComponent implements OnInit {
  constructor(
    private _toastr: ToastrService,
    private trainingProgramService: TrainingProgramService,
    private trainingProgramDataService:TrainingProgramDataService
  ) {}
  ngOnInit() {}
  
  add(form: NgForm) {
    if (form.valid) {
      let program = form.value;
      let name = program['name'];
      let description = program['description'];

      let formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);

      this.trainingProgramService.addProgram(formData, (res) => {
        if (res.succeded) {
          const closeButton = document?.getElementById('closeButton');
          closeButton.click();
          this._toastr.success(res?.message);
          form.reset();
          let program:ProgramModel={
            _id:res.data._id,
            description:res.data.description,
            name:res.data.name
          }
          this.trainingProgramDataService.add(program)
        }
      });
    }
  }
}
