require(["require.config"], () => {
    require(['url', 'template', 'header', 'footer', 'zoom', 'fly'], (url, template, header) => {
        // header 返回实例 接受 调用原型方法
        class Detail {
            constructor() {
                // 关于详情页的数据重新请求新的rap2会价格等变化 但是十几种都是后台的事 会统一的 

                // 按钮 点击 给到 对应 li class on 
                // 并且重新执行ajax请求 图片和价格
                // 部分 点击只给on 不需要ajax
                // 一个事件委托 先处理点击界面变化  后处理数据请求
                this.bindEvents();
                this.getType();
                this.addCart();
                // 请求数据 渲染
            }
            
            bindEvents(){
                // 思路 e中点击次数 不做
                // 版本点击 test
                $('#form-spec-item-num1').on('click', 'li', (e) => {
                    let target = e.target;
                    $('#form-spec-item-num1 > ul > li').removeClass('on');
                    $(target).addClass('on');
                })
                // 颜色
                $('#form-spec-item-num2').on('click', (e) => {
                    let target = e.target;
                    // 简单方法 li和子元素起相同class  全部加class on 否则 复杂 判断
                    $('#form-spec-item-num2 > ul > li').removeClass('on');
                    if(target.tagName === 'A'){
                        $(target).parent('li').addClass('on');
                    }else if(target.tagName === 'LI'){
                        $(target).addClass('on');
                    }
                    $('#form-spec-item-num2-disabled').removeClass('on');
                })
                // 选择套餐
                $('#form-spec-item-num3').on('click', (e) => {
                    let target = e.target;
                    $('#form-spec-item-num3 > ul > li').removeClass('on');
                    if(target.tagName === 'DFN'){
                        $(target).parent('p').parent('li').addClass('on');
                    }else if(target.tagName === 'H2'){
                        $(target).parent('li').addClass('on');
                    }else if(target.tagName === 'P'){
                        $(target).parent('li').addClass('on');
                    }else if(target.tagName === 'SPAN'){
                        $(target).parent('p').parent('li').addClass('on');
                    }else if(target.tagName === 'LI'){
                        $(target).addClass('on');
                    }
                })
                // 手机服务
                $('#form-spec-item-num4').on('click', (e) => {
                    let target = e.target;
                    $('#form-spec-item-num4 > ul > li').removeClass('on');
                    if(target.tagName === 'DIV'){
                        if(target.className == 'service-item-hd'){
                            $(target).parent('li').addClass('on');
                        }else{
                            $(target).parent('div').parent('li').addClass('on');
                        }
                    }else if(target.tagName === 'LABEL'){
                        $(target).parent('div').parent('div').parent('li').addClass('on');
                    }else if(target.tagName === 'SPAN'){
                        $(target).parent('div').parent('div').parent('li').addClass('on');
                    }else if(target.tagName === 'DFN'){
                        $(target).parent('span').parent('div').parent('div').parent('li').addClass('on');
                    }else if(target.tagName === 'LI'){
                        $(target).addClass('on');
                    }
                })
                // 分期付款
                $('#fenqi-pay').on('click', (e) => {
                    let target = e.target;
                    // 简单方法 li和子元素起相同class  全部加class on 否则 复杂 判断
                    $('#fenqi-pay > ul > li').removeClass('on');
                    if(target.tagName === 'P'){
                        $(target).parent('li').addClass('on');
                    }else if(target.tagName === 'DFN'){
                        $(target).parent('p').parent('li').addClass('on');
                    }else if(target.tagName === 'H2'){
                        $(target).parent('li').addClass('on');
                    }else if(target.tagName === 'LI'){
                        $(target).addClass('on');
                    }
                })
            }
            getType() {
                // 从url中取id 携带id请求购物车
                let id = Number(location.search.slice(4));
                let num = $('#list-pay-num-input').val();
                
                $.get(url.rapBaseUrl + 'detail/right', {id}, res => {
                    if(res.res_code === 1) {
                        let {data} = res.res_body;
                        data = {...data, id}; // 当接口变成真实接口的时候，这句代码不需要
                        data = {...data, num}; 
                        this.data = data;
                        console.log(data);
                        this.renderDatailRightTop(data);
                        this.renderDatailRightBottom(data);
                        this.renderLeft(data);
                    }
                });
            }
            renderDatailRightTop(data) {
                let html = template("now-price-content", {data});
                $("#now-price-container").html(html);
            }
            renderDatailRightBottom(data) {
                let html = template("choiceTotal-box-content", {data});
                $("#choiceTotal-box-container").html(html);
            }
            renderLeft(data){
                $("#prod-left-container").html(template("prod-left-content", {data}));
                this.zoom();
            }
            addCart() {
                //事件委托 
                // 意义 按钮在某些页面可能是渲染过来的 需要请求和反应 需要开始页面存在的容器取寻找
                console.log(1);
                $('#add-cart').on('click', e => {
                    // 格式？
                    // console.log(this.data);
                    $(`<img src='${this.data.imgs[0]}' style='width:30px;height:30px'>`).fly({
                        start: {
                            //点击按钮
                            left:e.clientX,
                            top:e.clientY
                        },
                        end: {
                            // 购物车容器
                            left: $('#car-num').offset().left,
                            top: $('#car-num').offset().top
                        },
                        onEnd: function () {
                            this.destroy();//销毁抛物
                            console.log(header);
                            header.calcCartNum();//调用一次计算购物车的数量方法
                        }
                    });
                    let cart = localStorage.getItem('cart');
                    // let checked = "checked";
                    if(cart) {
                        cart = JSON.parse(cart);
                        // 不为空 判断再次存的是新的还是已经存在的
                        // num++ 或者 num=1
                        let index= -1;
                        if(cart.some((shop, i) => {
                            index = i;
                            // 购物车中是否已经存在该条id商品
                            return shop.id === this.data.id;
                        })){
                            // has
                            cart[index].num++;
                        }else{
                            //none
                            cart.push({...this.data, num: 1, checked: "checked"});
                        }
                    }else{
                        // 为空 cart = 当前商品且num = 1
                        // 为何只能解构赋值 不能checked : checked
                        // 可以的  亦可以解构
                        cart = [{...this.data, num: 1, checked: "checked"}];
                    }
                    // 每次操作完成重新存cart
                    // localStorage 数据为字符串
                    localStorage.setItem('cart', JSON.stringify(cart));
                })
            }
            zoom () {
                // 放大镜插件
                $(".zoom-img").elevateZoom({
                  gallery:'gal1',
                  cursor: 'pointer',
                  galleryActiveClass: 'active',
                  borderSize:'1',    
                  borderColor:'#888'
                });
              }
        }
        new Detail();
    })
})