---
title: Giới thiệu về HOC (Higher Order Components)
date: 2020-07-28 22:28:17
description: 'HOC được hiểu sơ qua như một nhà máy sản xuất component'
thumbnail: './thumbnails/Hoc-react-thumb.png'
tags:
 - javascript
categories:
  - Popular
template: post
released: true
---

# Lời nói đầu

Vậy là mình đã hoàn thành đồ án...
Và cũng đã bỏ bê blog tròn đúng 1 tháng :)))
Và từ hôm nay mình sẽ dừng lại viết về khái niệm cơ bản, tập trung hoàn toàn vào react (viết bằng cả typescript hoặc javascript)
Đầu tiên sẽ là giới thiệu một khái niệm nâng cao trong Javascript, đó là HOC (Higher Order Components)
<!--more-->

# Khái niệm về HOC

HOC là một design pattern, ý tưởng về pattern được hình thành nhờ các đặc tính của react. Thường được triển khai như một function.
Bạn có thể hiểu nó là một cách để "sản xuất ra một component" - ```premade component```

# Thế nào là "sản xuất component"

Để hiểu rõ hơn, bạn hãy nhìn sơ đồ sau

```ts
fnA(component) => return newComponent
```

Nghĩa là fnA nhận đầu vào là một component và đầu ra sẽ là một component mới
Component mới chứa những gì? Component mới có thể sẽ giúp chúng ta những điều sau:

- Sử dụng lại logic/ data của component mẹ (các function, properties...)
- Thêm chức năng cho component con (function, props...)

# HOC example

Đầu tiên ta có hai component sau:

Compoent hiển thị thông tin của nhân viên

```ts
import React from "react";

export default function ShowEmployeeBasicDetails(props) {
    return (
        <div>
            <p>Employee Name: {props.name}</p>
            <p>Employee Age: {props.age}</p>
            <p>Employee Designation: {props.designation}</p>
        </div>
    )
}
```

Compoent hiển thị lương của nhân viên

```ts
import React from "react";

export default function ShowEmployeeSalaryDetails(props) {
    return (
        <div>
            <p>Employee Name: {props.name}</p>
            <p>Employee Salary: {props.salary}</p>
            <p>Employee Bonus: {props.bonus}</p>
        </div>
    )
}
```

Cả hai component trên về cấu trúc là giống hệt nhau chỉ khác phần data hiển thị ở giữa. Đây là lúc HOC ra tay

Đầu tiên, chúng ta sẽ "gộp chung" data lại

```ts
function getEmployeeData() {
    return {
        name: "Mayank",
        age: 30,
        designation: "Developer",
        salary: 30000,
        bonus: 2000
    }
}
```

Kế tiếp ta sẽ viết một HOC để gộp chung hai component lại. Thậm chí chúng ta có thể thêm props cho nó

Cụ thể như sau:

```ts
import React from "react";

// function nhận vào một component và return một component mới
const HigherOrderComponent = function(WrappedComponent) {
    return class EmployeeDetailComponents extends React.Component {

        constructor() {
            super();
            // state này chứa sẽ chứa toàn bộ data của cả hai component trên
            // data này sẽ được láy từ một api, trong trường hợp này mình gỉa định data này có sẵn
            this.state = getEmployeeData();
        }

        render() {
            return (
                <div>
                    {/**
                      - Truyền dứoi dạng props cho component được "bọc"
                      - Cách viết {...this.state} bạn cứ hiểu mình truyền dưới dạng
                        <WrappedComponent  
                            name="Mayank"
                            age=30
                            designation="Developer"
                            salary=30000
                            bonus=2000
                        />
                      - thêm props ```birthday``` cho component được bọc
                    **/}
                    <WrappedComponent {...this.state} birthday: "6/3/1997" />
                </div>
            )
        }
    }
}

function getEmployeeData() {
    return {
        name: "Cuong",
        age: 23,
        designation: "Developer",
        salary: 30000,
        bonus: 2000
    }
}

// Giờ đây hai component mới sẽ có props chính là state và cũng gồm props được thêm của component mẹ
export const EmployeeBasicDetails = HigherOrderComponent(ShowEmployeeBasicDetails);
export const EmployeeSalaryDetails = HigherOrderComponent(ShowEmployeeSalaryDetails);
```

Dùng cả hai ```EmployeeBasicDetails``` và ```EmployeeSalaryDetails``` như sau:

```ts
import React from "react";
import "./styles.css";
import { EmployeeBasicDetails, EmployeeSalaryDetails } from "../src/HOC";

export default function App() {
  return (
    <div className="App">
      <EmployeeBasicDetails />
      <hr />
      <EmployeeSalaryDetails />
    </div>
  );
}
```

Bạn có thể xem demo ở [codesandbox](https://codesandbox.io/s/react-hoc-in-javascript-woq30?file=/src/App.js)

# Kết luận

HOC rất hay phải không nào, nó giúp chúng ta thuânj tiện dùng lại logic của các component giống nhau để tránh trùng lặp code

Kế tiếp mình sẽ viết bài hướng dẫn viết HOC trong typescript. Mời các bạn đón đọc

# Tham khảo

https://medium.com/technofunnel/introduction-to-reacts-higher-order-components-hocs-c42182fb634