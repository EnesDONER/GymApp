import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../services/category.service';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { get } from 'http';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  constructor(
    private categoryService:CategoryService,
    private _toastr:ToastrService,
    private _router: Router

    ){

  }

  add(form:NgForm){
    if (form.valid) {
      let category = form.value;
      let name = category["name"];

      let formData = new FormData();
      formData.append("name", name);

      this.categoryService.add(formData, res=>{
        if(res.succeded){
          const closeButton = document?.getElementById("closeButton");
          closeButton.click(); 
          this._toastr.success(res?.message);
          form.reset();
          location.reload();
        }
      });
    }
  
  }
}
