import { color } from '../Color';
import { modifier } from '../Modifier';
import { container } from '../Container';
import { pad } from '../Pad';
import { fixed } from '../Fixed';
import colorette from 'colorette';
import { ifElse } from '../IfElse';

colorette.options.enabled = true;

test('should build fragments to string', () => {
  const tree = container(
    color('red', color('bgBlack', color('none', 'Hello', pad(1), 'World'))),
    pad(2, '|'),
    modifier('bold', color('white', 'Something')),
    pad(1),
    fixed(4, 'end', 'This', 'will', color('blue', 'be trimmed')),
    pad(1),
    fixed(10, 'start', color('blue', 'nothing is awesome'))
  );

  const text = tree.build();
  const expected = `${colorette.red(
    colorette.bgBlack('Hello World')
  )}||${colorette.bold(colorette.white('Something'))} This ${colorette.blue(
    'is awesome'
  )}`;
  expect(JSON.stringify(text)).toEqual(JSON.stringify(expected));
});

test('ifElse fragment should render correct fragmnent', () => {
  expect(ifElse(true, 'Hello', 'Bye').build()).toEqual('Hello');
  expect(ifElse(1, 'Hello', 'Bye').build()).toEqual('Hello');
  expect(ifElse(undefined, 'Hello', 'Bye').build()).toEqual('Bye');
  // tslint:disable-next-line: no-null-keyword
  expect(ifElse(null, 'Hello', 'Bye').build()).toEqual('Bye');
  expect(ifElse(true, 'Hello').build()).toEqual('Hello');
  expect(ifElse(false, 'Hello').build()).toEqual('');
  expect(ifElse(() => true, 'Hello', 'Bye').build()).toEqual('Hello');
});
