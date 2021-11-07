import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h2>Button Demo</h2>
      <app-golden-button target="_self" href="#" text="In den Warenkorb"></app-golden-button>
      <br>
      <app-golden-button target="_self" href="#" text="Unsere Weihnachtsgeschenke"></app-golden-button>
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
