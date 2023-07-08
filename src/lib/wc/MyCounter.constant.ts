export type MyCounterEventDetail = {
  count: string;
};
export type MyCounterProps = {
  initialCount: string;
};

export const myCounterEventDecrement = 'my-counter:decrement' as const;
export const myCounterEventIncrement = 'my-counter:increment' as const;
