---
title: Mobx - Quản lý state trong React - Part 1
date: 2020-08-09 15:19:24
description: 'Giải pháp cho quản lý state trong react'
thumbnail: './thumbnails/mobx-thumbnail.png'
tags:
  - react
  - mobx
template: post
released: true
---

# Lời nói đầu

Nếu bạn các bạn học tập và làm việc với react sẽ làm việc với *state* thường xuyên. Đào sâu hơn sẽ là khái niệm *state management*.
Bài này mình sẽ giới thiệu về Mobx, một thư viện để quản lý state, mời các bạn đón đọc.

# Tại sao lại cần quản lý state?

Thông thường trong react, nếu muốn truyền dữ liệu của thằng cha xuống thằng con chúng ta thường xuyên phải truyền props. bạn hãy tưởng tượng. Chúng ta có một component cha cực lớn bao gồm n component con, trường hợp tệ nhất ta phải truyền n props xuống n component con. Thật sự ác mộng phải không? Vì thế việc quản lý state sao cho hợp lý đã được tính toán. Trong đó có hai thư viện cực nổi tiếng đó là **Mobx** và **Redux**.
<!--more-->

# Tại sao mình lại chọn Mobx để giới thiệu cho các bạn

Mình đã từng làm việc cùng redux khá nhiều và cảm thấy code khá nhì nhằng, có nhiều khái niệm khó hiểu cho những người mới học. Một thời gian sau mình biết đến Mobx và phải thốt lên là tại sao mình lại không học Mobx trước nhỉ, bởi đơn giản là Mobx học dễ nhiểu hơn nhiều. Vì thế mình muốn các bạn tiếp cận Mobx trước. Nhưng điều đó không có nghĩa là mình bỏ qua Redux, có lẽ tuần sau mình sẽ viết redux, mong các bạn đón đọc nha.

# Mobx là gì?

MobX rất đơn giản, có thể mở rộng (scalable) và là một giải pháp để quản lý trạng thái (state management). MobX là một thư viện độc lập, nhưng hầu hết mọi người sử dụng nó với React và hướng dẫn sau sẽ tập trung vào sự kết hợp đó.

# Những điều cần lưu ý khi dùng Mobx

Mobx là mutable, có nghĩa là chúng ta sẽ thay đổi hoàn toàn trực tiếp, thay vì immutable như Redux.
Code của Mobx cực ngắn và dễ hiểu.

# Mobx trong react

Trang chủ [mobx-react](https://mobx-react.js.org/) chỉ hướng dẫn chúng ta viết mobx với function component tuy nhiên với class component cũng tương tự như vậy.
Dưới đây mình sẽ giới thiệu các hàm, các chức năng cơ bản của Mobx.

## Observable

Giá trị observable có thể là primitives values (number, string, boolean, null, undefined), reference values (array, objects, function), plain object, class instance, ES6 Map, Set,… Nó là những giá trị mà component sẽ quan sát để biết có nên re-render hay không? Các bạn có thể tìm hiểu thêm về nó thông qua https://mobx.js.org/refguide/observable.html.

```ts
// Có hai cách viết như sau

// Theo doi mot mang
const list = observable([1,2,3,4])
list[2] = 5

// Thay doi mot property cua object
class Todo {
  @observable title = 'Mua banh mi';
}
const TODO = new Todo();
TODO.title = 'Da mua banh mi';

// Hoac la
const person = observable({
    firstName: "Clive Staples",
    lastName: "Lewis",
})
person.firstName = "C.S."
```

Tất cả đều là mutate trực tiếp vào chính object (hoặc mảng).

## Observer

Chắc là nhiều bạn sẽ nhầm lẫn với observable bên trên. Nhìn thì nó viết tương tự nhau nhưng chức năng của nó thì hoàn toàn không liên quan gì nhau.
Trong khi Observable là đại diện cho các giá trị được component quan sát thì Observer là một HOC hay decorator subscribes mà giúp cho component có khả năng quan sát. Kết quả là, component sẽ tự động được render khi những giá trị observables liên quan thay đổi. Ở đây, có 2 packages cho phép sử dụng observer.
mobx-react: chỉ hỗ trợ cho class component.
mobx-react-lite: chỉ hỗ trợ cho functional component và kích thước cũng nhỏ hơn rất nhiều.

## Tạo một component với observer

Chúng ta có 3 cách để observer một component

- 😎 [observer HOC](https://mobx-react.js.org/observer-hoc) (tốt và phổ biến nhất)

- 🤓 [observer component](https://mobx-react.js.org/observer-component)

- 🧐 [useObserver hook](https://mobx-react.js.org/observer-hook)

```ts
import { observable } from 'mobx'
import { Observer, useObserver, observer } from 'mobx-react' // 6.x or mobx-react-lite@1.4.0
import ReactDOM from 'react-dom'

// tạo một dữ liệu observable
const person = observable({
  name: 'John',
})

// observer HOC: Observer cả function component
const P1 = observer(function P1({ person }) {
  return <h1>{person.name}</h1>
})

// observer component: chỉ observer cho component con nằm bên trong
const P2 = ({ person }) => (
  <>
    <p>{person.name} dont want to change my name</p> // sẽ không thay đổi vì không được observer
    <Observer>{() => <h1>{person.name} will change to new name</h1>}</Observer> // thay đổi
  </>
)

// useObserver hook - trả về một component mới được observer
const P3 = ({ person }) => {
  return useObserver(() => <h1>{person.name}</h1>)
}

const DetailPerson = () => (
  <>
    <P1 person={person} />
    <P2 person={person} />
    <P3 person={person} />
  </>
)

// Sau 3 giây chúng ta sẽ thay đổi dữ liệu của person
setTimeout(() => {
  person.name = 'Jane'
}, 1000)

```

Bạn có thể edit [code sanbox](https://codesandbox.io/s/4qrv105l47?fontsize=14)

## Cấu trúc của mobx nên viết trong react

Theo như mobx team khuyên dùng chúng ta nên sử dụng react context để truyền store.
Chúng ta nên viết một file riêng chứa toàn bộ dữ liệu observable (mình sẽ gọi là **store.ts**), trong file này mình sẽ định nghĩa một **rootStore** (sẽ truyền cái này qua component **Provider**) và một hàm **useStore** (sẽ trả về store). Component nào cần dùng store mình sẽ import **useStore** vào. Để hiểu chi tiết hơn các bạn xem ví dụ bên dưới

```ts
// store.ts
import { createContext, useContext } from "react";
import { observable, action } from 'mobx';

class Todo {
  @observable title = 'Mua banh mi';

  @action // chỉ có action mới có thể modify observable state
  changeTitle = () => {
    this.title = 'Da mua banh my'
  }

  // changeTitle co the viet lai nhu sau
  //  @action.bound
  //  changeTitle() {
  //    this.title = 'Da mua banh my'
  //  }
}

export const rootStore = {
  todoStore: new Todo()
};

export type TRootStore = typeof rootStore;
const RootStoreContext = createContext<null | TRootStore>(null);

// Tạo ra provider để cung cấp store cho toàn bộ app
// dung trong file index.tsx
export const Provider = RootStoreContext.Provider;

/** tra lai store, chi dung o function component */
export function useStore() {
  /** store này sẽ chứa toàn bộ data */
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}

```

chú ý decorator ```@action```, từ đầu đến gờ mỗi ví dụ nếu muốn thay đổi giá trị của dữ liệu observable, ta đều phải mutate trưc tiếp, như là ```person.name = 'Jane'```. Ngoài ra còn một cách khác để thay đổi chính là dùng ```@action```

```ts
// index.tsx
import * as React from "react";
import { render } from "react-dom";
import { Provider, rootStore } from "./store";

const rootElement = document.getElementById("root");
/** Truyen store vao thong qua provider */
render(
  <Provider value={rootStore}>
    <App />
  </Provider>,
  rootElement
);
```

```ts
// Todo.tsx
import { observer } from 'mobx'
import { Observer, useObserver, observer } from 'mobx-react-lite'
import ReactDOM from 'react-dom'
import React from 'react'

// import store
import { useStore } from './store';

export const Todo = observer(() => {
  const { todoStore } = useStore();
  return (
    <>
      <p>title: {todoStore.title}</p>
      <button onClick={todoStore.changeTitle}>Click to change title</button>
    </>
  )
});

```

## Lưu ý về *inject*

Một số bạn search google sẽ có nhiều example dùng decorator ``@inject`` và component ```Provider``` (**Provider** này khác với **Provider** mình viết ở trên nhé, Provider này import từ **mobx**). Dùng inject là không sai, tuy nhiên mobx team là khuyên không nên dùng (tại sao lại thế thì mình cũng không rõ). Tuy nhiên họ khuyên không dùng thì tốt nhất là không nên dùng. Một là mình sử dụng React context, mà mình viết ở trên (xem thêm ở [đây](https://mobx-react.js.org/recipes-migration)), hai là import thẳng store vào component có nhu cầu sử dụng

# Kết luận

Part 1 mình đã nói tổng thể cách để tạo ra một store và làm thế nào để component có thể theo dõi cũng như thay đổi store. Phần hai mình sẽ viết về một số function khác để có thể tracking dữ liệu observable như là ```autorun, when...```. Các bạn có thể tham khảo trước tại [trang chủ mobx](https://mobx.js.org/refguide/autorun.html)

# Nguồn tham khảo

- [viblo](https://viblo.asia/p/gioi-thieu-ve-mobx-va-react-trong-muoi-phut-bJzKmyrEK9N)
- [Medium](https://medium.com/@huynhtrongthoai/mobx-c%C3%B3-th%E1%BA%ADt-s%E1%BB%B1-t%E1%BB%91t-%C4%91%E1%BB%83-thay-th%E1%BA%BF-cho-redux-part-1-433fd8a02b2c)
