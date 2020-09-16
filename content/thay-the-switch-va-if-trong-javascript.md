---
title: Switch và if, làm thế nào để thay thế những thứ tưởng không thay thế được?
date: 2020-06-05 22:33:54
description: 'Chúng ta thường rất hay dùng chúng nhưng liệu có cách nào khác?'
thumbnail: './thumbnails/js-thumb.png'
tags: 
  - javascript
  - fundamentals
categories:
  - Popular
template: post
released: true
---

# Lời nói đầu

Xin chào các bạn, đây là một trong những bài viết đầu tiên của mình trong blog cá nhân, nếu có sai sót thì mong mọi người góp ý nhiệt tình ^^
Mọi thắc mắc và đóng góp, mọi người gửi vào hòm mail cá nhân của mình nhé **cuong.nguyenhuu1997@gmail.com**
<!--more-->

# Switch là gì?

*Nếu bạn mới đến với lập trình hoặc chưa từng sử dụng **switch** bao giờ thì hãy đọc qua. Nếu không thì bạn có thể bỏ qua.*
Đơn giản là **switch** lấy đầu vào sau đó sẽ cho ra một kiểu dữ liệu, như ví dụ bên dưới.

```js
var vendor = 'apple';
var product;
switch(vendor) {
  case 'apple':
    product = 'iphone';
    break;
  case 'samsung':
    product = 'galaxy';
    break;
  default:
    product = 'Unknown product!';
}
console.log(product); // 'iphone'
```

Trông có vẻ khá giống với việc sử dụng **if** và **else** statements, tuy nhiên nó chỉ đánh giá một giá trị duy nhất, trong switch statements chúng ta dùng case để xét từng giá trị một
Nếu chúng ta thấy nhiều câu lệnh else if, sẽ nhìn thấy mọi thứ đều không ổn lắm. Để nhìn nhận vấn đề rõ ràng hơn bạn hãy nhìn ví dụ dưới đây:

```js
function getProduct (vendor) {
  var product = '';
  if (vendor === 'apple') {
    product = 'iphone';
  } else if (vendor === 'samsung') {
    product = 'Pepsi';
  } else if (vendor === 'xiaomi') {
    product = 'mi phone';
  } else if (vendor === 'vinsmart') {
    product = 'vin phone';
  } else {
    // Tương tự như default trong switch
    product = 'Unknown product!';
  }
  return 'You\'ve buy a ' + product;
}
```

Cách triển khai trông thật noob. Đầu tiên ta có thể nhìn vào syntax như vậy thật dài dòng và cứ lặp đi lặp lại.
Điều này sẽ khiến code trở lên khó đọc cũng như maintain.
Trong trường hợp này ta thấy switch có vẻ hữu dụng nhất. Nhưng switch có phải là cách hay nhất không?

# Vấn đề khi sử dụng switch

Có rất nhiều vấn đề khi sử dụng switch, một trong số đó là việc kiểm soát luồng theo cách **non-standard-looking** trong codeblock của nó. Ngoài ra ta có thể thấy toàn bộ Javascript dùng dấu ngoặc nhọn nhưng switch thì lại không. Cú pháp như vậy không phải là lựa chọn tốt nhất cho javascript và hoặc cho cấu trúc code của javacript. Thậm chí chúng ta còn phải tự thêm **break** với mỗi **case**, điều này có thể dẫn đến khó debugging và có thể gây ra lỗi cho những **case** bên dưới nếu chúng ta quên

Trong javascript chúng ta sử dụng rất nhiều object để lưu trữ dữ liệu và truy cập chúng qua key. Tại sao chúng ta không thử dùng object để thay thế cho switch? Object linh hoạt hơn rất nhiều, dễ đọc, dễ maintain code và cũng không phải thêm break một cách manual

Giả sử như chúng ta có rất nhiều cases. Hiệu năng của object (hash table) tốt hơn so với switch (thứ tự của case rất quan trọng). Một object là tìm kiếm hash table, còn switch lại phải tiến hành từng case một cho đến khi phù hợp và break.

# Object Literal lookups

Chúng sử dụng object rất nhiều, dùng như một **constructor** hoặc **literals**. Thường thì, ta sử dụng Object với mục đích tìm kiếm, để lấy dữ liệu từ thuộc tính của object

Hãy thử chuyển hoá ví dụ ở trên thành một fuction với object literals và return lại một String

```js
function getProduct (vendor) {
  var products = {
    'apple': 'iphone',
    'samsung': 'galaxy',
    'xiaomi': 'mi phone',
    'default': 'Unknown product',
  };
  return 'The product I bought is ' + (products[vendor] || products['default']);
}

var product = getProduct('apple');
// The product I bought is iphone
console.log(product);
```

Nếu không cần trường hợp default, ta có thể viết ngắn lại hơn

```js
function getProduct (vendor) {
  return 'The phone I chose was ' + {
    'apple': 'iphone',
    'samsung': 'galaxy',
    'xiaomi': 'mi phone',
  }[vendor];
}
```

Tuy nhiên nếu đoạn code trên trở lên phức tạp hơn, như là sẽ không phải return một đoạn string đơn thuần thì sao? Chúng ta sẽ xử lý như sau

```js
var vendor = 'apple';

var products = {
  'apple': function () {
    return 'iphone';
  },
  'samsung': function () {
    return 'galaxy';
  },
  'xiaomi': function () {
    return 'mi phone';
  }
};
```

Và chúng ta sẽ gọi như này

```js
products[vendor]()
```

Thật tuyệt vời phải không, đẽ maintain, dễ đọc hơn hẳn, không cần phải lo về **break**, và **case** - nó đơn giản chỉ là một object

Tuy nhiên chúng ta nên viết lại một chút để code dễ dùng hơn

```js
function getProduct(vendor) {
  var fn;
  var products = {
    'apple': function () {
      return 'iphone';
    },
    'samsung': function () {
      return 'galaxy';
    },
    'xiaomi': function () {
      return 'mi phone';
    },
    'default': function () {
      return 'Default item';
    }
  };
  // Neu vendor ton tai trong object hay dung luon
  // Ngược lại hãy dùng giá trị default
  return (products[vendor] || products['default'])();
}

// called with "dr pepper"
var product = getProducts('dr pepper');
console.log(product); // 'Default item'
```

# Object Literal “fall through”

Đối với switch case chúng ta có thể **fall through** (có nghĩa là chúng ta có thể áp dụng nhiều trường hợp cho một đoạn xử lý). Vi dụ:

```js
var type = 'coke';
var snack;
switch(type) {
  case 'coke':
  case 'pepsi':
    snack = 'Drink';
    break;
  case 'cookies':
  case 'crisps':
    snack = 'Food';
    break;
  default:
    drink = 'Unknown type!';
}
console.log(snack); // 'Drink'
```

Với object ta cũng có thể làm tương tự

```js
function getSnack (type) {
  var snack;
  function isDrink () {
    return snack = 'Drink';
  }
  function isFood () {
    return snack = 'Food';
  }
  var snacks = {
    'coke': isDrink,
    'pepsi': isDrink,
    'cookies': isFood,
    'crisps': isFood,
  };
  return snacks[type]();
}

var snack = getSnack('coke');
console.log(snack); // 'Drink'
```

# Kết luận

Object literals xử lý luồng trong Javascript một cách tự nhiên, switch hơi cũ và có phần hơi vụng về, rất khó trong việc debug lỗi. Object mở rộng hơn nhiều, dễ bảo trì, dễ dàng test. Chúng cũng là một trong những design pattern và phổ biến trong lập trình. Object literals có thể chứa cả function, điều đấy làm chúng trở lên linh hoạt hơn rất nhiều.
