import { Component, ElementRef } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';


@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {



  
  
  close() {
    const sidebar = document.getElementById('offcanvas');
    if (sidebar) {
        let body = sidebar.parentElement.parentElement.parentElement.parentElement;
        body.classList.remove('sidebar-open','sidebar-mini');
        document.body.classList.add('sidebar-collapse', 'sidebar-closed');
    }
}


}
