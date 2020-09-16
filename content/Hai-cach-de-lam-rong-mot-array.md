---
title: Hai cách để làm rỗng một array
date: 2020-06-11 22:02:32
description: 'Vấn đề đơn giản nhưng lại bất ngờ về các cách giải quyết'
tags:
  - tips
  - javascript
categories:
  - Popular
template: post
released: true
---

# Lời nói đầu

Bạn biết bao nhiêu cách để xoá hết một phần tử ra khỏi một array?
Nếu biết hơn hãy comments bên dưới nhé.
<!--more-->

# Cách một

Đây là cách mà mọi người hay dùng nhiều nhất

```js
// define Array
var list = [1, 2, 3, 4];
function empty() {
    //empty your array
    list = [];
}
empty();
```

tất nhiên cách này vẫn sẽ hoạt động bình thường, tuy nhiên để hiệu năng tốt hơn nên sử dụng cách thứ hai

# Cách hai

```js
var list = [1, 2, 3, 4];
function empty() {
    //empty your array
    list.length = 0;
}
empty();
```

# Sự khác biệt ở đây là gì?

Trong cách một, ```List = []``` nghĩa là chúng ta đang gán một vùng nhớ mới tới biến của chúng ta. Nhưng khi đó vùng nhớ cũ, tức là đang chứa giá trị cũ của biến ```List``` không bị ảnh hưởng và nó vẫn giữ trong vùng nhớ đấy, dẫn tới dò rỉ bộ nhớ.
Với cách thứ hai, ```list.length = 0``` sẽ xoá toàn bộ vùng nhớ mà nó đang trỏ tới (thay vì gán vào vùng nhớ mới như cách 1).

Hay nói cách khác, nếu bạn có hai biến cùng tham chiếu tới cùng 1 vùng nhớ:

```js
var a1 = [1, 2, 3];
var a2 = a1;
```

Lúc này cả hai ```a1``` và ```a2``` đều tham chiếu đến một vùng nhớ. Nếu bạn gán ```a1 = []``` thì giá trị của ```a2``` không hề bị ảnh hưởng. Tuy nhiên nếu ```a1.length = 0``` thì ngay lập tức cả a1 và a2 đều có giá trị là mảng rỗng.
Hãy nhìn một ví dụ rõ ràng hơn nhé:

```js
var foo = [1,2,3];
var bar = [1,2,3];
var foo2 = foo;
var bar2 = bar;
foo = [];
bar.length = 0;
console.log(foo, bar, foo2, bar2);

// [] [] [1, 2, 3] []
```

# Kết Luận

Mỗi cách sẽ đều có mục đích riêng, các bạn nên làm cẩn thận, đặc biệt là cách thứ hai, chúng ta đôi lúc sẽ không hiểu tại sao mảng lại thay đổi dù bản thân không tác động trực tiếp.
Thú vị lắm phải không? Một vấn đề tưởng chừng đơn giản nhưng nếu phân tích kỹ hơn thì nó lại có khá nhiều điều mới mẻ mà chính bản thân chúng ta không ngờ tới.
