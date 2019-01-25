import colorette from 'colorette';
import IFragment from './IFragment';
import { buildChildren, toArray } from './utils';

export type AnsiColor =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'brightBlack'
  | 'brightRed'
  | 'brightGreen'
  | 'brightYellow'
  | 'brightBlue'
  | 'brightMagenta'
  | 'brightCyan'
  | 'brightWhite'
  | 'gray'
  | 'bgBlack'
  | 'bgRed'
  | 'bgGreen'
  | 'bgYellow'
  | 'bgBlue'
  | 'bgMagenta'
  | 'bgCyan'
  | 'bgWhite'
  | 'bgBrightBlack'
  | 'bgBrightRed'
  | 'bgBrightGreen'
  | 'bgBrightYellow'
  | 'bgBrightBlue'
  | 'bgBrightMagenta'
  | 'bgBrightCyan'
  | 'bgBrightWhite'
  | 'none';

export function color(
  ansiColor: AnsiColor,
  ...children: Array<string | IFragment>
): Color {
  return new Color(ansiColor, toArray(children));
}

export class Color implements IFragment {
  private readonly color: AnsiColor;
  private readonly children: Array<string | IFragment>;

  constructor(ansiColor: AnsiColor, children: Array<string | IFragment>) {
    this.color = ansiColor;
    this.children = children;
  }

  build(): string {
    const children = buildChildren(this.children);

    if (this.color === 'none') {
      return children;
    } else if (this.color in colorette) {
      // tslint:disable-next-line: no-unsafe-any no-any
      return (colorette as any)[this.color](children);
    }

    throw new Error(`Color ${this.color} not found`);
  }
}
