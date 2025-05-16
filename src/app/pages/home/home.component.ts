import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  title = 'Business Transformation Starts with AI Innovation';
  heroBackgroundImage = '/assets/hero.png';
  overlayOpacity = 0;
  
  private isBrowser: boolean;
  private lastScrollTop = 0; // Track last scroll position
  private scrollDirection = 'down'; // Track scroll direction
  
  partnerLogos = [
    { src: 'assets/logos/Narayana.png', alt: 'Narayana Logo' },
    { src: 'assets/logos/fluidly.webp', alt: 'Fluidly Logo' },
    { src: 'assets/logos/Sharani.png', alt: 'Sharani Logo' },
    { src: 'assets/logos/SpecsGenie.png', alt: 'SpecsGenie Logo' }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Only run in browser environment
    if (this.isBrowser) {
      // Initial check for elements in viewport
      this.checkProductsInView();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.isBrowser) {
      this.determineScrollDirection();
      this.checkProductsInView();
      this.updateHeroBlur();
    }
  }

  determineScrollDirection() {
    if (!this.isBrowser) return;
    
    const st = window.pageYOffset || document.documentElement.scrollTop;
    this.scrollDirection = st > this.lastScrollTop ? 'down' : 'up';
    this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }

  checkProductsInView() {
    if (!this.isBrowser) return;
    
    const productsContainer = document.getElementById('productImagesContainer');
    
    if (productsContainer) {
      const rect = productsContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Calculate how far the element is in the viewport (as a percentage)
      const visibilityPercentage = 1 - (rect.top / windowHeight);
      
      // Remove previous classes
      productsContainer.classList.remove('expanded', 'collapsed', 'entering', 'exiting');
      
      if (visibilityPercentage > 0.2 && visibilityPercentage < 0.9) {
        // Element is well within the viewport
        productsContainer.classList.add('expanded');
        
        // Add direction-specific class
        if (this.scrollDirection === 'down') {
          productsContainer.classList.add('scrolling-down');
          productsContainer.classList.remove('scrolling-up');
        } else {
          productsContainer.classList.add('scrolling-up');
          productsContainer.classList.remove('scrolling-down');
        }
      } else if (visibilityPercentage >= 0 && visibilityPercentage <= 0.2) {
        // Element is just entering the viewport
        productsContainer.classList.add('entering');
      } else if (visibilityPercentage >= 0.9 && visibilityPercentage <= 1) {
        // Element is about to exit the viewport
        productsContainer.classList.add('exiting');
      } else {
        // Element is not in viewport
        productsContainer.classList.add('collapsed');
      }
    }
  }

  updateHeroBlur() {
    if (!this.isBrowser) return;
    
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const heroSection = document.querySelector('.hero-section') as HTMLElement;
    const viewportHeight = window.innerHeight;
    
    // Start blur effect as soon as user starts scrolling
    if (heroSection) {
      // Calculate blur amount (0 to 8px) based on scroll position
      // Start blur at the beginning of scroll and reach max at 80% of viewport height
      const scrollProgress = Math.min(scrollPosition / (viewportHeight * 0.8), 1);
      const blurAmount = scrollProgress * 8;
      
      // Apply blur directly with style
      heroSection.style.filter = `blur(${blurAmount}px)`;
      
      // Also increase overlay opacity for better text contrast
      this.overlayOpacity = scrollProgress * 0.7;
    }
  }
}
