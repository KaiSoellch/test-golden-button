import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GoldenButtonComponent } from './golden-button/golden-button.component';
import { MaskedBannerComponent } from './masked-banner/masked-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    GoldenButtonComponent,
    MaskedBannerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
