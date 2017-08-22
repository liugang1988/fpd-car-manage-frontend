import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, trigger, state, style, transition, animate, HostListener, ElementRef  } from '@angular/core';

@Component( {
  selector: 'app-mit-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mit-lightbox.component.html',
  styleUrls: [ './mit-lightbox.component.scss' ],
  animations: [
    trigger( 'alertAnimate', [
      state( 'in', style( { width: 0, height: 0, opacity: 0 }) ),
      transition( 'void => *', [
        style( { width: 0, height: 0 }),
        animate( 100, style( { height: '*', width: '*', opacity: 1 }) )
      ] ),
      transition( '* => void', [
        style( { width: 0, height: 0 }),
        animate( 100, style( { width: 0, height: 0, opacity: 0 }) )
      ] )
    ] )
  ]
})
export class MitLightboxComponent implements OnInit, OnDestroy {

  @Input() images: Array<any>;

  @Input() image: string;

  @Input() col = 3;

  isExpand = false;



  constructor(private _eref: ElementRef) { }


     // 监听全局点击事件
  @HostListener( 'document:click', [ '$event.target' ] )
  public onClick( targetElement ) {
    const clickedInside = this._eref.nativeElement.contains( targetElement );
    if ( !clickedInside ) {
      this.isExpand = false;
    }
  }


  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
