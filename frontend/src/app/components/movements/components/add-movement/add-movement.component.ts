import { MovementDataService } from './../../services/movement-data.service';
import { CategoryService } from './../../../categories/services/category.service';
import { MovementService } from './../../services/movement.service';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CategoryModel } from '../../../categories/models/category-model';
import { MovementModel } from '../../models/movement.model';

@Component({
  selector: 'app-add-movement',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-movement.component.html',
  styleUrl: './add-movement.component.css'
})
export class AddMovementComponent implements OnInit {

  categories:CategoryModel[]=[];
  selectedFile: File | undefined;
  selectedFileName: string | undefined;
  constructor(
    private movementService:MovementService,
    private _toastr:ToastrService,
    private _router: Router,
    private categoryService:CategoryService,
    private movementDataService:MovementDataService
    ){

  }
  ngOnInit(){
    this.getCategory();
  }

  add(form: NgForm){

    if (form.valid) {
      let movement = form.value;
      let name = movement["name"];
      let description = movement["description"];
      let videoLink = movement["videoLink"];

      let categories = movement["categoriesSelect"];
      

      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("videoLink", videoLink);
      formData.append("imageLink", this.selectedFile);
      formData.append("categoryId", categories);

      this.movementService.add(formData, res=>{
        this._toastr.success(res?.message);
        form.reset();
        let movement:MovementModel={
          _id:res.data._id,
          categoryId:res.data.categoryId,
          categoryName:res.data.categoryName,
          description:res.data.description,
          imageLink:res.data.imageLink,
          name:res.data.name,
          videoLink:res.data.videoLink
        }
      this.movementDataService.add(movement);
      const closeButton = document?.getElementById("closeButton");
      closeButton.click(); 
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

