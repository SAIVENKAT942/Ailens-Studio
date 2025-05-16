import { Injectable, NgZone } from '@angular/core'
import { environment } from '../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface contactForm {
  id?: string
  name: string
  email: string
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private readonly TABLE_NAME = 'contact';

  constructor(private ngZone: NgZone) {
    this.supabase = this.ngZone.runOutsideAngular(() =>
      createClient(environment.supabaseUrl, environment.supabaseKey)
    );
  }

  // Create a new contact form entry
  async createNewContactEntry(form: contactForm) {
    try {
      // console.log('Attempting to insert into table:', this.TABLE_NAME);
      // console.log('Form data:', form);
      
      const { data, error } = await this.supabase
        .from(this.TABLE_NAME)
        .insert([form])
        .select();
      
      if (error) {
        // console.error('Supabase error details:', error);
        throw error;
      }
      
      // console.log('Insert successful, data:', data);
      return data;
    } catch (error: any) {
      // console.error('Detailed error in createContactForm:', error);
      throw new Error(error.message || 'Failed to submit contact form');
    }
  }
}