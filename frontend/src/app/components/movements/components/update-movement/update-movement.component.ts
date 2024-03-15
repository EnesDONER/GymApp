import { MovementDataService } from './../../services/movement-data.service';
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
  selectedFile: File | undefined;
  selectedFileName: string | undefined;
  constructor(
    private movementService :MovementService,
    private categoryService :CategoryService,
    private _toastr : ToastrService,
    private movementDataService:MovementDataService
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
      let categories = movement["categoriesSelect"];

      let formData = new FormData();
      formData.append("_id", this.updatedMovement._id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("videoLink", videoLink);
      formData.append("imageLink", this.selectedFile);
      formData.append("categoryId", categories);

      this.movementService.update(formData,this.updatedMovement._id, res=>{
        this._toastr.info(res.message);
        const closeButton = document?.getElementById("closeButton");
        closeButton.click(); 

        let movement : MovementModel = {
          _id: this.updatedMovement._id,
          name: name,
          description : description,
          videoLink : videoLink,
          imageLink : res.data.imageLink,
          categoryId:categories,
          categoryName: res.data.categoryName

        }
        this.movementDataService.update(this.updatedMovement._id,movement)
      });
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = " - "+ this.selectedFile?.name;
  }

  getCategory(){
    this.categoryService.getAll(res=>
      this.categories= res.data
      )
  }
}
