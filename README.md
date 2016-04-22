# jquery.bootstrap.validate���

�ò����Ҫ���޸���jquery.validate�е�showErrors��������ʾ������Ϣ��tooltip�ķ�ʽ��

�������ﲢû��ʹ��Bootstrap��ԭ����ʽ�ļ���100��K�����ֻ�˵�ʹ���ǲ���̫�������ˡ�

����ֻ�ǽ����õ��Ĳ��ֽ�ȡ�������ѡ�


## PreView

�ò����jquery.validate����֤����ʾ������Ϣ������Bootstrap���tooltip���ܴ��棬ʹ��֤��������ۡ�
UI只是粗略設計，請各位見諒！

![View](https://github.com/aphy358/jquery.bootstrap.validate/blob/master/screenshot1.jpg)

## Dependencies

��ͨ��JQuery���.  

- [jQuery v2.1.3 (>= 1.9.0)](http://jquery.com/)
- [Bootstrap v3.3.4](http://getbootstrap.com)
 

## Getting Started

### Usage

������������ʽ�ļ���js�ļ�.

```html
<!-- Required Stylesheets -->
<link href="./css/QueryDialog.css" rel="stylesheet">
<link href="./css/jquery.bootstrap.validate.css" rel="stylesheet">

<!-- Required Javascript -->
<script src="./js/jquery.js"></script>
<script src="./js/bootstrap.min.js"></script>
<script src="./js/jquery.bootstrap.validate.js"></script>
```

���÷�����ȥ���ϲ���jquery.validate��������ϣ������о�ʾ�����.

```javascript
$(document).ready(function () {
    InitValidator();            //����Ҫ��ʼ����֤
});

//��ʼ����֤
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
    if (!$("form").iboValid()) return;		//���ύ�?֮ǰ������֤
});
```
