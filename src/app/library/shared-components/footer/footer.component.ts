import { Component, OnInit } from '@angular/core';
import { SocialMedia } from 'src/app/shared/constants/social.constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  social = SocialMedia;
  constructor() { }

  ngOnInit(): void {
  }

  visit(contact): void {
    window.open(contact.url, '_blank')
  }

}
