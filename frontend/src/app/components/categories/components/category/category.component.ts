import { CategoryService } from '../../services/category.service';
import { Component } from '@angular/core';
import { CategoryModel } from '../../models/category-model';
import { SwalService } from '../../../../common/services/swal.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../../../common/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule,AddCategoryComponent,UpdateCategoryComponent,TableModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories:CategoryModel[]= [];
  categoryId:string="";
  category : CategoryModel; 
  updatedCategory:CategoryModel;



  loading: boolean = false;

  totalRecord: number;

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
    this._swal.callSwal("Kategoriyi silmek istiyor musunuz?","Kategoriyi Sil","Sil",()=>{
      
      this.categoryService.removeById(id , res=>
        this._toastr.error(res.message))
      location.reload();

    })

  }
  getById(){
    let model = {_id: this.categoryId};
    this.categoryService.getById(model, res=> this.category = res.data);
  }



}


