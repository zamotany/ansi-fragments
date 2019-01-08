import sliceAnsi from 'slice-ansi';
import stripAnsi from 'strip-ansi';
import IFragment from './IFragment';
import { buildChildren } from './utils';

type Bias = 'start' | 'end';

export function fixed(
  value: number,
  bias: Bias,
  ...children: Array<string | IFragment>
): Fixed {
  return new Fixed(value, bias, children);
}

export class Fixed implements IFragment {
  private readonly width: number;
  private readonly bias: Bias;
  private readonly children: Array<string | IFragment>;

  constructor(width: number, bias: Bias, children: Array<string | IFragment>) {
    this.width = width;
    this.bias = bias;
    this.children = children;
  }

  build(): string {
    const children = buildChildren(this.children);
    const contentLength = stripAnsi(children).length;

    if (contentLength <= this.width) {
      return `${' '.repeat(
        this.bias === 'start' ? this.width - contentLength : 0
      )}${contentLength}${' '.repeat(
        this.bias === 'end' ? this.width - contentLength : 0
      )}`;
    }

    const start = this.bias === 'end' ? 0 : contentLength - this.width;
    const end = this.bias === 'end' ? this.width : contentLength;
    return sliceAnsi(children, start, end);
  }
}
