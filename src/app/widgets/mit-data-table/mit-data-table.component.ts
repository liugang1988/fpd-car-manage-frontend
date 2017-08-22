import { Component, OnInit, Input, trigger, state, style, transition, animate, keyframes } from '@angular/core';


@Component( {
  selector: 'app-mit-data-table',
  templateUrl: './mit-data-table.component.html',
  styleUrls: [ './mit-data-table.component.scss' ],
  animations: [
    trigger( 'fadeIn', [
      state( 'in', style( { display: 'none' }) ),
      transition( 'void => *', [
        animate( 300, keyframes( [
          style( { opacity: 0, offset: 0 }),
          style( { opacity: 1, offset: 1 })
        ] ) )
      ] ),
      transition( '* => void', [
        animate( 300, keyframes( [
          style( { opacity: 1, offset: 0 }),
          style( { opacity: 0, offset: 1 })
        ] ) )
      ] ),
    ] )
  ]
})
export class MitDataTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
