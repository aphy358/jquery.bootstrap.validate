
// 根据参数动态生成一个查询条件框

; (function ($, window, document, undefined) {
    'use strict';

    var pluginName = 'QueryDialog';

    var QDialog = function (element, options) {

        this.$element = $(element);

        this.mask = $(".qdialog-mask");

        this.init(options);
    };

    QDialog.prototype.init = function (options) {
        var _this = this;

        this.QDParams = [];         // 存储查询条件项

        this.queryParams = [];      // 存储所有的查询条件

        if (options.data) {
            if (typeof options.data === 'string') {
                options.data = $.parseJSON(options.data);
            }
            this.QDParams = $.extend(true, [], options.data);
            delete options.data;
        }

        this.buildDialog(this.QDParams);

        this.mask.on("click", function () {
            var tmp = _this.$element;

            for (var i = 0; i < 3; i++) {
                $(tmp).animate({ left: "0.8%" }, 100);
                $(tmp).animate({ left: "1.2%" }, 100);
            }

            $(tmp).animate({ left: "1%" }, "fast");
        });
    };

    QDialog.prototype.buildDialog = function (QDParams) {

        var _this = this;

        var ul = $(_this.template.list);
        _this.$element.append(ul);

        var _buildLiForFloat = this.buildLiForFloat;
        var _buildLiForDate = this.buildLiForDate;
        var _buildLiForBool = this.buildLiForBool;
        var _buildLiForString = this.buildLiForString;

        $.each(QDParams, function (i, n) {
            var li = $(_this.template.item);

            li.append($(_this.template.itemRmk).text(n.queryfieldrmk));

            switch (n.queryfieldtype) {
                case "1":   // 整数
                case "2":   // 小数
                    _buildLiForFloat(_this, n, li);
                    break;
                case "3":   // 日期
                case "4":   // 时间
                    _buildLiForDate(_this, n, li);
                    break;
                case "5":   // 布尔
                    _buildLiForBool(_this, n, li);
                    break;
                case "6":   // 字符
                    _buildLiForString(_this, n, li);
                    break;
                default:
                    break;
            }

            ul.append(li);
        });

        // 增加底部两个按钮（“取消”、“查询”）
        var li = $(_this.template.item);
        this.buildLiForFooter(_this, li);
        ul.append(li);

        $("body").append(_this.$element);
    };

    QDialog.prototype.buildQueryParams = function (_this, n, value, querykey) {

        var val;
        var queryParam = {};
        var queryParams = [];

        if (value != null) {
            val = $(value.target).val().trim();
        }

        $.each(_this.queryParams, function (j, m) {
            if (val != null) {
                if (!(m.queryfieldname == n.queryfieldname && m.queryfieldkey == querykey))    // 如果不是当前编辑的查询条件，针对其他条件输入框，则先暂存到数组queryParams中
                    queryParams.push(m);
            }
            else {
                if (!(m.queryfieldname == n.queryfieldname))    // 如果不是当前编辑的查询条件，针对bool类型条件输入框，则先暂存到数组queryParams中
                    queryParams.push(m);
            }
        });

        // 再将当前编辑的查询条件push到临时数组queryParams中
        queryParam["queryfieldname"] = n.queryfieldname;
        queryParam["queryfieldkey"] = querykey;
        if (val != null && val != "") {
            queryParam["queryfieldvalue"] = val;
            queryParams.push(queryParam);
        }
        else if (val == null) {
            queryParam["queryfieldvalue"] = querykey;
            if ("check_all" != querykey)            // 如果点击的是“全选”，则不用将这个查询条件加入
                queryParams.push(queryParam);
        }

        // 将临时数组queryParams赋值给_this.queryParams
        _this.queryParams = queryParams;
    };

    // 对radio控件的点击事件进行预处理
    QDialog.prototype.handleRadioCheck = function (_this) {
        if ("checked" == _this.attr("checked"))     // 如果当前点击的radio按钮已经处于被选中状态，则直接return
            return;

        var radios = _this.parent().find("input[type='radio']");
        $.each(radios, function (i, n) {            // 先将这一行所有的radio设置为未选中状态
            $(n).removeAttr("checked");
        });

        // 再将当前被点击的radio设置为被选中状态
        _this.attr("checked", "checked").prop("checked", "true");
    };

    QDialog.prototype.buildLiForFooter = function (_this, li) {
        li.append($(_this.template.footerBtn).addClass("query-cancel").text("取消").on("click", function () {     // 点击“取消”
            $("#QueryDialog").hide();       // 隐藏查询条件框
            $(".qdialog-mask").hide();      // 隐藏遮罩层
        }));
        li.append($(_this.template.footerBtn).addClass("query-go").text("查询").on("click", function () {         // 点击“查询”
            // 把查询条件queryParams传到后台进行查询
            // _this.queryParams;
            var tmp = _this;
            var str = "参数列表如下：\n";
            if (_this.queryParams.length > 0) {
                $.each(_this.queryParams, function (i, n) {
                    str += n.queryfieldname + "  " + n.queryfieldkey + "  " + n.queryfieldvalue + "\n";
                });
            }
            alert(str);
        }));
    };

    QDialog.prototype.buildLiForFloat = function (_this, n, li) {
        li.append($(_this.template.conRmk).text("大于"));
        li.append($(_this.template.inputText).attr("placeholder", "请输入数字").on("change", function (value) {
            _this.buildQueryParams(_this, n, value, "greater_than");
        }));
        li.append($(_this.template.conRmk).text("小于"));
        li.append($(_this.template.inputText).attr("placeholder", "请输入数字").on("change", function (value) {
            _this.buildQueryParams(_this, n, value, "less_than");
        }));
    };

    QDialog.prototype.buildLiForDate = function (_this, n, li) {
        li.append($(_this.template.conRmk).text("大于"));
        li.append($(_this.template.inputText).attr("type", "date").on("change", function (value) {
            _this.buildQueryParams(_this, n, value, "date_begin");
        }));
        li.append($(_this.template.conRmk).text("小于"));
        li.append($(_this.template.inputText).attr("type", "date").on("change", function (value) {
            _this.buildQueryParams(_this, n, value, "date_end");
        }));
    };

    QDialog.prototype.buildLiForBool = function (_this, n, li) {
        li.append($(_this.template.conRmk).text("全选"));
        li.append($(_this.template.inputText).attr("type", "radio").attr("checked", "checked").on("click", function (value) {
            // 注意，如果是全选，则相当于对这个条件没有筛选，则不需要传入相应的查询条件
            _this.handleRadioCheck($(this));
            _this.buildQueryParams(_this, n, null, "check_all");
        }));
        li.append($(_this.template.conRmk).text("是"));
        li.append($(_this.template.inputText).attr("type", "radio").on("click", function (value) {
            _this.handleRadioCheck($(this));
            _this.buildQueryParams(_this, n, null, "check_true");

        }));
        li.append($(_this.template.conRmk).text("否"));
        li.append($(_this.template.inputText).attr("type", "radio").on("click", function (value) {
            _this.handleRadioCheck($(this));
            _this.buildQueryParams(_this, n, null, "check_false");
        }));
    };

    QDialog.prototype.buildLiForString = function (_this, n, li) {
        li.append($(_this.template.conRmk).text("包含"));
        li.append($(_this.template.inputText).on("change", function (value) {
            _this.buildQueryParams(_this, n, value, "include");
        }));
    };

    QDialog.prototype.template = {
        list: '<ul class="query-body"></ul>',                   // 包含所有查询条件项
        item: '<li class="query-item"></li>',                   // 每一个查询条件项
        itemRmk: '<div class="query-field-rmk"></div>',         // 每一个查询条件项的条件名称（如“姓名”、“年龄”等）
        conRmk: '<div class="condition-rmk"></div>',            // 查询描述（如“大于”、“小于”等）
        inputText: '<input class="condition-input" />',         // 查询条件输入框
        footerBtn: '<div class="query-footer-item"></div>',     // 底部“取消”、“查询”按钮
    };

    var logError = function (message) {
        if (window.console) {
            window.console.error(message);
        }
    };

    // 防止多次实例化
    // 处理更新和方法调用
    $.fn[pluginName] = function (options, args) {

        if (this.length < 1) {
            $("body").append('<div id="QueryDialog"></div>');
            return $("#QueryDialog").QueryDialog(options, args);
        }

        $("body").append('<div class="qdialog-mask"></div>');
        var result;

        this.each(function () {
            var _this = $.data(this, pluginName);
            if (typeof options === 'string') {
                if (!_this) {
                    logError('Not initialized, can not call method : ' + options);
                }
                else if (!$.isFunction(_this[options]) || options.charAt(0) === '_') {
                    logError('No such method : ' + options);
                }
                else {
                    if (!(args instanceof Array)) {
                        args = [args];
                    }
                    result = _this[options].apply(_this, args);
                }
            }
            else if (typeof options === 'boolean') {
                result = _this;
            }
            else {
                $.data(this, pluginName, new QDialog(this, $.extend(true, {}, options)));
            }
        });

        return result || this;
    };

})(jQuery, window, document);