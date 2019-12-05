// $('.i-checks').iCheck({
//     checkboxClass: 'icheckbox_square-green',
//     radioClass: 'iradio_square-green',
// });
$('[name="remove"]').on("click", function () {
    var _this = $(this);
    var data = _this.data('key');
    
    layer.confirm('您确定要删除？', {
        btn: ['确定删除','取消'],
        title: "删除数据" //按钮
    }, function(index){
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
        content: '<div class="ibox-content">'
                    +'<div class="form-horizontal">'
                        +'<div class="form-group"><label class="col-sm-3 control-label">新密码</label>'
                            +'<div class="col-sm-9"><input name="password" type="password" class="form-control" onkeyup=KeyUp() /></div>'
                        +'</div>'
                        +'<div class="hr-line-dashed"></div>'
                        +'<div class="form-group repwd"><label class="col-sm-3 control-label">重复密码</label>'
                            +'<div class="col-sm-9"><input name="repassword" type="password" class="form-control" onkeyup=KeyUp() />'
                                +'<span name="repassword-tip" class="help-block m-b-none text-danger" style="display:none"><i class="fa fa-exclamation-triangle"></i> 密码必须一致</span>'
                            +'</div>'
                        +'</div>'
                        +'<div class="hr-line-dashed"></div>'
                        +'<div class="form-group">'
                            +'<div class="col-sm-9 col-sm-offset-3">'
                                +`<button class="btn btn-primary" name="submit" type="submit" disabled="disabled" onclick="repwd('${key}')">修改密码</button>`
                            +'</div>'
                        +'</div>'
                    +'</div>'
                +'</div>'
    });
});
function repwd(key) { 
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
function KeyUp() {
    var a = $('[name="password"]').val();
    var b = $('[name="repassword"]').val();
    if (a == b) {
        $('[name="submit"]').removeAttr('disabled');
        $('[name="repassword-tip"]').hide();
        $('.repwd').removeClass('has-error');
    }
    else {
        $('[name="submit"]').attr('disabled', 'disabled');
        $('[name="repassword-tip"]').show();
        $('.repwd').addClass('has-error');
    }
};


$('#addnew').on("click", function () {
    layer.open({
        type: 1,
        title: '添加新用户',
        skin: 'layui-layer-molv', //加上边框
        area: ['420px', '330px'], //宽高
        content: '<div class="ibox-content">'
                    +'<div class="form-horizontal">'
                        +'<div class="form-group"><label class="col-sm-3 control-label">用户名</label>'
                            +'<div class="col-sm-9"><input id="username" type="text" class="form-control" /></div>'
                        +'</div>'
                        +'<div class="form-group"><label class="col-sm-3 control-label">新密码</label>'
                            +'<div class="col-sm-9"><input id="password" name="password" type="password" class="form-control" onkeyup=KeyUp() /></div>'
                        +'</div>'
                        +'<div class="form-group repwd"><label class="col-sm-3 control-label">重复密码</label>'
                            +'<div class="col-sm-9"><input name="repassword" type="password" class="form-control" onkeyup=KeyUp() />'
                                +'<span name="repassword-tip" class="help-block m-b-none text-danger" style="display:none"><i class="fa fa-exclamation-triangle"></i> 密码必须一致</span>'
                            +'</div>'
                        +'</div>'
                        +'<div class="hr-line-dashed"></div>'
                        +'<div class="form-group">'
                            +'<div class="col-sm-9 col-sm-offset-3">'
                                +'<button class="btn btn-primary" name="submit" type="submit" disabled="disabled" onclick="addu()">修改密码</button>'
                            +'</div>'
                        +'</div>'
                    +'</div>'
                +'</div>'
    });
});

function addu() { 
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

function addtr(username) {
    get('getuser', {
        'username': username
    }).then((d) => {
        // console.log(d);
        let newtr = `<tr><td>${d.username}</td>`
                    +`<td>${d.lastip}</td>`
                    +`<td>${d.lasttime}</td>`
                    +`<td>${d.login_size}</td>`
                    +`<td>${d.created_time}</td>`
                    +`<td><div name="changepwd" data-key="${d.username}" class="btn btn-primary btn-xs">修改密码</div>`
                    +` <div name="remove" class="btn btn-danger btn-xs" data-key="${d.username}">删除</div></td></tr>`;
        $('#admin').append(newtr);
    }).catch((err) => {
        layer.msg('失败');
    });
};

function removeuser(key, $this) {
    console.log($this.parents('tr'));
    
};