import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  emblem1 = 'assets/emblem2.png';
  private isBrowser: boolean;
  isVisible = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkVisibility();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkVisibility();
  }

  checkVisibility() {
    const elements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-left, .animate-fade-in-right');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight) && (rect.bottom >= 0);
      if (isVisible) {
        element.classList.add('visible');
      }
    });
  }
}
