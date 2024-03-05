import { CategoryService } from '../../services/category.service';
import { Component } from '@angular/core';
import { CategoryModel } from '../../models/category-model';
import { SwalService } from '../../../../common/services/swal.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule,AddCategoryComponent,UpdateCategoryComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories:CategoryModel[]= [];
  categoryId:string="";
  category : CategoryModel; 
  updatedCategory:CategoryModel;

  constructor(
    
    private categoryService: CategoryService,
    private _swal: SwalService,
    private _toastr: ToastrService,
    private _activated: ActivatedRoute
  ) { 
   
    // this._activated.params.subscribe(res=>{
    //   if(res["value"]){
    //   this.categoryId = res["value"];
    //   this.getById();
    //   }
    // })
    //this.categoryId ="65e4f8e9931353e94b3cf402";
   
   
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.categoryService.getAll(res=>{
        this.categories = res.data
      }
      );    
  }

  remove(id:string){
    this.categoryService.removeById(id , res=>
      this._toastr.error(res.message))
    location.reload();

  }

  getById(){
    let model = {_id: this.categoryId};
    this.categoryService.getById(model, res=> this.category = res.data);
  }


}


