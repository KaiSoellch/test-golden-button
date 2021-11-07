import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Dict } from '@pixi/utils';
import { Container, Loader, Application, Sprite, Rectangle, LoaderResource, filters, Graphics, SCALE_MODES, Point } from 'pixi.js';

@Component({
  selector: 'app-golden-button',
  template: `
    <a #button [target]="target" [href]="href" [innerText]="text">
    </a>
  `,
  styles: [`
    a {
      background: transparent;
      display: inline-block;
      padding: 14px 18px;
      margin: 10px auto;
      position: relative;
      text-decoration: none;
      font-weight: bold;
      color: #ffffff;
    }

    :host::ng-deep canvas {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
    `]
})
export class GoldenButtonComponent implements OnInit, AfterViewInit {

  @Input('target')
  public target: '_blank' | '_self' = '_blank';

  @Input('href')
  public href: string = '';

  @Input('text')
  public text: string = '';

  @ViewChild('button', { static: true })
  public button?: ElementRef<HTMLAnchorElement>;

  private app?: Application;
  private radius = 100;
  private blurSize = 50;
  private focus?: Sprite;

  constructor() { }

  ngAfterViewInit(): void {
    this.app = new Application({
      antialias: true,
      backgroundColor: 0xffffff,
      width: this.button?.nativeElement.clientWidth,
      height: this.button?.nativeElement.clientHeight
    });
    this.button?.nativeElement.appendChild(this.app.view);

    const lightLoader = new Loader();
    lightLoader.baseUrl = 'assets/';
    lightLoader
        .add('highlight', 'katie-harp-oZgj_nQQvuo-unsplash_600.jpeg')
        .add('bg', 'katie-harp-oZgj_nQQvuo-unsplash_600_dark.png')
        .load((loader: any, res: any) => this.onAssetsLoaded(loader, res));
  }

  onAssetsLoaded(loader: Loader, resources: Dict<LoaderResource>) {
    const wrap = new Container();
    const bg = new Sprite(resources['bg'].texture);
    wrap.addChild(bg);
    const highlight = new Sprite(resources['highlight'].texture);
    wrap.addChild(highlight);

    const circle = new Graphics()
        .beginFill(0xFF0000)
        .drawRect(this.radius + this.blurSize, this.radius + this.blurSize, this.radius, this.radius)
        .endFill();
    circle.filters = [new filters.BlurFilter(this.blurSize)];

    const bounds = new Rectangle(0, 0, (this.radius + this.blurSize) * 2, (this.radius + this.blurSize) * 2);
    const texture = this.app!.renderer.generateTexture(circle, { scaleMode: SCALE_MODES.NEAREST, resolution: 1, region: bounds });
    this.focus = new Sprite(texture);
    this.focus.position.y = -this.focus!.height / 3 * 2;
    this.focus.skew.set(0.4,0);

    wrap.addChild(this.focus);
    highlight.mask = this.focus;

    wrap.interactive = true;
    wrap.on('pointermove', (evt) => this.onPointerMove(evt));

    this.app!.stage.addChild(wrap);
  }

  ngOnInit(): void {}

  private onPointerMove(evt: any) {
    const pos: Point = evt.data.getLocalPosition(this.app!.stage.children[0]);
    this.focus!.position.x = pos.x - this.focus!.width - 20;
//    this.focus!.position.y = -this.focus!.height / 3 * 2;
  }
}
