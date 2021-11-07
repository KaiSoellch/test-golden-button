import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <app-masked-banner></app-masked-banner>
    </div>
<!--
    <ul>
      <li>
        <h2><app-golden-button target="_blank" href="https://angular.io/tutorial" text="Tour of Heroes"></app-golden-button></h2>
      </li>
      <li>
        <h2><app-golden-button class="md" target="_blank" href="https://angular.io/cli" text="CLI Documentation"></app-golden-button></h2>
      </li>
      <li>
        <h2><app-golden-button class="lg" target="_blank" href="https://blog.angular.io/" text="Angular blog"></app-golden-button></h2>
      </li>
    </ul>
-->
  `,
  styles: [`
    ul { list-style: none; display: none; }
  `]
})
export class AppComponent {
  title = 'effect-test';
}
