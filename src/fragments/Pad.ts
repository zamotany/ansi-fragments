import IFragment from './IFragment';

export function pad(count: number, separator?: string): Pad {
  return new Pad(count, separator);
}

export class Pad implements IFragment {
  private readonly count: number;
  private readonly separator: string;

  constructor(count: number, separator: string = ' ') {
    this.count = count;
    this.separator = separator;
  }

  build(): string {
    return this.separator.repeat(this.count);
  }
}
