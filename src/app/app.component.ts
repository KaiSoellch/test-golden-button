import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h2>Button Demo</h2>
      <app-golden-button target="_self" href="#" text="In den Warenkorb"></app-golden-button>
      <br>
      <app-golden-button target="_self" href="#" text="Unsere Weihnachtsgeschenke" texture="tamanna-rumee-R7A94STmdI8-unsplash-600-dark.jpeg" highlight="tamanna-rumee-R7A94STmdI8-unsplash-600.jpeg"></app-golden-button>
      <br>
      <app-golden-button target="_self" href="#" text="Zum Produkt Chili-Flocken Mild" highlight="katie-harp-SG59-rbcNRg-unsplash-600.jpeg"></app-golden-button>
      <br>
      <app-golden-button target="_self" href="#" text="In den Warenkorb" highlight="pierre-bamin-WYoByjRH0qE-unsplash-600.jpeg"></app-golden-button>
      <br>
      <app-golden-button class="umami" target="_self" href="#" text="Umami Creative" texture="luke-chesser-pJadQetzTkI-unsplash-600-dark.jpeg" highlight="luke-chesser-pJadQetzTkI-unsplash-600.jpeg"></app-golden-button>
      <app-golden-button class="umami" target="_self" href="#" text="Umami Creative" texture="gradienta-t-Rt42Wl1RQ-unsplash-600-dark.jpeg" highlight="gradienta-t-Rt42Wl1RQ-unsplash-600.jpeg"></app-golden-button>
      <app-golden-button class="umami" target="_self" href="#" text="Umami Creative" texture="luke-chesser-eICUFSeirc0-unsplash-600-dark.jpeg" highlight="luke-chesser-eICUFSeirc0-unsplash-600.jpeg"></app-golden-button>
      <br>
      <app-golden-button class="umami" target="_self" href="#" text="Umami Creative" texture="gradienta-DKDFBtmZSz8-unsplash-600-dark.jpeg" highlight="gradienta-DKDFBtmZSz8-unsplash-600.jpeg"></app-golden-button>
      <app-golden-button class="umami" target="_self" href="#" text="Umami Creative" texture="gradienta-eO5vSf3pr9I-unsplash-600-dark.jpeg" highlight="gradienta-eO5vSf3pr9I-unsplash-600.jpeg"></app-golden-button>
      <app-golden-button class="umami" target="_self" href="#" text="Umami Creative" texture="gradienta-WmTMJ3uv6dg-unsplash-600-dark.jpeg" highlight="gradienta-WmTMJ3uv6dg-unsplash-600.jpeg"></app-golden-button>
      <h2>Interactive Masked Banner</h2>
      <app-masked-banner></app-masked-banner>
      <h2>Noised Banner (auto animated)</h2>
      <app-noised-banner></app-noised-banner>
    </div>
  `,
  styles: [`
    ul { list-style: none; }
  `]
})
export class AppComponent {
  title = 'effect-test';
}
