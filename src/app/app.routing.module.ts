import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { DetallesComponent } from './components/detalles/detalles.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'detalles/:name/:id', component: DetallesComponent },
	{ path: '**', component: HomeComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }