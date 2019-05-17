define(['jquery', 'cookie'], $ => {
    function Header () {
        this.container = $("#header-container");
        // header加载完毕 调用方法
        this.load().then(() => {
            this.navAc();
            this.searchOut();
            this.calcCartNum();
            this.addAttr();
        });
    }

    // 对象合并
    $.extend(Header.prototype, {
        load () {
            return new Promise(resolve => {
                this.container.load('/html/module/header.html', () => {
                    resolve();
                })
            });
        },
        // 点击span显示搜索框  点击 不在当前搜索框范围 隐藏
        searchOut () {
            $('#search').on('click', () => {
                $('#header-hover-container').addClass('no-display');
                // .animate({width:'toggle'},500);
                console.log($('#big-search'));
                // 动画方法本身就有隐藏元素的作用
                $('#big-search').removeClass('no-display');
            });
            this.search();
            $('body').on('click', (e) => {
                let target = e.target;
                console.log(target.closest("#big-search"));
                // .length == 0 无效
                // 判断存在搜索大框 才进入次级if
                if($('#big-search'))
                if(target.closest("#big-search") == undefined){
                    $('#big-search').addClass('no-display');
                    $('#header-hover-container').removeClass('no-display')
                }
            })
        },
        search () {
            //搜索框
            // 动态消失的 #header-hover-container
            // 显示的 #big-search
            // 点击按钮 #search 
            $("#big-search").on('keyup', function () {
                let keyWords = $(this).val();
                // 带上关键字请求jsonp接口
                $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+keyWords, data => {
                  console.log(data);
                })
              })
        },
        navAc () {
            // 事件委托ul
            console.log($('#header-hover-container > .header-hover-ac'));
            $('.header-hover-ac').on('mouseenter', () => {
                $('#header-hover-list').css('display', 'block');
            });
            // test
            $('#IP').hover(() => {console.log(IP)},);
            $('#XP').hover(() => {console.log(XP)},);
            $('#UP').hover(() => {console.log(UP)},);
            // IP hover in
            $('#IP').hover(() => {
                // over
                // 所有的ul均重置为display none 在block 相应的
                $('#header-hover-list > .header-hover-list-display').css('display', 'none');
                $("#I").css('display', 'block').slideDown('slow');                
            },);
            $('#IP').hover(() => {
                // over
                // 所有的ul均重置为display none 在block 相应的
                $('#header-hover-list > .header-hover-list-display').css('display', 'none');
                $("#I").css('display', 'block').slideDown('slow');                
            },);
            $('#NP').hover(() => {
                // over
                // 所有的ul均重置为display none 在block 相应的
                $('#header-hover-list > .header-hover-list-display').css('display', 'none');
                $("#N").css('display', 'block').slideDown('slow');                
            },);
            $('#XP').hover(() => {
                // over
                // 所有的ul均重置为display none 在block 相应的
                $('#header-hover-list > .header-hover-list-display').css('display', 'none');
                $("#X").css('display', 'block').slideDown('slow');                
            },);
            $('#SP').hover(() => {
                // over
                // 所有的ul均重置为display none 在block 相应的
                $('#header-hover-list > .header-hover-list-display').css('display', 'none');
                $("#S").css('display', 'block').slideDown('slow');                
            },);
            $('#ZP').hover(() => {
                // over
                // 所有的ul均重置为display none 在block 相应的
                $('#header-hover-list > .header-hover-list-display').css('display', 'none');
                $("#Z").css('display', 'block').slideDown('slow');                
            },);
            $('#YP').hover(() => {
                // over
                // 所有的ul均重置为display none 在block 相应的
                $('#header-hover-list > .header-hover-list-display').css('display', 'none');
                $("#Y").css('display', 'block').slideDown('slow');                
            },);
            $('#UP').hover(() => {
                // over
                // 所有的ul均重置为display none 在block 相应的
                $('#header-hover-list > .header-hover-list-display').css('display', 'none');
                $("#U").css('display', 'block').slideDown('slow');                
            },);
            $('#header-hover-list').on('mouseleave', () => {
                $('#header-hover-list').css('display', 'none').slideUp('slow');
            });          
        },
        calcCartNum() {
            let cart = localStorage.getItem('cart');
            let num = 0;
            if(cart) {
                cart = JSON.parse(cart);
                // num total
                num = cart.reduce((n, shop) => {
                    n += shop.num;
                    return n;
                }, 0);
            }
            $("#car-num").html('购物车'+(num));
            $("#fixed-shop-num").html(num);
        },
        addAttr() {
            // 获取 两个div  一个显示 一个隐藏
            // 并且对cookie操作
            $('#header-login').addClass('no-display');
            $('#header-welcome').removeClass('no-display');
            // login存cookie 此处取和删  
            // 想显示自己的
            // let username = $.cookie("username");
            // jq 选择器 html(变量);
            // $('#exit') 刚开始 不存在  display 需要事件委托
            $('.header-top-right').on('click', '#exit', (e) => {
                if(confirm("确定要退出登录吗？")){
                    $('#header-login').removeClass('no-display');
                    $('#header-welcome').addClass('no-display');
                    // 删除cookie
                    $.removeCookie("username", { path: '/' });
                }
            });
        }
    })

    return new Header();
});