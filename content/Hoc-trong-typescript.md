---
title: Hoc (Higher Order Components) trong typescript
date: 2020-08-02 10:13:32
description: 'HOC được hiểu sơ qua như một nhà máy sản xuất component'
thumbnail: './thumbnails/Hoc-react-thumb.png'
tags:
  - typescript
  - react
template: post
released: true
---

# Lời nói đầu

Xin chào các bạn, bài viết trước mình đã nói qua về HOC trong Javascript. Tuy nhiên HOC sẽ được viết như nào trong Typescript

# Yêu cầu kiến thức cần có

- Javascript và cũng như chút hiểu biết về HOC trong js ([tìm hiểu](https://nhcuongng.github.io/2020/07/28/Gioi-thieu-ve-HOC/))
- Typescrip và ý nghĩa của nó. Đặc biệt trong bài này là ```Generic class``` ([tìm hiểu](https://viblo.asia/p/typescript-generics-63vKjwdMZ2R))
<!--more-->

*NOTE: Sắp tới mình sẽ viết về **Generic***

# Hãy bắt đầu thông qua một số mục đích của HOC

## *Tiêm* props mới vào component con

Đôi khi bạn muốn *tiêm* thêm prop từ một nơi nào đó, từ một **global store** (redux hoặc mobx), hoặc một **provider**. Và không muốn cứ truyền đi truyền lại props. **Context** là một lựa chọn tuyệt vời, NHƯNG những giá trị được truyền từ context chỉ được dùng trong **render** function. HOC sẽ cung cấp các giá trị đấy như là các props

Đầu tiên chúng ta sẽ định nghĩa cho inject props

```ts
interface WithThemeProps {
  primaryColor: string;
}
```

Tiếp theo chúng ta viết một HOC như sau để dùng ```WithThemeProps``` mà chúng ta định nghĩa ở trên

```ts
/**
 * T là generic type đại diện cho type props của component con
 *
 * T extends WithThemeProps nghĩa là types của props
 * con sẽ được mở rộng thêm bởi interface đã định nghĩa ở trên
 *
 * Do T mở rộng từ WithThemeProps sẽ ràng buộc cho prop truyền vào phải
 * có một prop là primaryColor
*/
export function withTheme<T extends WithThemeProps = WithThemeProps>(
  WrappedComponent: React.ComponentType<T> // Nhận vào một component (có thể là hook hoặc class với type là T)
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Ở đây chúng ta tạo ra một component mới, và việc ```premade component``` sẽ được tiến hành ở đây
  // Component mới có type của prop là T - đây là bước chúng ta gộp type của component con và HOC vào với nhau
  const ComponentWithTheme = (props: T) => {
    // Tiếp theo chúng ta có thể fecth dữ liệu hoặc truyền một giá trị props sẽ được thêm vào
    const themeProps = { injectedProp: "injected" };

    // Truyền prop được tiêm và prop được gộp lại
    return <WrappedComponent {...themeProps} {...(props as T)} />;
  };

  ComponentWithTheme.displayName = `withTheme(${displayName})`;

  return ComponentWithTheme;
}
```

Kế đó chúng ta định nghĩa một một component ```Button``` và dùng HOC đã viết ở trên bọc ngoài

```ts
interface Props extends WithThemeProps {
  children: React.ReactNode;
}

class MyButton extends React.Component<Props> {
  render() {
    return (
      <>
        <button style={{ color: this.props.primaryColor }}>
          Button with color
        </button>
        <p>this Component is injected props: {this.props.injectedProp}</p>
      </>
    );
  }

  private someInternalMethod() {
    // The theme values are also available as props here.
  }
}

export default withTheme(MyButton);
```

Dùng như sau

```ts
// Lỗi: yêu cầu prop primaryColor
<ButtonWithTheme>This is a button</ButtonWithTheme>
// ok
<ButtonWithTheme primaryColor="red">This is a button</ButtonWithTheme>
```

## Exclude một prop được chỉ định

Có hai component như sau:

```ts
type DogProps {
  name: string
  owner: string
}
function Dog({name, owner}: DogProps) {
  return <div> Woof: {name}, Owner: {owner}</div>
}
```

```ts
type CatProps = {
  lives: number;
  owner: string;
};
function Cat({ lives, owner }: CatProps) {
  return (
    <div>
      {" "}
      Meow: {lives}, Owner: {owner}
    </div>
  );
}
```

Các bạn để ý là cả hai component trên đều có props là **owner**. Mỗi lần dùng component chúng ta đều phải viết như sau

```ts
<Dog name="fido" owner="swyx" />
<Cat lives={9} owner="swyx" />
```

Cách viết trên khiến việc trùng lặp code diễn ra thường xuyên, đã đến lúc HOC ra tay

```ts
/**
 * Thú thật code này khó hiểu vãi beep =)))
 * - function withOwner sẽ nhận vào một biến owner và trả lại một function mới
 * - function mới này lại return lại một component :)))
*/
function withOwner(owner: string) {
  return function <T extends { owner: string }>( // (1)
    Component: React.ComponentType<T>
  ) {
    return function (props: Omit<T, "owner">): JSX.Element { // (2)
      const newProps = { ...props, owner } as T; // (3)
      return <Component {...newProps} />;
    };
  };
}
```

(1) Đây là một Generic function
(2) ```Omit``` là ```Utility Types``` mà TS cung cấp để loại bỏ một type chỉ định. Việc loại bỏ như này sẽ cấm component mới không được nhận props là ```owner```
(3) Gộp props component con với biến ```owner``` truyền vào ở trên

Cách dùng HOC trên như sau

```ts
const OwnedCat = withOwner("Cuong")(Cat);
<OwnedCat lives={9} owner="swyx" />; // typeError
<OwnedCat lives={9} />; // OK

const OwnedDog = withOwner("John")(Dog);
<OwnedDog name="fido" owner="swyx" />; // typeError
<OwnedDog name="fido" />; // OK
```

# Codesanboxes

Để tiện cho các bạn đọc và thực hành cũng như tìm hiểu, mình đã chuẩn bị [codesandbox](https://codesandbox.io/s/react-hoc-in-typescript-k6uqu?file=/src/HOC/withOwner.tsx)

# Kết luận

Vậy là mình đã nói qua về HOC trong Typescript. Mỗi các viết đều có cái hay riêng. Tuy nhiên đặc điểm chung là cả hai đều rất khó học :)).
Mình sẽ không ngạc nhiên nếu mọi người không hiểu :3

# Nguồn

https://react-typescript-cheatsheet.netlify.app/docs/hoc/intro
