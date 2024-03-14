import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

}
