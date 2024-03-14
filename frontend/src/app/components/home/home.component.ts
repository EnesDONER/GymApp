import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { GalleriaModule } from 'primeng/galleria';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule,GalleriaModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images: any[] = [
    { itemImageSrc: 'assets/user/img/gallery/gallery-1.jpg' },
    { itemImageSrc: 'assets/user/img/gallery/gallery-2.jpg' },
    { itemImageSrc: 'assets/user/img/gallery/gallery-3.jpg' },
    { itemImageSrc: 'assets/user/img/gallery/gallery-4.jpg' },
    { itemImageSrc: 'assets/user/img/gallery/gallery-5.jpg' },
    { itemImageSrc: 'assets/user/img/gallery/gallery-6.jpg' },
    // Diğer resimler buraya eklenebilir
  ];

  // valueChange olayını tanımlayın
  onValueChange(event: any) {
    this.images = event.value;
  }

  responsiveOptions: any[];

  constructor() {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  }
}
