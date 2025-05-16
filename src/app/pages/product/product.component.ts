import { Component, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

interface Product {
  id?: string;
  title: string;
  description: string;
  details: string;
  image: string;
  features?: string[];
  badge?: string;
  demoAvailable?: boolean;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements AfterViewInit {
  partnerLogos = [
    { src: 'assets/products/Clinical2.png', alt: 'Narayana Logo' },
    { src: 'assets/products/Clinical2.png', alt: 'Fluidly Logo' },
    { src: 'assets/products/Clinical2.png', alt: 'Sharani Logo' },
    { src: 'assets/products/Clinical2.png', alt: 'SpecsGenie Logo' }
  ];
  
  // Products data with enhanced information
  products: Product[] = [
    {
      id: 'trial-ai-agent',
      title: "TrialAI Agent™",
      description: "Your clinical data's smartest teammate.",
      details: "This groundbreaking solution brings natural-language automation to clinical-trial workflows—transforming how biometrics, programming, and medical teams work with SDTM data. Built for regulated speed, trusted by QA, and loved by clinical teams.",
      image: "assets/products/Clinical2.png",
      features: [
        "AI-powered SDTM automation from plain-English prompts",
        "Transparent, traceable derivation logic",
        "Validation-ready outputs (P21/CDISC compliant)",
        "Reusable pipelines in SAS, R, or Python",
        "Self-serve analytics for medical, safety & ops teams"
      ],
      badge: "FEATURED",
      demoAvailable: true
    },
    {
      id: 'finsage-ai',
      title: "FinSage AI",
      description: "Your AI Agent for Instant Financial Intelligence.",
      details: "Fast, reliable, and insight-driven – FinSage AI turns complex financial data into actionable strategies with zero manual effort. From hypothesis testing to decision-ready dashboards, it empowers your team to move from data to clarity in minutes.",
      image: "assets/products/Clinical2.png",
      features: [
        "Intelligent Hypothesis Engine",
        "Natural Language Query Support",
        "Auto-Generated Dashboards",
        "No-Code, Self-Serve Interface",
        "Enterprise-Grade Security"
      ],
      demoAvailable: true
    },
    {
      id: 'sociosight-ai',
      title: "SocioSight AI",
      description: "Your AI Agent for Unlocking Social Media Strategy.",
      details: "Smart, adaptive, and insight-rich — SocioSight AI transforms your social media data into statistically-backed insights. Understand what drives engagement, reach, and virality — all without manual analysis or guesswork.",
      image: "assets/products/Clinical2.png",
      features: [
        "Hypothesis-Driven Insight Engine",
        "Natural Language Q&A for Marketers",
        "Drag-and-Drop Dashboard Builder",
        "Multi-Platform Data Integration",
        "Instant, Statistically Validated Results"
      ],
      badge: "NEW",
      demoAvailable: false
    }
  ];
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}
  
  ngAfterViewInit() {
    // Only run in browser environment, not during server-side rendering
    if (isPlatformBrowser(this.platformId)) {
      // Use setTimeout with a longer delay to ensure DOM is fully rendered
      setTimeout(() => {
        this.setupScrollAnimation();
      }, 300); // Increased from 0 to 300ms for better reliability
    }
  }
  
  setupScrollAnimation() {
    // Select all product items
    const productItems = document.querySelectorAll('.product-item');
    
    if (productItems.length === 0) {
      // If elements aren't found, retry after a short delay
      setTimeout(() => this.setupScrollAnimation(), 500);
      return;
    }
    
    // Add initial visibility to first product to prevent blank screen
    if (productItems.length > 0) {
      const firstProduct = productItems[0];
      const firstImage = firstProduct.querySelector('.product-image');
      const firstContent = firstProduct.querySelector('.product-content');
      
      // Add animate classes with a small delay
      setTimeout(() => {
        firstProduct.classList.add('animate');
        if (firstImage) firstImage.classList.add('animate');
        if (firstContent) firstContent.classList.add('animate');
      }, 100);
    }
    
    // Create intersection observer with improved options
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Add animation class when element is in view
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Get the image and content elements
          const image = entry.target.querySelector('.product-image');
          const content = entry.target.querySelector('.product-content');
          
          if (image && content) {
            // Add animations with staggered timing
            setTimeout(() => {
              image.classList.add('animate');
            }, 150);
            
            setTimeout(() => {
              content.classList.add('animate');
            }, 300);
          }
          
          // Once animated, no need to keep observing
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: '0px 0px -100px 0px' // Trigger slightly before element comes into view
    });
    
    // Observe each product item
    productItems.forEach((item, index) => {
      // Add a slight delay for each item to create a cascade effect
      setTimeout(() => {
        observer.observe(item);
      }, index * 100);
    });
    
    // Add window resize listener to handle viewport changes
    this.handleResize();
  }
  
  @HostListener('window:resize')
  handleResize() {
    // Re-trigger animations on resize if needed
    const animatedItems = document.querySelectorAll('.product-item.animate');
    if (animatedItems.length < this.products.length) {
      // If not all items are animated, refresh the observer
      this.setupScrollAnimation();
    }
  }
  
  // Navigate to product details page
  navigateToProductDetails(product: Product) {
    // Navigate to the specific product details page based on the product ID
    this.router.navigate([`/product-details/${product.id}`]).then(() => {
      window.scrollTo(0, 0);
    });
  }
  
  // Add this method to your ProductComponent class
  navigateToContact(): void {
    // Navigate to contact page
    // If using Router:
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
