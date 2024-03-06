import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../common/services/swal.service';
import { MovementService } from '../../services/movement.service';
import { MovementModel } from '../../models/movement.model';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { AddMovementComponent } from '../add-movement/add-movement.component';
import { UpdateMovementComponent } from '../update-movement/update-movement.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-movement',
  standalone: true,
  imports: [SharedModule,AddMovementComponent,UpdateMovementComponent,TableModule],
  templateUrl: './movement.component.html',
  styleUrl: './movement.component.css'
})
export class MovementComponent {
  movements: MovementModel[] = [];
  updatedMovement:MovementModel;
  constructor(
    private movementService: MovementService,
    private _swal: SwalService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.movementService.getAll(res => {
      this.movements = res.data;
    })
  }

  remove(id:string){
    this.movementService.removeById(id , res=>
      this._toastr.error(res.message));
    location.reload();
  }

}
