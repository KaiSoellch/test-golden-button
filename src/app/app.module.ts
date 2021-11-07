import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GoldenButtonComponent } from './golden-button/golden-button.component';
import { MaskedBannerComponent } from './masked-banner/masked-banner.component';
import { NoisedBannerComponent } from './noised-banner/noised-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    GoldenButtonComponent,
    MaskedBannerComponent,
    NoisedBannerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
