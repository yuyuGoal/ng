import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { DockModule } from 'primeng/dock';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    DockModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('1.3s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LandingPageComponent implements OnInit {
  imgIndex = 0;
  imgSrcs = ['/assets/image/logo-dark.png', '/assets/image/logo.png'];
  constructor() {

  }

  ngOnInit() {
  }
}
