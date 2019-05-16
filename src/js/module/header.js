define(['jquery'], $ => {
    function Header () {
        this.container = $("#header-container");
        // header加载完毕 调用方法
        this.load().then(() => {
            this.search();
            this.navAc();
            this.calcCartNum();
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
        search () {
            //搜索框
            $("#search-input").on('keyup', function () {
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
        }
    })

    return new Header();
});