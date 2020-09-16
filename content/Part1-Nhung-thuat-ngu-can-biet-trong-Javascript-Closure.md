---
title: 'Part 1: Những thuật ngữ cần biết trong javascript - Closure'
date: 2020-06-06 22:13:45
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

Nếu bạn làm việc với javascript nhiều bạn cần hiểu rõ về nó, cũng như những khái niệm cơ bản.
Khi muốn giỏi bất cứ một việc gì thì bạn phải hiểu công việc mình đang làm.
Loạt bài này sẽ là sẽ giải thích cho bạn thuật ngữ đầu tiên là ```Closure```.

<!--more-->

# Tầm quan trọng của Closure?

Closures rất quan trọng bởi nó kiểm soát những gì có và không có trong scope function của bạn, cùng với những biến được chia sẻ giữa các function con trong cùng một scope. Giúp bạn hiểu cách mà các biến và function làm việc cùng nhau trong code của bạn.
Tầm quan trọng của Closure được ví như là bạn nói tiếng anh nhưng lại không biết ngữ pháp vậy.
Closure thường được dùng trong Javascript với những dữ liệu riêng tư, trong event handlers và call back function.

# Closure là gì?

Closure là một sự kết hợp đến từ nhiều function.
Closure cho phép bạn truy cập function mẹ từ function con nằm bên trong. Trong javascript, closures được tạo ra khi một function được tạo, nghĩa là tại thời điểm **function ấy được tạo**.
Để dùng được closure, ta định nghĩa một function bên trong một function khác và **expose** function con đấy. Để **expose** function con, ta có thể return hoặc chuyền nó vào một function khác. Từ *expose* các bạn cứ hiểu nó giống như là **public** cho đơn giản nhé.
Các Function bên trong có thể truy cập biến của function mẹ, kể cả ngay khi function mẹ đã *returned* (nghĩa là khi function đã kết thúc)

# Sử dụng Closures

## Cung cấp các dữ liệu riêng tư cho object

Các dữ liệu riêng tư thường được dùng với mục đích **chỉ đọc** chứ không được phép thay đổi, chỉnh sửa, xoá.
Điều này rất quan trọng vì nó sẽ giúp chúng ta xay dựng những phần mềm mạnh mẽ hơn vì việc chỉnh sửa sẽ gây ra những thay đổi có thể dẫn đến lỗi phần mềm còn việc **chỉ đọc** sẽ gần như không gây ra lỗi
Hãy xem ví dụ dưới đây:

```js
function getSecret() {
  var secret = 'a';
  return {
    get: function () {
      return secret;
    }
  };
};
```

Trong Javascript, closures là một cách để bật quyền chia sẻ dữ liệu riêng tư. Khi bạn dùng closure để chia sẻ dữ liệu riêng tư, những biến đi kèm sẽ chỉ tồn tại trong scope của hàm mẹ.
Bạn không thể lấy dữ liệu từ phía ngoài scope của function mẹ, cách duy nhất là qua các phương thức **privileged methods** (phương thức đặc quyền).
function ```get```  được khai báo trong trong scope của ```getSecret()```  nên có thể truy cập bất cứ biến nào nằm trong ```getSecret()```. Ta gọi ```get()``` là ```privileged methods```

```js
var secret = new getSecret();
secret.get(); /** Ouput: "a" */

/** Hoac */

getSecret().get() /** Ouput: "a" */
```

## Lấy dữ liệu trong function kể cả khi nó đã kết thúc?

Bạn xem đoạn code dưới đấy:

```js
function getSecret () {
  var counter = 1;
  var secret = "secret";
  var changeSecret = () => {
    secret = secret + counter;
    counter +=1;
  }
  return changeSecret;
}

// Goi ham
const newSecret = getSecret();
const s1 = newSecret();
const s2 = newSecret();
const s3 = newSecret();
console.log("get secret ", s1, s2, s3); // => Ouput: get secret, secret1, secret12, secret123
```

Thật kỳ lạ phải không?
Hãy nói qua về luồng code. Đầu tiên function ```getSecret``` được khai báo, gồm có 3 biến nằm trong đó: ```counter```, ```secret```, ```changeSecret```. Trong đó ```changeSecret``` được gán cho một function, function này sẽ thay đổi biến ```counter``` và ```secret```. Cuối cùng function ```getSecret``` sẽ return lại function ```changeSecret```, đây là chính **expose** function con nằm trong function mẹ.
Tiếp đó mình sẽ gọi hàm ```getSecret``` để gán cho biến ```newSecret```. Nên nhớ rằng ```newSecret``` chính là function ```changeSecret``` (vì ```getSecret``` return lại function con). Rồi mình gán 3 biến ```s1, s2, s3``` cho với kết quả trả về từ lời gọi hàm ```newSecret```. Nếu theo tư duy thông thường kết quả sẽ phải là ```s1, s2, s3``` đều phải là ```secret1```.

Vậy vấn đề ở đây là gì?
Như mình đã nói ở trên: *closures sẽ được tạo ra khi mà function ấy được tạo*. Khi function ```getSecret``` được tạo ra, rồi gán cho cho biến ```newSecret```, nó **tạo một closure** và các biến của function sẽ được **đóng gói** lại.
Hay nói cách khác tất cả các biến đã được tham chiếu vào **một vùng nhớ**. Nếu bạn thay đổi giá trị thì sẽ được lưu lại vào vùng nhớ đã tạo.
Lần đầu khi mà s1 được gán cho ```newSecret()``` thì biến ```secret``` và counter thay đổi, kết quả trả về là ```counter = 1``` và ```secret``` trở thành ```secret = "sceret1"``` , và thay đổi đấy *nằm trong closure của getSecret*, thế nên thay đổi đấy sẽ được lưu lại vào **vùng nhớ** mà mình nói ở trên. Lần gọi tiếp theo là của s2 lại thay đổi thêm một lần nữa biến ```secret``` cũng như ```counter```, cụ thể là Output sẽ trả ra ```counter = 2``` và ```secret1 thành secret12```, tương tự với s3 cũng vậy.

# Kết luận

Closures rất đặc biệt và là một khái niệm cần biết trong Javascript vì đôi khi bạn sẽ không hiểu tại sao giá trị một biến lại có thể thay đổi trong khi mình không tác động trực tiếp?
Đây cũng là một vấn đề cơ bản trong lập trình (Không chỉ mình Javacript mà nhiều ngôn ngữ khác cũng có), nếu đã là lập trình viên thì nên biết sự tồn tại của Closure. Vì thế khi bạn đi phỏng vấn cho một công ty với vai trò là senior nếu không trả lời được câu này bạn sẽ bị đánh dấu **đỏ** và bị đánh giá là thiếu kinh nghiệm.