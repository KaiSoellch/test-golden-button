import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Dict } from '@pixi/utils';
import { Container, Loader, Application, Sprite, Rectangle, LoaderResource, filters, Graphics, SCALE_MODES, Point } from 'pixi.js';

@Component({
  selector: 'app-masked-banner',
  template: `
    <canvas #canvas></canvas>
  `,
  styles: [`
    :host {
      position: relative;
      display: flex;
      justify-content: center;
    }

    :host::ng-deep canvas {
      width: 800px;
      aspect-ratio: 16 / 9;
    }
  `]
})
export class MaskedBannerComponent implements OnInit, AfterViewInit {

  private app?: Application;
  private radius = 400;
  private blurSize = 96;
  private focus?: Sprite;

  @ViewChild('canvas', { static: true })
  private canvas?: ElementRef<HTMLCanvasElement>;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    this.app = new Application({
      antialias: true,
      view: this.canvas!.nativeElement,
      width: this.el!.nativeElement.clientWidth,
      height: this.el!.nativeElement.clientHeight
    });

    this.app.loader.baseUrl = 'assets/';
    this.app.loader.add('bling_gold', 'bling_bling_gold.png');
    this.app.loader.add('bling_blue', 'bling_bling.png');
    this.app.loader.load((loader, resources) => this.assetsLoaded(loader, resources));
  }

  private assetsLoaded(loader: Loader, resources: Dict<LoaderResource>) {
    const wrap = new Container();
    const bg = new Sprite(resources['bling_gold'].texture);
    wrap.addChild(bg);
    const highlight = new Sprite(resources['bling_blue'].texture);
    wrap.addChild(highlight);

    const circle = new Graphics()
        .beginFill(0xFF0000)
        .drawCircle(this.radius + this.blurSize, this.radius + this.blurSize, this.radius)
        .endFill();
    circle.filters = [new filters.BlurFilter(this.blurSize)];

    const bounds = new Rectangle(0, 0, (this.radius + this.blurSize) * 2, (this.radius + this.blurSize) * 2);
    const texture = this.app!.renderer.generateTexture(circle, { scaleMode: SCALE_MODES.NEAREST, resolution: 1, region: bounds });
    this.focus = new Sprite(texture);

    wrap.addChild(this.focus);
    highlight.mask = this.focus;

    wrap.width = this.app!.screen.width;
    wrap.height = this.app!.screen.height;

    wrap.interactive = true;
    wrap.on('mousemove', (evt) => this.onPointerMove(evt));

    this.app!.stage.addChild(wrap);
  }

  private onPointerMove(evt: any) {
    const pos: Point = evt.data.getLocalPosition(this.app!.stage.children[0]);
    this.focus!.position.x = pos.x - this.focus!.width / 2;
    this.focus!.position.y = pos.y - this.focus!.height / 2;
  }

}
