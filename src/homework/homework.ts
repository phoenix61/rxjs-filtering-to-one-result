import { last, min, find, map } from 'rxjs/operators';
import { from, fromEvent } from 'rxjs';

import { run } from '../utils';

// Создайте поток событий клик по документу. Зафиксируйтe клик на кнопке "Run".
// ID кнопки "runBtn"
export function findOperatorExample() {
  const source$ = fromEvent(document, 'click');
  const stream$ = source$.pipe(
    // или можно просто find((event: any) => ...)
    find((event: MouseEvent) => (event.target as HTMLElement).id === 'runBtn')
    // или используя first()
    // first((event: MouseEvent) => (event.target as HTMLElement).id === 'runBtn')
  );

  // run(stream$, { outputMethod: 'console'});
}

// Создайте поток слов из предложения '7 раз отмерь, 1 раз отрежь'. Найдите последнюю входящую в него цифру.
export function lastOperatorExample() {
  const string = '7 раз отмерь, 1 раз отрежь';
  const source$ = from(string.split(' '));
  const stream$ = source$.pipe(
    // до этого семинара я бы тут filter() использовал
    // он, вроде как, нагляднее делает прербразовние потока
    last((entry) => !isNaN(parseInt(entry)))
  );

  // run(stream$);
}

// Создайте поток слов из предложения 'Мягкое слово кости не ломит'. Найдите минимальную длину слова в предложении.
export function minOperatorExample() {
  const string = 'Мягкое слово кости не ломит';
  const source$ = from(string.split(' '));
  const stream$ = source$.pipe(
      map((word) => word.length), // или сделать map не этапе создания массива (методом массива)
      min()
    );

  // run(stream$);
}

