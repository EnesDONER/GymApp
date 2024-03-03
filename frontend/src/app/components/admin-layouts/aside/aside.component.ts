import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {

}
