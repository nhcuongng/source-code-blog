---
title: mot vai dieu can luu y ve render trong react
date: 2020-07-01 21:50:41
description: 'aaaa'
thumbnail: './images/floppylogo.png'
tags:
  - render react
hidden: true
categories:
  - Popular
template: post
released: false
---

Component chi render khi mà state chỉ nó thay đổi, state có thể thay đổi dựa theo props hoặc là gọi trực tiếp trong setState

Khi đó component sẽ gọi lại hàm render để update DOM

Thuộc tính key bắt component re-mounting (ta ca life cycle se chay lai - didmount, unount ...)
Khi state component cha thay đổi thì component con cũng sẽ re render dù cho key vẫn như thế
Không nên dùng index trong array làm key bởi khi xoá một phần tử thì 'chỉ update nội dung' nhưng thực tế key tại vị trí đấy không đấy ko thay đổi

Dùng should component update để kiểm soát việc render của react