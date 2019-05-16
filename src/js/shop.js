require(['require.config'], () => {
    require(['url', 'template', 'footer', 'header'], (url, template, header) => {
        class Shop {
            constructor() {
                // localStorage 意义 下一次打开页面 选中 未选中未变化
                this.bindEvents();
                // 刚开始也要渲染shop
                this.getTypeByLocalStorage();
                // render 整个渲染
                this.is = 1;
                //默认全选 事件委托判定
                // 删除 全选逻辑
                this.checkMethod();
            }
            // 全选 与再次点击反选的 逻辑方法
            
            checkMethod() {
                // 初始掉一次方法
                // 每次点击操作发生 还需要判断调用
                // cart 不能绑在this上  每次需要重新去 
                // 为何不能绑在this上  取的 undefined 
                // 遍历item or 页面寻找每条商品 若均被checked则全选为true
                let cart = localStorage.getItem('cart');
                cart = JSON.parse(cart);
                let is = 1;
                cart.forEach((item,i) => {
                    // item 存在 checked: checked 是样式生效
                    // console.log(item.checked);
                    is *= item.checked === "checked" ? true : false;
                    // console.log(is);
                }); 
                // console.log(is);
                // 初始和点击商品的被其他地方存过 不需要再次存
                if(is){
                    // $('.checkbox').addClass('checked');
                    $('#all-top').addClass('checked');
                    $('#all-bottom').addClass('checked');
                }else{
                    $('#all-top').removeClass('checked');
                    $('#all-bottom').removeClass('checked');
                }
                // 点击全选  按钮交互 以及存localStorage 
                $('#content').on('click', '.all-check', (e, item) => {
                    let target = e.target;
                    // 逻辑  因为首次进入时全选 则奇数次点击全选取消 子项目移除class
                    // 偶数次点击全选选中 子项目添加class
                    let is = 1;
                    // let cart = localStorage.getItem('cart');
                    // cart = JSON.parse(cart);
                    // console.log(item);
                    // undefined
                    // forEach 中

                    cart.forEach((item,i) => {
                        is *= item.checked === "checked" ? true : false;
                    }); 
                    if(is){
                        $('.checkbox').removeClass('checked');
                        cart.forEach((item,i) => {
                            item.checked = "";
                        }); 
                    }else{
                        $('.checkbox').addClass('checked');
                        cart.forEach((item,i) => {
                            item.checked = "checked";
                        });
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    // bug 单次点击 触发多次
                });
            }
            bindEvents() {
                // 绑定事件 全选 反选 遍历cart item  绑定 
                // 不需要请求就存在的祖辈元素委托
                // 初始 按钮均被 checked 
                // 按钮 class check 
                // console.log(this.is);
                // checked 存入llocalStorage 渲染shop取出来
                // 在登录状态下和非登陆状态下有区别 不做
                // detail页面无checked shop页面渲染无checked 则默认第一次全选
                // 否则有的话按照checked的渲染并响应全选与反选按钮
                // 去localStorage cart
                // 写入localstorage checked当前状态
                // 写入方法 先取出cart 在修改 checked  和开关关联
                // 统一事件源 每次点击++ 奇数偶数 是否被整除 判断条件
                //初始选中 第一次点击取消选择 即移除checked
                this.getTypeByLocalStorage();
                $('#content').on('click', (e) => {
                    let target = e.target;
                    let cart = localStorage.getItem('cart');
                    // 能点击 一定存在商品 不需要判断
                    // 是数字
                    // console.log(item.id);
                    // 是字符串
                    // console.log($(target).parents('.prod-list-wrap').attr("data-id"));
                    // 挂载在需要比对的源父级上 自定义属性
                    // item 对象解构 cart数组push
                    // 法二 ： 商品第一次添加
                    cart = JSON.parse(cart);
                    
                    if(this.is++ % 2){
                        $(target).removeClass('checked');
                        cart.forEach((item,i) => {
                            if(item.id === Number($(target).parents('.prod-list-wrap').attr("data-id"))){
                                // console.log(item);
                                item.checked = "";
                            }
                        }); 
                    }else{
                        $(target).addClass('checked'); 
                        cart.forEach((item,i) => {
                            if(item.id === Number($(target).parents('.prod-list-wrap').attr("data-id"))){
                                // console.log(item);
                                item.checked = "checked";
                            }
                        });
                    }
                    
                    // 改变值后写入cart
                    localStorage.setItem('cart', JSON.stringify(cart));
                    // 判断点击后是否全选
                    // 存完改变的值
                    this.checkMethod();
                    // 不需要调用渲染 移除class 已经动态了 
                    // render 少用 网页稳定 局部 非请求 使用js DOM  
                });
            }
            
            // 从localStorage 取数据 若存在 则渲染 
            // console.log(cart);
            // 判断数据 item项 num = 1 第一次存入 则默认给勾选checked
            // 存在且num>1 则取其中的checked 
            // 多次 是个循环 or forEach渲染每一item
            // 全选等的响应 
            // 判断当前item的num并分别渲染
            // 渲染通过localstorage的checked
            // 每次事件"移入 移除" class
            getTypeByLocalStorage() {
                let cart = localStorage.getItem('cart');
                if(cart) {
                    
                    cart = JSON.parse(cart);
                    // cart.forEach((item,i) => {
                    //     console.log('exit');
                    //     if(item.num === 1){
                    //     console.log('exit');
                    //         // 法二 ： 商品第一次添加
                    //         // 对象方法. 数组方法 push  
                    //         item.checked = "true";
                    //     }else{
                    //         // 改变ckecked在bingevents 点击中每一次改变写入
                    //     }
                    // });
                    localStorage.setItem('cart', JSON.stringify(cart));
                    this.render(cart);
                }else{
                    // 提示购物车为空
                    alert('求你了，买一件吧，老板跑路了，打折好商量的嘛！！！')
                }
            }
            render (cart) {
                // console.log(cart);
                // 渲染 checked 方法  item.checked checked  或者 空
                // 因为 checked是一个 css样式
                $("#wrap-shop-list-container").html(template('wrap-shop-list-content', {cart}));
            }   
            // renderCheck (cart) {
            //     // 读取checked if  add  remove
            //     // id 找 当前商品
            // }
        }
        new Shop();
    })
})