import { Component, ElementRef, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { SafePipe } from '../../../../common/pipes/safe.pipe';

@Component({
  selector: 'app-play-video',
  standalone: true,
  imports: [SharedModule,SafePipe],
  templateUrl: './play-video.component.html',
  styleUrl: './play-video.component.css'
})
export class PlayVideoComponent {

  @Input() videoLink:string="";


  @HostListener('hide.bs.modal', ['$event'])

  onHideModal(event: any) {
  this.stopVideo();
  }

  stopVideo() {
    this.videoLink = ''
    location.reload()
  }
  

}
