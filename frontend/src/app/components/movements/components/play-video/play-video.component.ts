import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { SafePipe } from '../../../../common/pipes/safe.pipe';

@Component({
  selector: 'app-play-video',
  standalone: true,
  imports: [SharedModule,SafePipe],
  templateUrl: './play-video.component.html',
  styleUrl: './play-video.component.css'
})
export class PlayVideoComponent implements OnInit{
  

  @Input() videoLink:string="";

  ngOnInit(): void {
    const videoIdPattern = /(?<=v=|v\/|vi=|vi\/|youtu.be\/|\/v\/|embed\/|\/\d+\/|\/\d+\?v=|&v=|embed\/|youtu.be\/|\/v\/|e\/|watch\?v=|&v=|\/\w{11})([\w-]+)/;
    const videoIdMatch = this.videoLink.match(videoIdPattern);
  
    if (videoIdMatch) {
      this.videoLink = videoIdMatch[0];
    }
  }

  @HostListener('hide.bs.modal', ['$event'])

  onHideModal(event: any) {
  this.stopVideo();
  }

  stopVideo() {
    this.videoLink = ''
    location.reload()
  }
  

}
