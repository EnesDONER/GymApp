import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { OffcanvasComponent } from '../offcanvas/offcanvas.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule,OffcanvasComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isOpen :boolean =false;
  
  canvasOpen(){
    this.isOpen != this.isOpen;
  }
}
