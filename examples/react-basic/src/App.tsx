import { SliceStore } from '@qlover/slice-store';
import { useSliceStore } from '@qlover/slice-store-react';
import './App.css';

type Value = {
  count: number;
};
class AppStore extends SliceStore<Value> {
  constructor() {
    super(() => ({ count: 1 }));
  }

  inc = () => {
    this.emit({ count: this.state.count + 1 });
  };
}

const appStore = new AppStore();

function App() {
  const { count } = useSliceStore(appStore);

  return (
    <>
      <h1>React Slice Store</h1>
      <div className="card">
        <button onClick={appStore.inc}>count is {count}</button>
      </div>
    </>
  );
}

export default App;
