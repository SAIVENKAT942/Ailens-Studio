import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductComponent } from './pages/product/product.component';
import { UsecaseComponent } from './pages/usecase/usecase.component';
import { TrialAiAgentDetailsComponent } from './pages/product-details/trial-ai-agent-details/trial-ai-agent-details.component';
import { FinsageAiDetailsComponent } from './pages/product-details/finsage-ai-details/finsage-ai-details.component';
import { SociosightAiDetailsComponent } from './pages/product-details/sociosight-ai-details/sociosight-ai-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product', component: ProductComponent },
  { path: 'usecase', component: UsecaseComponent },
  { path: 'products', component: ProductComponent },
  { path: 'product-details/trial-ai-agent', component: TrialAiAgentDetailsComponent },
  { path: 'product-details/finsage-ai', component: FinsageAiDetailsComponent },
  { path: 'product-details/sociosight-ai', component: SociosightAiDetailsComponent },
  { path: '**', redirectTo: '' }
];
