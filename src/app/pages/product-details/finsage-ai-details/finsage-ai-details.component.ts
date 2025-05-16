import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-finsage-ai-details',
  standalone: true,
  imports: [CommonModule],
    templateUrl: './finsage-ai-details.component.html',
  styleUrls: ['./finsage-ai-details.component.scss']
})
export class FinsageAiDetailsComponent implements OnInit {
  product = {
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
  };

  isVisible = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      // You can add additional logic here if needed
    });
    this.checkVisibility();
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

  goBack() {
    this.router.navigate(['/products']);
  }
} 