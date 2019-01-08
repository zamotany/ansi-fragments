import IFragment from './IFragment';
import colorette from 'colorette';
import { buildChildren, toArray } from './utils';

export type AnsiModifier =
  | 'dim'
  | 'bold'
  | 'hidden'
  | 'italic'
  | 'underline'
  | 'strikethrough';

export function modifier(
  ansiModifier: AnsiModifier,
  ...children: Array<string | IFragment>
): Modifier {
  return new Modifier(ansiModifier, toArray(children));
}

export class Modifier implements IFragment {
  private readonly modifier: AnsiModifier;
  private readonly children: Array<string | IFragment>;

  constructor(ansiModifier: AnsiModifier, children: Array<string | IFragment>) {
    this.modifier = ansiModifier;
    this.children = children;
  }

  build(): string {
    const children = buildChildren(this.children);

    if (this.modifier in colorette) {
      // tslint:disable-next-line: no-unsafe-any no-any
      return (colorette as any)[this.modifier](children);
    }

    throw new Error(`Modifier ${this.modifier} not found`);
  }
}
