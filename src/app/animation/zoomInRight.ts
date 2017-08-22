import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const zoomInRight = trigger('zoomInRight', [
  state('in', style({ transform: 'translateX(0)' })),
  transition(':enter', [
    animate(400, keyframes([
      style({ opacity: 0, transform: 'scale3d(.1, .1, .1) translate3d(1000px, 0, 0)', offset: 0 }),
      style({ opacity: 1, transform: 'scale3d(.475, .475, .475) translate3d(-10px, 0, 0)', offset: 0.6 }),
      style({ transform: 'scale3d(1, 1, 1) translate3d(0, 0, 0)', offset: 1 })
    ]))
  ]),
  transition(':leave', [
    animate(400, keyframes([
      style({ opacity: 1, transform: 'scale3d(1, 1, 1) translate3d(0, 0, 0)', offset: 0 }),
      style({ transform: 'scale3d(.475, .475, .475) translate3d(10px, 0, 0)', offset: 0.6 }),
      style({ opacity: 0, transform: 'scale3d(.1, .1, .1) translate3d(-1000px, 0, 0)', offset: 1 })
    ]))
  ])
]);
