import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Dict } from '@pixi/utils';
import { Container, Loader, Application, Sprite, TilingSprite, LoaderResource } from 'pixi.js';

@Component({
  selector: 'app-noised-banner',
  template: `
    <div>
      <input type="checkbox" #maskCheck (change)="toggleMask()" id="maskCheck" />
      <label for="maskCheck">Show Mask</label>
    </div>
    <canvas #canvas></canvas>
  `,
  styles: [`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    :host::ng-deep canvas {
      width: 800px;
      aspect-ratio: 16 / 9;
    }
  `]
})
export class NoisedBannerComponent implements OnInit, AfterViewInit {

  private app?: Application;
  private focus?: TilingSprite | Sprite;
  private highlight?: Sprite;

  @ViewChild('canvas', { static: true })
  private canvas?: ElementRef<HTMLCanvasElement>;

  @ViewChild('maskCheck', { static: true })
  private maskCheck?: ElementRef<HTMLInputElement>;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    this.app = new Application({
      antialias: true,
      backgroundColor: 0xffffff,
      view: this.canvas!.nativeElement,
      width: this.el!.nativeElement.clientWidth,
      height: this.el!.nativeElement.clientHeight
    });

    this.app.loader.baseUrl = 'assets/';
    this.app.loader.add('bling_gold', 'bling_bling_gold.png');
    this.app.loader.add('bling_blue', 'bling_bling.png');
    this.app.loader.add('noise', 'noiseTexture_300-6-6.png');
    this.app.loader.load((loader, resources) => this.assetsLoaded(loader, resources));
  }

  private assetsLoaded(loader: Loader, resources: Dict<LoaderResource>) {
    const wrap = new Container();
    const bg = new Sprite(resources['bling_gold'].texture);
    wrap.addChild(bg);
    this.highlight = new Sprite(resources['bling_blue'].texture);
    wrap.addChild(this.highlight);
    wrap.width = this.app!.screen.width;
    wrap.height = this.app!.screen.height;

    // HINT: TILING DO NOT WORK WITH MASKING!
    // this.focus = new TilingSprite(resources['noise'].texture!, bg.width, bg.height);
    this.focus = new Sprite(resources['noise'].texture!);
    this.focus.position.x = -1920 * 4 + 1920;
    this.focus.width = 1920 * 4;
    this.focus.height = 1080;
    wrap.addChild(this.focus);
    this.highlight.mask = this.focus;

    this.app!.stage.addChild(wrap);

    this.app!.ticker.add(() => {
      if (this.focus!.position.x >= -6) this.focus!.position.x = -1920 * 4 + 1920;
      this.focus!.position.x += 6;
    });
  }

  toggleMask() {
    // @ts-ignore
    this.highlight!.mask = (!this.maskCheck!.nativeElement.checked) ? this.focus : null;
  }
}
