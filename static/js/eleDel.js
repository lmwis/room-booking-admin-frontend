/*
 * @Author: https://github.com/WangEn
 * @Author: https://gitee.com/lovetime/
 * @Date:   2018-03-27
 * @lastModify 2018-3-28
 * +----------------------------------------------------------------------
 * | WeAdmin 表格table中多个删除等操作公用js
 * | 有改用时直接复制到对应页面也不影响使用
 * +----------------------------------------------------------------------
 */
layui.extend({
	admin: '{/}../../static/js/admin'
});
layui.use(['laydate', 'jquery', 'admin'], function() {
	var laydate = layui.laydate,
		$ = layui.jquery,
		admin = layui.admin;
	//执行一个laydate实例
	laydate.render({
		elem: '#start' //指定元素
	});
	//执行一个laydate实例
	laydate.render({
		elem: '#end' //指定元素
	});
	/*用户-停用*/
	window.member_stop = function (obj, id) {
		layer.confirm('确认要停用吗？', function(index) {
			if($(obj).attr('title') == '启用') {

				//发异步把用户状态进行更改
				$(obj).attr('title', '停用')
				$(obj).find('i').html('&#xe62f;');

				$(obj).parents("tr").find(".td-status").find('span').addClass('layui-btn-disabled').html('已停用');
				layer.msg('已停用!', {
					icon: 5,
					time: 1000
				});

			} else {
				$(obj).attr('title', '启用')
				$(obj).find('i').html('&#xe601;');

				$(obj).parents("tr").find(".td-status").find('span').removeClass('layui-btn-disabled').html('已启用');
				layer.msg('已启用!', {
					icon: 5,
					time: 1000
				});
			}
		});
	}

	/*用户-删除*/
	window.member_del = function (obj, id) {
        console.log("进行删除");
		layer.confirm('确认要删除吗？', function(index) {
			//发异步删除数据
            $.ajax({
                url: hostPre + "api/v1/applications/" + id + "?role=admin",
                // url: "http://localhost:9200/application/_doc/"+id,
                type: "delete",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                success: function (res) {
                    if(res.status=="success"){
                        $(obj).parents("tr").remove();
                        layer.msg('已删除!', {
                            icon: 1,
                            time: 1000
                        });
                    }else{
                        layer.msg('删除失败!', {
                            icon: 2,
                            time: 1000
                        });
					}
                },
                error: function (res) {
                    if (res.status === 401) {
                        console.log("未授权");
                        parent.window.location.href = '../../login.html';
                        localStorage.removeItem("token");
                    } else {

                    }
                }
            });
		});
	}

	window.delAll = function (argument) {
		var data = tableCheck.getData();
		layer.confirm('确认要删除吗？' + data, function(index) {
			//捉到所有被选中的，发异步进行删除
			layer.msg('删除成功', {
				icon: 1
			});
			$(".layui-form-checked").not('.header').parents('tr').remove();
		});
	}
	
});