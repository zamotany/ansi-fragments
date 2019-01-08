import IFragment from './IFragment';

export function buildChildren(children: Array<string | IFragment>): string {
  return children
    .map((child: string | IFragment) =>
      typeof child === 'string' ? child : child.build()
    )
    .join('');
}

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
