import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMatEditTableModule } from 'ngx-mat-edit-table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMatEditTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
