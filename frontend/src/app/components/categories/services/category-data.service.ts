import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService{

  private categories : CategoryModel[];

  constructor() { }

  set( categories : CategoryModel[]){
    this.categories = categories;
  }
  get(){
    return this.categories;
  }

  remove(id:string){
    const removedCategory = this.categories.findIndex(c=>c._id == id);
    if (removedCategory !== -1) {
      this.categories.splice(removedCategory,1)
    }
  }
  update(id: string, data: CategoryModel) {
    const updatedCategoryIndex = this.categories.findIndex(c => c._id === id);
    if (updatedCategoryIndex !== -1) {
      this.categories.splice(updatedCategoryIndex, 1, data);
    }
  }
  add(category:CategoryModel){
    this.categories.push(category);
  }

}
