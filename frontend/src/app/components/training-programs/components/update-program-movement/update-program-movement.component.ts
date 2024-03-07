import { ToastrService } from 'ngx-toastr';
import { TrainingProgramService } from './../../services/training-program.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProgramMovementDayModel } from '../../models/program-movement-day.model';
import { SharedModule } from '../../../../common/shared/shared.module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-program-movement',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './update-program-movement.component.html',
  styleUrl: './update-program-movement.component.css'
})
export class UpdateProgramMovementComponent implements OnInit {


  @Input() updatedMovementId :string;
  @Input() updatedProgramId :string;
  @Input() updatedNumberOfSets :number;
  @Input() updatedNumberOfRepetitions :number;

  constructor(
    private trainingProgramService:TrainingProgramService,
    private _toastr : ToastrService
  ){

  }
  ngOnInit() {
    
  }

  updateProgramMovement(form:NgForm){

    if (form.valid) {
      let programMovement = form.value;
      let numberOfSets = programMovement['numberOfSets'];
      let numberOfRepetitions = programMovement['numberOfRepetitions'];

      let formData = new FormData();
      formData.append('numberOfSets', numberOfSets);
      formData.append('numberOfRepetitions', numberOfRepetitions);
      formData.append('programId', this.updatedProgramId);

      this.trainingProgramService.updateProgramMovement(formData,this.updatedMovementId, (res) => {
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
