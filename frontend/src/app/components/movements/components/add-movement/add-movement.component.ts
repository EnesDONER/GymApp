import { MovementService } from './../../services/movement.service';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-movement',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-movement.component.html',
  styleUrl: './add-movement.component.css'
})
export class AddMovementComponent {
  constructor(
    private movementService:MovementService,
    private _toastr:ToastrService,
    private _router: Router

    ){

  }

  add(form: NgForm){

    if (form.valid) {
      let movement = form.value;
      let name = movement["name"];
      let description = movement["description"];
      let videoLink = movement["videoLink"];
      let imageLink = movement["imageLink"];
      let categoryId  = movement["categoryId "];

      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("videoLink", videoLink);
      formData.append("imageLink", imageLink);
      formData.append("categoryId", categoryId);

      this.movementService.add(formData, res=>{
        this._toastr.success(res?.message);
        form.reset();
        location.reload();
      });
    }
  }
}

