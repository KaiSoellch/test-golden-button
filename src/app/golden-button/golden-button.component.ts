import { Container, Loader, Renderer, Application, Sprite, Point } from 'pixi.js';
import { Layer, Stage } from '@pixi/layers';
import { diffuseGroup, normalGroup, lightGroup, PointLight, Light, DirectionalLight, AmbientLight } from 'pixi-lights';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-golden-button',
  template: `
    <a #button [target]="target" [href]="href" [innerText]="text">
    </a>
  `,
  styles: [`
    a {
      background: transparent;
      display: block;
      width: 300px;
      padding: 10px 15px;
      margin: 0 auto;
      position: relative;
    }

    ::ng-deep canvas {
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

  constructor() { }

  ngAfterViewInit(): void {
    const app = new Application({
      antialias: true,
      width: this.button?.nativeElement.clientWidth,
      height: this.button?.nativeElement.clientHeight
    });
    this.button?.nativeElement.appendChild(app.view);

    const stage = app.stage = new Stage();
    const light = new PointLight(0xffffff, 500, 500);

    // put all layers for deferred rendering of normals
    stage.addChild(new Layer(diffuseGroup));
    stage.addChild(new Layer(normalGroup));
    stage.addChild(new Layer(lightGroup));

    const lightLoader = new Loader();
    lightLoader.baseUrl = 'assets/';
    lightLoader
        .add('bg_diffuse', 'schvfgwp_4K_Albedo.jpeg')
        .add('bg_normal', '30_W_GLOSSY_SWIPES_Normal.jpeg')
        .load((loader: any, res: any) => this.onAssetsLoaded(loader, res, light, stage));
  }

  onAssetsLoaded(loader: Loader, res: any, light: Light, stage: Stage) {
    const bg = this.createPair(res.bg_diffuse.texture, res.bg_normal.texture);

    light.position.set(100, 160);
    stage.addChild(bg);

    stage.addChild(new AmbientLight(0x4d4d59, 2));
    stage.addChild(new DirectionalLight(0x4d4d59, 1, new Point(50, 50)));
    stage.addChild(light);

    bg.interactive = true;
    bg.on('mousemove', (event) => {
        light.position.copyFrom(event.data.global);
    });
  }

  createPair(diffuseTex: any, normalTex: any) {
    const container = new Container();
    const diffuseSprite = new Sprite(diffuseTex);
    diffuseSprite.parentGroup = diffuseGroup;
    const normalSprite = new Sprite(normalTex);
    normalSprite.parentGroup = normalGroup;
    container.addChild(diffuseSprite);
    container.addChild(normalSprite);
    container.width = this.button?.nativeElement.clientWidth!;
    container.height = this.button?.nativeElement.clientHeight!;
    return container;
  }

  ngOnInit(): void {}

}
