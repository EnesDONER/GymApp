import { SafePipe } from '../../../../common/pipes/safe.pipe';
import { SharedModule } from '../../../../common/shared/shared.module';
import { MovementModel } from '../../models/movement.model';
import { PlayVideoComponent } from '../play-video/play-video.component';
import { MovementService } from './../../services/movement.service';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-details-movement',
  standalone: true,
  imports: [SharedModule,PlayVideoComponent,SafePipe],
  templateUrl: './details-movement.component.html',
  styleUrl: './details-movement.component.css'
})
export class DetailsMovementComponent {

  @Input() movementId:string;
  movement:MovementModel;
  constructor(private movementService:MovementService){

  }
  ngOnInit(){
    this.getMovement();
  }

  getMovement(){
    this.movementService.getById(this.movementId,res=>{
      this.movement= res.data;
      const videoIdPattern = /(?<=v=|v\/|vi=|vi\/|youtu.be\/|\/v\/|embed\/|\/\d+\/|\/\d+\?v=|&v=|embed\/|youtu.be\/|\/v\/|e\/|watch\?v=|&v=|\/\w{11})([\w-]+)/;
      const videoIdMatch = this.movement.videoLink.match(videoIdPattern);
    
      if (videoIdMatch) {
        this.movement.videoLink = videoIdMatch[0];
      }
    })
  }

  @HostListener('hide.bs.modal', ['$event'])

  onHideModal(event: any) {
  this.stopVideo();
  }

  stopVideo() {
    this.movement = null;
    location.reload()
  }
  
}
