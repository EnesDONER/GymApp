import { CategoryService } from './../../../categories/services/category.service';
import { Component, Input, OnInit } from '@angular/core';

import { MovementModel } from '../../models/movement.model';
import { MovementService } from '../../services/movement.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../../../common/shared/shared.module';
import { CategoryModel } from '../../../categories/models/category-model';


@Component({
  selector: 'app-update-movement',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './update-movement.component.html',
  styleUrl: './update-movement.component.css'
})
export class UpdateMovementComponent implements OnInit{
  @Input() updatedMovement : MovementModel;
  categories:CategoryModel[]=[];

  constructor(
    private movementService :MovementService,
    private categoryService :CategoryService,
    private _toastr : ToastrService,
  ){

  }
  ngOnInit(){
    this.getCategory();
  }

  update(form: NgForm) {

    if (form.valid) {
      let movement = form.value;
      let name = movement["name"];
      let description = movement["description"];
      let videoLink = movement["videoLink"];
      let imageLink = movement["imageLink"];
      let categories = movement["categoriesSelect"];

      let formData = new FormData();
      formData.append("_id", this.updatedMovement._id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("videoLink", videoLink);
      formData.append("imageLink", imageLink);
      formData.append("categoryId", categories);

      this.movementService.update(formData,this.updatedMovement._id, res=>{
        this._toastr.info(res.message);
        const closeButton = document?.getElementById("closeButton");
        closeButton.click(); 
        location.reload();
      });
    }
  }

  add(form: NgForm){

    if (form.valid) {
      let movement = form.value;
      let name = movement["name"];
      let description = movement["description"];
      let videoLink = movement["videoLink"];
      let imageLink = movement["imageLink"];
      let categories = movement["categoriesSelect"];
      
      console.log(categories)

      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("videoLink", videoLink);
      formData.append("imageLink", imageLink);
      formData.append("categoryId", categories);


      console.log(formData)
      this.movementService.add(formData, res=>{
        this._toastr.success(res?.message);
        form.reset();
        location.reload();
      });
    }
  }

  getCategory(){
    this.categoryService.getAll(res=>
      this.categories= res.data
      )
  }
}
