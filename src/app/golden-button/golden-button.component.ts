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
      margin: 10px 10px;
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

  @Input('texture')
  public baseTexture: string = 'katie-harp-oZgj_nQQvuo-unsplash_600_dark.png';

  @Input('highlight')
  public highlightTexture: string = 'katie-harp-oZgj_nQQvuo-unsplash_600.jpeg';

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

    this.app.loader.baseUrl = 'assets/';
    this.app.loader
      .add(this.baseTexture)
      .add(this.highlightTexture)
      .load((loader: any, res: any) => this.onAssetsLoaded(loader, res));
  }

  onAssetsLoaded(loader: Loader, resources: Dict<LoaderResource>) {
    const wrap = new Container();
    const bg = new Sprite(resources[this.baseTexture].texture);
    wrap.addChild(bg);
    const highlight = new Sprite(resources[this.highlightTexture].texture);
    wrap.addChild(highlight);

    const widthRatio = this.app!.view.width / bg.width;
    const heightRatio = this.app!.view.height / bg.height;
    console.log(this.app!.view.width / bg.width);
    console.log(this.app!.view.height / bg.height);
    if(widthRatio > heightRatio) {
      // photo is wider than background
      bg.width *= widthRatio;
      bg.height = this.app!.view.height;
      highlight.width *= widthRatio;
      highlight.height = this.app!.view.height;
    } else {
      // photo is taller than background
      bg.width = this.app!.view.width;
      bg.height *= heightRatio;
      highlight.width = this.app!.view.width;
      highlight.height *= heightRatio;
    }

    const rect = new Graphics()
        .beginFill(0xFF00FF)
        .drawRect(0, 0, this.radius, this.app!.view.height * 1.3)
        .endFill();
    rect.filters = [new filters.BlurFilter(this.blurSize, 10, 1, 5)];

    const bounds = new Rectangle(-this.radius/2, -this.radius/2, (this.radius + this.blurSize) * 2, (this.radius + this.blurSize) * 2);
    const texture = this.app!.renderer.generateTexture(rect, { scaleMode: SCALE_MODES.NEAREST, resolution: 1, region: bounds });
    this.focus = new Sprite(texture);
    this.focus.position.y = -this.radius / 2;
    this.focus.position.x = this.app!.view.width / 2 - this.radius * 1.6;
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
    this.focus!.position.x = pos.x - this.radius * 1.6;
  }
}
