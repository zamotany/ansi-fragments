import IFragment from './IFragment';
import { buildChildren } from './utils';

export type ConditionValue = boolean | string | number | null | undefined;
export type Condition = ConditionValue | (() => ConditionValue);

export function ifElse(
  condition: Condition,
  ifTrueFragment: string | IFragment,
  elseFragment?: string | IFragment
): IfElse {
  return new IfElse(condition, ifTrueFragment, elseFragment);
}

export class IfElse implements IFragment {
  private readonly ifTrueFragment: string | IFragment;
  private readonly elseFragment?: string | IFragment;
  private readonly condition: Condition;

  constructor(
    condition: Condition,
    ifTrueFragment: string | IFragment,
    elseFragment?: string | IFragment
  ) {
    this.condition = condition;
    this.ifTrueFragment = ifTrueFragment;
    this.elseFragment = elseFragment;
  }

  build(): string {
    const value = Boolean(
      typeof this.condition === 'function' ? this.condition() : this.condition
    );

    return buildChildren([
      value ? this.ifTrueFragment : this.elseFragment || '',
    ]);
  }
}
