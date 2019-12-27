import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';

const routes: Routes  = [
	{ path: '', component: ListComponent },
	{ path: 'item/:id', component: ItemComponent },
	{ path: '**', redirectTo: '/' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule { }
