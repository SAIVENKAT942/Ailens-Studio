import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(0)]],
    });
  }

  // Uncomment these getter methods to help with form validation in the template
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.contactForm.valid) {
      this.isLoading = true;
      try {
        // Use getRawValue() to ensure we get the actual form values
        const formData: ContactForm = this.contactForm.getRawValue();
        
        const result = await this.supabaseService.createNewContactEntry(formData);
        
        this.successMessage = 'Thank you for your message! We will get back to you soon.';
        this.contactForm.reset();
        this.submitted = false;
      } catch (error: any) {
        this.errorMessage = error.message || 'An error occurred while sending your message. Please try again.';
      } finally {
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
