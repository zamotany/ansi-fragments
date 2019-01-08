import IFragment from './IFragment';
import { buildChildren } from './utils';

export function container(...children: Array<string | IFragment>): Container {
  return new Container(children);
}

export class Container implements IFragment {
  private readonly children: Array<string | IFragment>;

  constructor(children: Array<string | IFragment>) {
    this.children = children;
  }

  build(): string {
    return buildChildren(this.children);
  }
}
