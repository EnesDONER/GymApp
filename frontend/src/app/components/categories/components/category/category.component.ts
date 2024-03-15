import { CategoryDataService } from './../../services/category-data.service';
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

  totalRecord: number;

  constructor(
    
    private categoryService: CategoryService,
    private _swal: SwalService,
    private _toastr: ToastrService, 
    private categoryDataService : CategoryDataService
  ) { 
  
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.categoryService.getAll(res=>{
        this.categories = res.data;
        this.categoryDataService.set(res.data);
      }
      );    
  }

  remove(id:string){
    this._swal.callSwal("Kategoriyi silmek istiyor musunuz?","Kategoriyi Sil","Sil",()=>{
      
      this.categoryService.removeById(id , res=>
        this._toastr.error(res.message))
        this.categoryDataService.remove(id);  
    })

  }
  getById(){
    let model = {_id: this.categoryId};
    this.categoryService.getById(model, res=> this.category = res.data);
  }



}


