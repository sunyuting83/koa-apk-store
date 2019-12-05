require.config({
    baseUrl: 'https://cdn.bootcss.com/',
    map: {
        '*': {
            'css': 'require-css/0.1.10/css.min'
        }
    },
    paths: {
        'jquery': 'jquery/2.1.1/jquery.min',
        'bootstrap': 'bootstrap/3.3.6/js/bootstrap.min',
        'metisMenu': 'metisMenu/2.7.7/metisMenu.min',
        'jQuery-slimScroll': 'jQuery-slimScroll/1.3.8/jquery.slimscroll.min',
        'pace': 'pace/1.0.2/pace.min',
        'toastr': 'toastr.js/latest/js/toastr.min',
        'layer': 'layer/3.1.0/layer',
        'axios': 'axios/0.18.0/axios.min',
        'domReady': 'require-domReady/2.0.1/domReady.min',
        'jstree': 'jstree/3.3.7/jstree.min'
    },
    shim: {
        'bootstrap': [
            'jquery',
            'css!https://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min',
            'css!font-awesome/4.7.0/css/font-awesome.min',
            'css!animate.css/3.7.0/animate.min',
            'css!https://apkshop-kindlesend.oss-cn-beijing.aliyuncs.com/static/style'
        ],
        'metisMenu': ['jquery'],
        'jQuery-slimScroll': ['jquery'],
        'toastr': [
            'jquery',
            'css!https://cdn.bootcss.com/toastr.js/latest/css/toastr.min'
        ],
        'layer': [
            'jquery',
            'css!https://cdn.bootcss.com/layer/2.3/skin/layer'
        ],
        'jstree': [
            'jquery',
            'css!https://cdn.bootcss.com/jstree/3.3.7/themes/default/style.min'
        ]
    }
});

require([
    'domReady',
    'jquery',
    'axios',
    'bootstrap',
    'metisMenu',
    'jQuery-slimScroll',
    'pace',
    'toastr',
    'layer',
    'jstree'
],
function (domReady, $, axios) {
    // httpServer
    // var rooturl = 'http://127.0.0.1:3200/manage/';
    var rooturl = 'http://apk.kindlesend.com/manage/';
    // 创建axios默认请求
    axios.defaults.baseURL = rooturl;
    // 配置超时时间
    axios.defaults.timeout = 100000;
    // 配置请求拦截
    axios.interceptors.request.use(config => {
        // config.setHeaders([
        //   // 在这里设置请求头与携带token信息
        // ]);
        return config;
    });
    // 添加响应拦截器
    axios.interceptors.response.use(
        function (response) {
            // console.log(response);
            return response;
        },
        function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        }
    );
    // 配置请求地址
    let getUrl = (u) => {
        var ul = '';
        var url = {
            'changepwd': `${rooturl}changepwd`,
            'deladmin': `${rooturl}deladmin`,
            'adduser': `${rooturl}adduser`,
            'getuser': `${rooturl}getuser`,
            'addtopic': `${rooturl}addtopic`,
            'changetopic': `${rooturl}changetopic`,
            'search': `${rooturl}search`,
            'addapk': `${rooturl}addtapk`,
            'delapk': `${rooturl}deltapk`,
            'delhotkey': `${rooturl}delhotkey`,
            'classify_edit': `${rooturl}classify_edit`
        };
        switch (u) {
            case 'changepwd':
                ul = url.changepwd;
                break;
            case 'deladmin':
                ul = url.deladmin;
                break;
            case 'adduser':
                ul = url.adduser;
                break;
            case 'getuser':
                ul = url.getuser;
                break;
            case 'addtopic':
                ul = url.addtopic;
            case 'changetopic':
                ul = url.changetopic;
                break;
            case 'search':
                ul = url.search;
                break;
            case 'addapk':
                ul = url.addapk;
                break;
            case 'delapk':
                ul = url.delapk;
                break;
            case 'delhotkey':
                ul = url.delhotkey;
                break;
            case 'classify_edit':
                ul = url.classify_edit;
                break;
            default:
                ul = url.changepwd;
                break;
        };
        return ul;
    };

    /**
     * get请求
     * @method get
     * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
     */
    var get = (url, params, loading) => {
        let u = getUrl(url);
        return new Promise((resolve, reject) => {
            axios
                .get(u, {
                    params: params
                })
                .then(res => {
                    if (res.status === 200) resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };
    /**
     * post请求
     * @method post
     * @param {url, params} 请求地址，请求参数，是否需要加载层
     */
    var post = (url, data) => {
        let u = getUrl(url);
        return new Promise((resolve, reject) => {
            // qs.stringify(data)
            axios
                .post(u, data)
                .then(res => {
                    // console.log(res);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };
    domReady(function () {
        //这个方法在DOM加载完执行
        //安全的查询和操作DOM
        // Add body-small class if window less than 768px
        if ($(this).width() < 769) {
            $('body').addClass('body-small')
        } else {
            $('body').removeClass('body-small')
        }

        // MetsiMenu
        $('#side-menu').metisMenu();

        // Collapse ibox function
        $('.collapse-link').click(function () {
            var ibox = $(this).closest('div.ibox');
            var button = $(this).find('i');
            var content = ibox.find('div.ibox-content');
            content.slideToggle(200);
            button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
            ibox.toggleClass('').toggleClass('border-bottom');
            setTimeout(function () {
                ibox.resize();
                ibox.find('[id^=map-]').resize();
            }, 50);
        });

        // Close ibox function
        $('.close-link').click(function () {
            var content = $(this).closest('div.ibox');
            content.remove();
        });

        // Fullscreen ibox function
        $('.fullscreen-link').click(function () {
            var ibox = $(this).closest('div.ibox');
            var button = $(this).find('i');
            $('body').toggleClass('fullscreen-ibox-mode');
            button.toggleClass('fa-expand').toggleClass('fa-compress');
            ibox.toggleClass('fullscreen');
            setTimeout(function () {
                $(window).trigger('resize');
            }, 100);
        });

        // Close menu in canvas mode
        $('.close-canvas-menu').click(function () {
            $("body").toggleClass("mini-navbar");
            SmoothlyMenu();
        });

        // Run menu of canvas
        $('body.canvas-menu .sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9
        });

        // Open close right sidebar
        $('.right-sidebar-toggle').click(function () {
            $('#right-sidebar').toggleClass('sidebar-open');
        });

        // Initialize slimscroll for right sidebar
        $('.sidebar-container').slimScroll({
            height: '100%',
            railOpacity: 0.4,
            wheelStep: 10
        });

        // Open close small chat
        $('.open-small-chat').click(function () {
            $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
            $('.small-chat-box').toggleClass('active');
        });

        // Initialize slimscroll for small chat
        $('.small-chat-box .content').slimScroll({
            height: '234px',
            railOpacity: 0.4
        });

        // Small todo handler
        $('.check-link').click(function () {
            var button = $(this).find('i');
            var label = $(this).next('span');
            button.toggleClass('fa-check-square').toggleClass('fa-square-o');
            label.toggleClass('todo-completed');
            return false;
        });

        // Append config box / Only for demo purpose
        // Uncomment on server mode to enable XHR calls
        // $.get("skin-config.html", function (data) {
        //     if (!$('body').hasClass('no-skin-config'))
        //         $('body').append(data);
        // });

        // Minimalize menu
        $('.navbar-minimalize').click(function () {
            $("body").toggleClass("mini-navbar");
            SmoothlyMenu();

        });

        // Tooltips demo
        $('.tooltip-demo').tooltip({
            selector: "[data-toggle=tooltip]",
            container: "body"
        });

        // Move modal to body
        // Fix Bootstrap backdrop issu with animation.css
        $('.modal').appendTo("body");

        // Full height of sidebar
        fix_height = function() {
            var heightWithoutNavbar = $("body > #wrapper").height() - 61;
            $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

            var navbarHeigh = $('nav.navbar-default').height();
            var wrapperHeigh = $('#page-wrapper').height();

            if (navbarHeigh > wrapperHeigh) {
                $('#page-wrapper').css("min-height", navbarHeigh + "px");
            }

            if (navbarHeigh < wrapperHeigh) {
                $('#page-wrapper').css("min-height", $(window).height() + "px");
            }

            if ($('body').hasClass('fixed-nav')) {
                if (navbarHeigh > wrapperHeigh) {
                    $('#page-wrapper').css("min-height", navbarHeigh - 60 + "px");
                } else {
                    $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
                }
            }

        }

        fix_height();

        // Fixed Sidebar
        $(window).bind("load", function () {
            if ($("body").hasClass('fixed-sidebar')) {
                $('.sidebar-collapse').slimScroll({
                    height: '100%',
                    railOpacity: 0.9
                });
            }
        });

        // Move right sidebar top after scroll
        $(window).scroll(function () {
            if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
                $('#right-sidebar').addClass('sidebar-top');
            } else {
                $('#right-sidebar').removeClass('sidebar-top');
            }
        });

        $(window).bind("load resize scroll", function () {
            if (!$("body").hasClass('body-small')) {
                fix_height();
            }
        });

        $("[data-toggle=popover]")
            .popover();

        // Add slimscroll to element
        $('.full-height-scroll').slimscroll({
            height: '100%'
        })



        // Minimalize menu when screen is less than 768px
        $(window).bind("resize", function () {
            if ($(this).width() < 769) {
                $('body').addClass('body-small')
            } else {
                $('body').removeClass('body-small')
            }
        });

        // Local Storage functions
        // Set proper body class and plugins based on user configuration
        if (localStorageSupport) {

            var collapse = localStorage.getItem("collapse_menu");
            var fixedsidebar = localStorage.getItem("fixedsidebar");
            var fixednavbar = localStorage.getItem("fixednavbar");
            var boxedlayout = localStorage.getItem("boxedlayout");
            var fixedfooter = localStorage.getItem("fixedfooter");

            var body = $('body');

            if (fixedsidebar == 'on') {
                body.addClass('fixed-sidebar');
                $('.sidebar-collapse').slimScroll({
                    height: '100%',
                    railOpacity: 0.9
                });
            }

            if (collapse == 'on') {
                if (body.hasClass('fixed-sidebar')) {
                    if (!body.hasClass('body-small')) {
                        body.addClass('mini-navbar');
                    }
                } else {
                    if (!body.hasClass('body-small')) {
                        body.addClass('mini-navbar');
                    }

                }
            }

            if (fixednavbar == 'on') {
                $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
                body.addClass('fixed-nav');
            }

            if (boxedlayout == 'on') {
                body.addClass('boxed-layout');
            }

            if (fixedfooter == 'on') {
                $(".footer").addClass('fixed');
            }
        };
        // check if browser support HTML5 local storage
        function localStorageSupport() {
            return (('localStorage' in window) && window['localStorage'] !== null)
        }

        // For demo purpose - animation css script
        animationHover = function(element, animation) {
            element = $(element);
            element.hover(
                function () {
                    element.addClass('animated ' + animation);
                },
                function () {
                    //wait for animation to finish before removing classes
                    window.setTimeout(function () {
                        element.removeClass('animated ' + animation);
                    }, 2000);
                });
        }

        SmoothlyMenu = function() {
            if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                // Hide menu in order to smoothly turn on when maximize menu
                $('#side-menu').hide();
                // For smoothly turn on menu
                setTimeout(
                    function () {
                        $('#side-menu').fadeIn(400);
                    }, 200);
            } else if ($('body').hasClass('fixed-sidebar')) {
                $('#side-menu').hide();
                setTimeout(
                    function () {
                        $('#side-menu').fadeIn(400);
                    }, 100);
            } else {
                // Remove all inline style from jquery fadeIn function to reset menu state
                $('#side-menu').removeAttr('style');
            }
        }

        // Dragable panels
        WinMove = function() {
            var element = "[class*=col]";
            var handle = ".ibox-title";
            var connect = "[class*=col]";
            $(element).sortable({
                    handle: handle,
                    connectWith: connect,
                    tolerance: 'pointer',
                    forcePlaceholderSize: true,
                    opacity: 0.8
                })
                .disableSelection();
        };


        repwd = function(key) {
            // console.log('www');
            var a = $('[name="password"]').val();
            var k = key;
            post('changepwd', {
                'key': k,
                'password': a
            }).then((d) => {
                if (d.data == true) {
                    layer.closeAll();
                }
            }).catch((err) => {
                layer.msg('修改失败');
            });
        };

        $('[name="remove"]').on("click", function () {
            // 删除管理员
            var _this = $(this);
            var data = _this.data('key');

            layer.confirm('您确定要删除？', {
                btn: ['确定删除', '取消'],
                title: "删除数据" //按钮
            }, function (index) {
                post('deladmin', {
                    'key': data
                }).then((de) => {
                    _this.parents('tr').remove();
                    layer.close(index);
                });
                // del_ajax('删除',data)
            });
        });
        $('[name="changepwd"]').on("click", function () {
            var key = $(this).data('key');
            layer.open({
                type: 1,
                title: '修改密码',
                skin: 'layui-layer-molv', //加上边框
                area: ['420px', '300px'], //宽高
                content: '<div class="ibox-content"><div class="form-horizontal"><div class="form-group"><label class="col-sm-3 control-label">新密码</label>`<div class="col-sm-9"><input name="password"type="password"class="form-control"onkeyup="KeyUp()"/></div>`</div><div class="hr-line-dashed"></div><div class="form-group repwd"><label class="col-sm-3 control-label">重复密码</label>`<div class="col-sm-9"><input name="repassword"type="password"class="form-control"onkeyup="KeyUp()"/>`<span name="repassword-tip"class="help-block m-b-none text-danger"style="display:none"><i class="fa fa-exclamation-triangle"></i>密码必须一致</span></div></div><div class="hr-line-dashed"></div><div class="form-group"><div class="col-sm-9 col-sm-offset-3">`<button class="btn btn-primary"name="submit"type="submit"disabled="disabled"onclick="repwd(${key})">修改密码</button>`</div></div></div></div>'
            });
        });


        $('#addnew').on("click", function () {
            layer.open({
                type: 1,
                title: '添加新用户',
                skin: 'layui-layer-molv', //加上边框
                area: ['420px', '330px'], //宽高
                content: '<div class="ibox-content"><div class="form-horizontal"><div class="form-group"><label class="col-sm-3 control-label">用户名</label><div class="col-sm-9"><input id="username"type="text"class="form-control"/></div></div><div class="form-group"><label class="col-sm-3 control-label">新密码</label><div class="col-sm-9"><input id="password"name="password"type="password"onkeyup="KeyUp()"class="form-control"/></div></div><div class="form-group repwd"><label class="col-sm-3 control-label">重复密码</label><div class="col-sm-9"><input name="repassword"type="password"class="form-control"onkeyup="KeyUp()"/><span name="repassword-tip"class="help-block m-b-none text-danger"style="display:none"><i class="fa fa-exclamation-triangle"></i>密码必须一致</span></div></div><div class="hr-line-dashed"></div><div class="form-group"><div class="col-sm-9 col-sm-offset-3"><button class="btn btn-primary"name="submit"type="submit"disabled="disabled"onclick="addu()">修改密码</button></div></div></div></div>'
            });
        });

        KeyUp = function () {
            var a = $('[name="password"]').val();
            var b = $('[name="repassword"]').val();
            if (a == b) {
                $('[name="submit"]').removeAttr('disabled');
                $('[name="repassword-tip"]').hide();
                $('.repwd').removeClass('has-error');
            } else {
                $('[name="submit"]').attr('disabled', 'disabled');
                $('[name="repassword-tip"]').show();
                $('.repwd').addClass('has-error');
            }
        };

        addu = function() {
            var username = $('#username').val();
            var password = $('#password').val();
            post('adduser', {
                'username': username,
                'password': password
            }).then((d) => {
                if (d.data == true) {
                    addtr(username);
                    layer.closeAll();
                } else {
                    layer.msg('用户已存在');
                }
            }).catch((err) => {
                layer.msg('修改失败');
            });
        };

        addtr = function(username) {
            get('getuser', {
                'username': username
            }).then((d) => {
                // console.log(d);
                let newtr = `<tr><td>${d.username}</td>` +
                    `<td>${d.lastip}</td>` +
                    `<td>${d.lasttime}</td>` +
                    `<td>${d.login_size}</td>` +
                    `<td>${d.created_time}</td>` +
                    `<td><div name="changepwd" data-key="${d.username}" class="btn btn-primary btn-xs">修改密码</div>` +
                    ` <div name="remove" class="btn btn-danger btn-xs" data-key="${d.username}">删除</div></td></tr>`;
                $('#admin').append(newtr);
            }).catch((err) => {
                layer.msg('失败');
            });
        };

        // classify
        $('[name="bigcs"]').each(function (index, el) {
            var _this = $(this);
            _this.click(function (event) {
                var bid = _this.children('i').data('bid');
                $('[name="smid' + bid + '"]').toggle();
                _this.children('i').toggleClass("fa-plus-square-o");
                _this.children('i').toggleClass("fa-minus-square-o");
            });
        });

        addTopic = function (cid) { 
            layer.open({
                type: 1,
                title: '添加新专题',
                skin: 'layui-layer-molv', //加上边框
                area: ['420px', '380px'], //宽高
                content: '<div class="ibox-content"><div class="form-horizontal"><div class="form-group"><label class="col-sm-3 control-label">标题</label><div class="col-sm-9"><input id="title"type="text"class="form-control"/></div></div><div class="form-group"><label class="col-sm-3 control-label">分类</label><div class="col-sm-9"><select id="classi"class="form-control m-b"name="account"><optgroup label="首页"><option value="0">首页专题</option><option value="5">首页排行</option><option value="3">首页轮显</option><option value="4">首页必装</option></optgroup><optgroup label="软件"><option value="1">软件专题</option><option value="8">软件轮显</option><option value="9">软件精选</option><option value="6">软件排行</option></optgroup><optgroup label="游戏"><option value="2">游戏专题</option><option value="10">游戏轮显</option><option value="11">游戏精选</option><option value="7">游戏排行</option></optgroup></select></div></div><div class="form-group"><label class="col-sm-3 control-label">排序</label><div class="col-sm-9"><input id="sort"type="number"value="0"class="form-control"/></div></div><div class="form-group"><label class="col-sm-3 control-label">更多</label><div class="col-sm-9"><input id="more"type="text"class="form-control"/></div></div><div class="hr-line-dashed"></div><div class="form-group"><div class="col-sm-9 col-sm-offset-3"><button class="btn btn-primary"name="submit"type="submit"onclick="addt()">添加专题</button></div></div></div></div>'
            });
        };


        changeTopic = function ($this, cid) {
            var json = $($this).data('json');
            json = json.split(',');
            json = {
                'id': json[0],
                'title': json[1],
                'classify': json[2],
                'sort': json[3],
                'more': json[4]
            };
            // console.log(json);
            layer.open({
                type: 1,
                title: '修改专题',
                skin: 'layui-layer-molv', //加上边框
                area: ['420px', '380px'], //宽高
                content: '<div id="changet" class="ibox-content"><div class="form-horizontal"><div class="form-group"><label class="col-sm-3 control-label">标题</label><div class="col-sm-9"><input id="title"type="text"class="form-control"/><input id="id"type="hidden"class="form-control"/></div></div><div class="form-group"><label class="col-sm-3 control-label">分类</label><div class="col-sm-9"><select id="classi"class="form-control m-b"name="account"><optgroup label="首页"><option value="0">首页专题</option><option value="5">首页排行</option><option value="3">首页轮显</option><option value="4">首页必装</option></optgroup><optgroup label="软件"><option value="1">软件专题</option><option value="8">软件轮显</option><option value="9">软件精选</option><option value="6">软件排行</option></optgroup><optgroup label="游戏"><option value="2">游戏专题</option><option value="10">游戏轮显</option><option value="11">游戏精选</option><option value="7">游戏排行</option></optgroup></select></div></div><div class="form-group"><label class="col-sm-3 control-label">排序</label><div class="col-sm-9"><input id="sort"type="number"value="0"class="form-control"/></div></div><div class="form-group"><label class="col-sm-3 control-label">更多</label><div class="col-sm-9"><input id="more"type="text"class="form-control"/></div></div><div class="hr-line-dashed"></div><div class="form-group"><div class="col-sm-9 col-sm-offset-3"><button class="btn btn-primary"name="submit"type="submit"onclick="changet()">修改专题</button></div></div></div></div>'
            });
            $('#changet').find('input#id').val(json.id);
            $('#changet').find('input#title').val(json.title);
            $('#changet').find('#classi').val(json.classify);
            $('#changet').find('#sort').val(json.sort);
            $('#changet').find('#more').val(json.more);
            changet = function() {
                var id = $('#changet').find('input#id').val(),
                    title = $('#changet').find('input#title').val(),
                    classify = $('#changet').find('#classi').val(),
                    sort = $('#changet').find('#sort').val(),
                    more = $('#changet').find('#more').val(),
                    jsons = {
                        'id': id,
                        'title': title,
                        'classify': classify,
                        'sort': sort,
                        'more': more
                    };
                // console.log(jsons);
                post('changetopic', jsons).then((d) => {
                    if (d.data == true) {
                        location.reload();
                        layer.closeAll();
                    } else {
                        layer.msg('添加失败');
                    }
                }).catch((err) => {
                    layer.msg('添加失败');
                });
            };
        };

        addt = function () { 
            var title = $('#title').val(),
                classi = $('#classi').val(),
                sort = $('#sort').val(),
                more = $('#more').val();
            post('addtopic', {
                'title': title,
                'classify': classi,
                'sort': sort,
                'more': more
            }).then((d) => {
                if (d.data == true) {
                    location.reload();
                    layer.closeAll();
                }else {
                    layer.msg('添加失败');
                }
            }).catch((err) => {
                layer.msg('添加失败');
            });

        };

        apkTopic = (id, ls) => {
            layer.open({
                type: 1,
                title: '关联应用',
                skin: 'layui-layer-molv', //加上边框
                area: ['560px', '580px'], //宽高
                content: `<div class="ibox-content"><div class="form-horizontal"><div class="form-group"><div class="input-group"><input type="text"class="form-control"id="searchkey"><span class="input-group-btn"><button type="button"class="btn btn-primary"onclick="search(${id}, ${ls})">搜索</button></span></div></div></div><div id="apklist"></div></div>`
            });
        };

        search = (id, p, ls) => {
            for (const i in ls) {
                if (ls.hasOwnProperty(i)) {
                    const ll = ls[i];
                    console.log(ll);
                }
            }
            if (p == undefined) p = 1;
            var key = $('#searchkey').val();
            get('search', {
                'key': key,
                'page': p
            }).then((d) => {
                if (d) {
                    var h = '';
                    d.forEach(el => {
                        h += `<div class="col col-xs-6 padding"><div class="contact-box">${el.title}</div><div style="position: absolute;top: 0;right: 16px;cursor: pointer;"><button class="btn btn-default btn-xs" type="button" onclick="addTapk(this,${id},${el.id})"><i class="fa fa-plus-square"></i>&nbsp;添加</button></div></div>`;
                    });
                    h += `<div class="row" style="padding-bottom: 15px"><div class="col col-xs-6" onclick="search(${id},${p-1})">上一页</div><div class="col col-xs-6" onclick="search(${id},${p+1})">下一页</div></div></div>`;
                    $('#apklist').html(h);
                }else {
                    $('#apklist').html('<h3>没有数据</h3>');
                }
            }).catch((err) => {
                layer.msg('失败');
            });
        };

        addTapk = ($this,tid,aid) => {
            post('addapk', {
                'tid': tid,
                'aid': aid
            }).then((d) => {
                $($this).removeClass('btn-default').addClass('btn-danger');
            }).catch((err) => {
                layer.msg('添加失败');
            });
        };

        removeTapk = ($this, tid, aid) => {
            post('delapk', {
                'tid': tid,
                'aid': aid
            }).then((d) => {
                $($this).parent('div.col').parent('div.row').remove();
            }).catch((err) => {
                layer.msg('添加失败');
            });
        };

        toggletr = ($this) => {
            $($this).next('tr.topicmore').toggle();
        };

        $('[name="removeKey"]').on("click", function () {
            var _this = $(this);
            var data = {
                key: _this.data('key'),
                cid: _this.data('cid')
            };

            layer.confirm('您确定要删除？', {
                btn: ['确定删除', '取消'],
                title: "删除数据" //按钮
            }, function (index) {
                post('delhotkey', data).then((de) => {
                    _this.parents('tr').remove();
                    layer.close(index);
                });
                // del_ajax('删除',data)
            });
        });

        // 分类页ajax修改排序和分类名
        $('[name="sort"]').each(function (index, el) {
            var _this = $(this);
            _this.blur(function () {
                let value = _this.val(),
                    id = _this.data('id'),
                    getdata = {
                        types: 'sort',
                        data: value,
                        id: id
                    };
                // console.log(geturl,getdata);
                post('classify_edit', getdata).then((d) => {
                    _this.val(d.data);
                }).catch((err) => {
                    if (err) layer.msg('修改失败');
                });
            });
        });
        $('[name="classify_name"]').each(function (index, el) {
            var _this = $(this);
            _this.blur(function () {
                let value = _this.val(),
                    id = _this.data('id'),
                    getdata = {
                        types: 'name',
                        data: value,
                        id: id
                    };
                post('classify_edit', getdata).then((d) => {
                    
                    _this.val(d.data);
                }).catch((err) => {
                    if (err) layer.msg('修改失败');
                });
            });
        });

        $('#jstree1').jstree({
            'plugins': ['types', 'html_data'],
            'types': {
                'default': {
                    'icon': 'fa fa-folder'
                },
                'html': {
                    'icon': 'fa fa-file-code-o'
                }
            },
            "a_attr": {
                "href": "qwqwe"
            }
        });

    });


    // changepwd
    // $('.i-checks').iCheck({
    //     checkboxClass: 'icheckbox_square-green',
    //     radioClass: 'iradio_square-green',
    // });

});