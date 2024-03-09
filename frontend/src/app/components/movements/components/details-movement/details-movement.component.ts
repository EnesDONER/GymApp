import { SharedModule } from '../../../../common/shared/shared.module';
import { MovementModel } from '../../models/movement.model';
import { PlayVideoComponent } from '../play-video/play-video.component';
import { MovementService } from './../../services/movement.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-movement',
  standalone: true,
  imports: [SharedModule,PlayVideoComponent],
  templateUrl: './details-movement.component.html',
  styleUrl: './details-movement.component.css'
})
export class DetailsMovementComponent {

  @Input() movementId:string;
  movement:MovementModel;
  constructor(private movementService:MovementService){

  }
  ngOnInit(){
   // this.getMovement();
  }

  getMovement(){
    this.movementService.getById(this.movementId,res=>{
      this.movement= res.data
    })
  }
}
