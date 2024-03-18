import { CategoryModel } from './../../models/category-model';
import { CategoryDataService } from './../../services/category-data.service';
import { CategoryComponent } from './../category/category.component';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';

declare var  $: any;

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {
  @Input() updatedCategory:CategoryModel = {
    _id: "",
    name: ""
  };

  constructor(
    private categoryService :CategoryService,
    private _toastr : ToastrService,
    private categoryDataService:CategoryDataService
  ){

  }

  closeModal() {
    $("#updateModal").removeClass("in");
      $(".modal-backdrop").remove();
      $("#updateModal").hide();
  }
  update(form: NgForm) {

    if (form.valid) {
      let category = form.value;
      let name = category["name"];

      let formData = new FormData();
      formData.append("_id", this.updatedCategory._id);
      formData.append("name", name);

      this.categoryService.update(formData,this.updatedCategory._id, res=>{
        this._toastr.info(res.message);

        let category : CategoryModel = {
          _id : this.updatedCategory._id,
          name : name
        }
        
        this.categoryDataService.update(this.updatedCategory._id,category)

        this.closeModal();

      });
    }
  }
}
