import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


export const fadeIn = trigger('fadeIn', [
  state('in', style({ display: 'none' })),
  transition('void => *', [
    animate(200, keyframes([
      style({ height: '0', opacity: 0, offset: 0 }),
      style({ height: '*', opacity: 1, offset: 1 })
    ]))
  ]),
  transition('* => void', [
    animate(200, keyframes([
      style({ height: '*', opacity: 1, offset: 0 }),
      style({ height: '0', opacity: 0, offset: 1 })
    ]))
  ]),
]);
