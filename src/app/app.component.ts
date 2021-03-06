import { LoaderService } from './shared/services/loader.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'findingFalcon';

  constructor(
    public loaderService: LoaderService
  ) {}
}
