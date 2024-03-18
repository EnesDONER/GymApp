import { MovementModel } from './../models/movement.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovementDataService {

  private movements:MovementModel[];

  constructor() { }

  set(movements:MovementModel[]){
    this.movements = movements;
  }
  
  remove(id:string){
    const removedMovement = this.movements.findIndex(c=>c._id == id);
    if (removedMovement !== -1) {
      this.movements.splice(removedMovement,1)
    }
  }
  update(id: string, data: MovementModel) {
    const updatedMovementIndex = this.movements.findIndex(c => c._id === id);
    if (updatedMovementIndex !== -1) {
      this.movements.splice(updatedMovementIndex, 1, data);
    }
  }
  add(movement:MovementModel){
    this.movements.push(movement);
  }

}
