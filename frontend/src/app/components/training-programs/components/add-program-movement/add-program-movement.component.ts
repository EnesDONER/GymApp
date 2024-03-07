import { TrainingProgramService } from './../../services/training-program.service';
import { MovementModel } from './../../../movements/models/movement.model';
import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { MovementService } from '../../../movements/services/movement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-program-movement',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-program-movement.component.html',
  styleUrl: './add-program-movement.component.css'
})
export class AddProgramMovementComponent implements OnInit {

  movements: MovementModel[];
  @Input() addedProgramDay : string;
  @Input() addedProgramId : string;

  constructor(
    private movementService:MovementService,
    private _toastr:ToastrService,
    private trainingProgramService:TrainingProgramService
  ){

  }

  ngOnInit(){
    this.getMovements();
  }

  getMovements(){
    this.movementService.getAll(res=>this.movements =res.data);
  }

  addProgramMovement(form:NgForm){
    if (form.valid) {
      let programMovement = form.value;
      let numberOfSets = programMovement['numberOfSets'];
      let numberOfRepetitions = programMovement['numberOfRepetitions'];
      let programMovementSelect = programMovement['programMovementSelect'];

      let formData = new FormData();
      formData.append('numberOfSets', numberOfSets);
      formData.append('numberOfRepetitions', numberOfRepetitions);
      formData.append('movementsId', programMovementSelect);
      formData.append('programsId', this.addedProgramId);
      formData.append('day', this.addedProgramDay);

      this.trainingProgramService.addProgramMovement(formData, (res) => {
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
