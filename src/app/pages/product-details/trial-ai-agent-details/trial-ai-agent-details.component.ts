import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trial-ai-agent-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trial-ai-agent-details.component.html',
  styleUrls: ['./trial-ai-agent-details.component.scss']
})
export class TrialAiAgentDetailsComponent implements OnInit {
  private isBrowser: boolean;
  isVisible = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // You can add additional logic here if needed
    });

    if (this.isBrowser) {
      this.checkScroll();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.isBrowser) {
      this.checkScroll();
    }
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

  private checkScroll(): void {
    if (!this.isBrowser) return;

    const sections = document.querySelectorAll('.product-details-container section');
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight * 0.8;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add('visible');
      }
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }
} 