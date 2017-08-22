import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';



export const rotateIn = trigger('rotateIn', [
  state('in', style({ display: 'none' })),
  transition(':enter', [
    animate(1000, keyframes([
      style({ opacity: 0, transformOrigin: 'center', transform: 'rotate3d(0, 0, 1, -200deg)', offset: 0 }),
      style({ opacity: 1, transformOrigin: 'center', transform: 'rotate3d(0, 0, 1, 0deg)', offset: 1 })
    ]))
  ]),
  transition(':leave', [
    animate(1000, keyframes([
      style({ opacity: 0, transformOrigin: 'center', transform: 'rotate3d(0, 0, 1, -200deg)', offset: 0 }),
      style({ opacity: 1, transformOrigin: 'center', transform: 'rotate3d(0, 0, 1, 0deg)', offset: 1 })
    ]))
  ])
]);
