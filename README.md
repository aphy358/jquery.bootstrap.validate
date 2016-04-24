# jquery.bootstrap.validate简介

该插件主要是修改了jquery.validate中的showErrors方法，显示错误信息用tooltip的方式。

另外这里并没有使用Bootstrap的原有样式文件，100多K对于手机端的使用是不是太耗流量了。

所以只是将其用到的部分截取出来而已。


## PreView

该插件将jquery.validate在验证中显示错误信息部分用Bootstrap里的tooltip功能代替，使验证界面更美观。
UI只是粗略设计，敬请见谅！

![View](https://github.com/aphy358/jquery.bootstrap.validate/blob/master/screenshot2.jpg)

## Dependencies

普通的JQuery包即可.  

- [jQuery v2.1.3 (>= 1.9.0)](http://jquery.com/)
- [Bootstrap v3.3.4](http://getbootstrap.com)
 

## Getting Started

### Usage

首先是引入样式文件和js文件.

```html
<!-- Required Stylesheets -->
<link href="./css/QueryDialog.css" rel="stylesheet">
<link href="./css/jquery.bootstrap.validate.css" rel="stylesheet">

<!-- Required Javascript -->
<script src="./js/jquery.js"></script>
<script src="./js/bootstrap.min.js"></script>
<script src="./js/jquery.bootstrap.validate.js"></script>
```

基本用法可以去网上查找jquery.validate的相关资料，如下列举示例代码.

```javascript
$(document).ready(function () {
    InitValidator();            //首先要初始化验证
});

//初始化验证
function InitValidator() {
    $("form").validate({
	rules: {
	    mobile: {
		mobile: true,
	    },
	    date: {
		required: true,
	    },
	},
    });
};

$(".query-go").on("click", function () {
    if (!$("form").iboValid()) return;		//在提交表单之前进行验证
});
```
