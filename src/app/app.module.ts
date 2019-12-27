import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';

@NgModule({
	declarations: [
		AppComponent,
		ListComponent,
		ItemComponent,
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp'}),
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
