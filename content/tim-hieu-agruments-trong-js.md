---
title: Tìm hiểu về Agruments trong javascript
date: 2020-06-05 21:32:32
description: 'aaaa'
thumbnail: './images/floppylogo.png'
tags:
  - tips
hidden: true
categories:
  - Popular
template: post
released: false
---

# Lời nói đầu

Xin chào các bạn, đây là một trong những bài viết đầu tiên của mình trong blog cá nhân, nếu có sai sót thì mong mọi người góp ý nhiệt tình ^^

Mọi thắc mắc và đóng góp, mọi người gửi vào hòm mail cá nhân của mình nhé **cuong.nguyenhuu1997@gmail.com**

# Agruments là gì

Đầu tiên agruments là gì?
Javascript cung cấp một biến cục bộ với tên “arguments” chứa các tham số được truyền vào hàm. Bạn có thể cần sử dụng đối tượng này khi muốn thực hiện các công việc xử lý tham số một cách linh động bên trong hàm. Hãy nhìn ví dụ bên dưới

```js
function func1(a, b, c) {
  console.log(arguments[0]);
  // expected output: 1

  console.log(arguments[1]);
  // expected output: 2

  console.log(arguments[2]);
  // expected output: 3
}

func1(1, 2, 3);
```

*source: developer.mozilla.org*

Qua đoạn code trên chúng ta có thể nhìn thấy điều đặc biệt là arguments không phải là mảng nhưng có thể truy xuất bằng index như mảng?? Thật kỳ lạ phải không?

Bởi agruments là một kiểu dữ kiệu đặc biệt: **Array-like object** (Object tựa mảng), các bạn có thể tìm hiểu thêm về kiểu dữ liệu này tại [đây](https://anonystick.com/blog-developer/array-like-objects-va-generic-methods-javascript-ban-chua-he-biet-2019122620485228)

# Agruments trong function bình thường


# Arguments trong fat arrow function

# Agrument trong IIFE
