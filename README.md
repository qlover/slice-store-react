## 简介

slice-store 可以帮助您编写行为一致、在不同环境（客户端、服务器和本机）中运行且易于测试的 JavaScript 应用程序.

## 安装

```bash
npm install @qlover/slice-store-react
# or use yarn
yarn add @qlover/slice-store-react
```

## 使用示例

```tsx
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
```