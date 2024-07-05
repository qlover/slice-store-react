import { renderHook, act } from '@testing-library/react-hooks';
import { useSliceStore } from '../packages/main/useSliceStore';
import { SliceStore } from '@qlover/slice-store';

class CounterStore extends SliceStore<{
  count: number;
}> {
  constructor(init = 1) {
    super(() => ({ count: init }));
  }

  increment = () => {
    this.emit({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.emit({ count: this.state.count - 1 });
  };
}

test('should use counter', () => {
  const counterStore = new CounterStore(1);
  const { result } = renderHook(() => useSliceStore(counterStore));

  expect(result.current.count).toBe(1);

  act(() => {
    counterStore.increment();
  });

  expect(result.current.count).toBe(2);

  act(() => {
    counterStore.decrement();
  });

  expect(result.current.count).toBe(1);
});

test('should initialize counter with custom initial value', () => {
  const counterStore = new CounterStore(5);
  const { result } = renderHook(() => useSliceStore(counterStore));

  expect(result.current.count).toBe(5);
});
