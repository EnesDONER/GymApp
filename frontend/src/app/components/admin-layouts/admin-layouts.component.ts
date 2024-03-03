import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { LeftAsideComponent } from './left-aside/left-aside.component';

@Component({
  selector: 'app-admin-layouts',
  standalone: true,
  imports: [SharedModule,NavbarComponent,AsideComponent,FooterComponent,LeftAsideComponent],
  templateUrl: './admin-layouts.component.html',
  styleUrl: './admin-layouts.component.css'
})
export class AdminLayoutsComponent {

}
