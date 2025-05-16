import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sociosight-ai-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sociosight-ai-details.component.html',
  styleUrls: ['./sociosight-ai-details.component.scss']
})
export class SociosightAiDetailsComponent implements OnInit {
  isVisible = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      // You can add additional logic here if needed
    });
  }

  goBack() {
    this.router.navigate(['/products']);
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