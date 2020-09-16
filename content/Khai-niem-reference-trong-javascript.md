---
title: Khái niệm reference trong javascript
date: 2020-06-29 21:54:49
description: 'Khái niệm cơ bản cần biết đối với một devloper'
thumbnail: './thumbnails/js-thumb.png'
tags:
  - javascript
  - basic
categories:
  - Popular
template: post
released: true
---

# Lời nói đầu

Sau khoảng hai tuần bỏ bê blog vì đồ án, nay mình mới có thời gian viết bài trở lại. Xin lỗi các bạn vì sự chậm trễ này
Giờ vào vấn đề chính nhé.

Nếu các bạn từng học java thì chắc hẳn sẽ biết khái niệm con trỏ. Trong javacript cũng có khái niệm tương tự: references.
Tuy nhiên để rõ ràng hơn mình xin khẳng định lại trong Javascipt không hề có con trỏ và references hoạt động rất khác
Chỉ có những dữ liệu phức tạp như là Object, Array mới có thể assigned by reference.
<!--more-->

# Một vài điều cần biết

- Kiểu dữ liệu được gán vào biến sẽ quyết định áp dụng gán bởi giá trị (**assign-by-value**) hoặc là áp dụng gán bởi reference (**assign-by-reference**)
- Trong việc gán biến, các kiểu dữ liệu nguyên thuỷ (Number, String, Boolean, undefined, null, Symbol) được gọi là assigned-by-value và dữ liệu phức tạp (Object, Array) được gọi là assigned-by-reference
- Reference trong Javascript chỉ trỏ tới nơi chứa giá trị và sẽ không trỏ tới các biến hay các reference khác
- Trong Javascript các kiểu dữ liệu nguyên thuỷ không thể thay đổi và kiểu dữ liệu phức tạp có thể thay đổi

# Ví dụ về **assign-by-value**

Trong đoạn code bên dưới đây. Chúng ta sẽ gán một dữ liệu nguyên thuỷ (number) và do đó kiểu gán này sẽ là **assign-by-value**. Đầu tiên ```one``` được gán là một sau đó ```two``` được gán cho ```one```, theo đó giá trị của ```two``` đang chứa sẽ cùng giá trị của ```one```. TUY NHIÊN, phép gán này sẽ tạo ra một bản sao của giá trị của biến ```one``` và sẽ được chứa trong biến ```two``` (là một VÙNG NHỚ HOÀN TOÀN MỚI). Do đó nếu chúng ta chỉnh sửa biến ```two``` thì biến ```one``` sẽ ko thay đổi

```js
var one = 1;
var two = one;   // assign-by-value
two++;
console.log(one)     // 1
console.log(two);   // 2
```

# Ví dụ về **assign-by-reference**

Đoạn code dưới đây miêu tả gán một Array (kiểu dữ liệu phức tạp) sang một biến khác, do đó **assign-by-reference** được áp dụng.

Biến flash và quicksilver đang tham chiếu tới cùng một giá trị, còn được gọi là "shared value". Những reference sẽ cùng chỉ tới giá trị được thay đổi khi mà "shared value" bị chỉnh sửa

```js
var flash = [8,8,8];
var quicksilver = flash;   // assign-by-reference
quicksilver.push(0);
console.log(flash);        //[8,8,8,0]
console.log(quicksilver);  //[8,8,8,0]
```

# Kết luận

Hiểu rõ về reference trong Javascript giúp các developer tránh những sai lầm phổ biến và viết code tốt hơn.

Ngoài ra việc dùng reference một cách hợp lý sẽ giúp bạn tiết kiệm bộ nhớ.