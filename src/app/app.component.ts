import { LoadingService } from './loading/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoadingService],
})
export class AppComponent {
  title = 'myapp';
}
