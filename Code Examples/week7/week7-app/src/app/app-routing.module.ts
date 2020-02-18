import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AttributeBindingComponent } from './attribute-binding/attribute-binding.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DirectivesComponent } from './directives/directives.component';
import { EventsComponent } from './events/events.component';


const routes: Routes = [
{ path: 'home', component: HomeComponent },
{ path: 'attributeBinding', component: AttributeBindingComponent },
{ path: 'directives', component: DirectivesComponent },
{ path: 'events', component: EventsComponent},
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
