require(['require.config'], () => {
    require(['url', 'template', 'footer', 'header'], (url, template, header) => {
        class Shop {
            constructor() {
                this.bindEvents();
                this.is = 1;
                this.checkMethod();
            }
            // 该方法不是一开始调用 而是每次刷新和从本地存储渲染页面都需要调用
            // 商品初态响应全选 方法被多次调用
            fromShopToAllButton() {
                // render 少用 网页稳定 局部 非请求 使用js DOM  
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
                    $('.all-check').addClass('checked');
                    console.log($('.all-check'));
                }else{
                    console.log("has?");
                    $('.all-check').removeClass('checked');
                }
                this.renderTotalPrice();
            }
            // 全选的按钮点击响应
            checkMethod() {
                let num = 1; 
                $('#content').on('click', '.all-check', (e, item) => {
                    let target = e.target;
                    let is = 1;
                    num++;
                    console.log(num);
                    let cart = localStorage.getItem('cart');
                    cart = JSON.parse(cart);
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
                });
                this.renderTotalPrice();
            }
            // 删除按钮响应
            delResp(target) {
                // 删除响应逻辑
                // 点击 弹出确认  true 遍历cart中的item.id与当前事件源的商品的data-id
                // 相同 删除
                if(confirm('请问您真的真的确认要删除这件商品吗？')){
                    let cart = localStorage.getItem('cart');
                    cart = JSON.parse(cart);
                    // 当前交互 避免使用render 页面迟滞
                    // DOM操作
                    $(target).parents('.prod-list-wrap').remove();
                    cart.forEach((item,i) => {
                        if(item.id === Number($(target).parents('.prod-list-wrap').attr("data-id"))){
                        cart.splice(i, 1);
                        // 下次页面刷新保存了没有该商品
                        localStorage.setItem('cart', JSON.stringify(cart));
                        }
                    }); 
                }
                this.renderTotalPrice();
            }
            bindEvents() {
                this.getTypeByLocalStorage();
                // 商品的删除按钮点击响应
                $('#content').on('click', '.J_delSingle', (e) => {
                    let target = e.target;
                    console.log(target);
                    
                    // 删除按钮响应方法
                    this.delResp(target);
                })

                // 商品的选中按钮点击响应
                $('#content').on('click', '.checkbox-shop', (e) => {
                    let target = e.target;
                    let cart = localStorage.getItem('cart');
                    cart = JSON.parse(cart);
                    if(this.is++ % 2){
                        $(target).removeClass('checked');
                        cart.forEach((item,i) => {
                            if(item.id === Number($(target).parents('.prod-list-wrap').attr("data-id"))){
                                item.checked = "";
                                console.log(item.checked);

                            }
                        }); 
                    }else{
                        $(target).addClass('checked'); 
                        cart.forEach((item,i) => {
                            if(item.id === Number($(target).parents('.prod-list-wrap').attr("data-id"))){
                                item.checked = "checked";
                                console.log(item.checked);
                            }
                        });
                    }
                    // 改变值后写入cart
                    localStorage.setItem('cart', JSON.stringify(cart));
                    // 从商品点击按钮响应全选按钮
                    this.fromShopToAllButton();
                    
                });
                // 全选不需要存localstorage 初态检查  点击则方法判断 并操作商品的cart item checked并存入
            }
            
            getTypeByLocalStorage() {
                let cart = localStorage.getItem('cart');
                if(cart) {
                    cart = JSON.parse(cart);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    this.render(cart);
                }else{
                    // 提示购物车为空
                    alert('求你了，买一件吧，老板跑路了，打折好商量的嘛！！！')
                }
            }
            render (cart) {
                console.log(1);
                this.fromShopToAllButton();
                $("#wrap-shop-list-container").html(template('wrap-shop-list-content', {cart}));
                this.renderTotalPrice();
            }   
            renderTotalPrice() {
                // 删除商品也需要重新渲染
                let cart = localStorage.getItem('cart');
                cart = JSON.parse(cart);
                let totalPrice = 0;
                cart.forEach((item,i) => {
                    // 商品被选中
                    // totalPrice += item.price*item.num;
                    if(item.checked === "checked"){
                        totalPrice += item.price*item.num;
                    }
                });
                totalPrice = totalPrice.toFixed(2);
                $("#sum-area-container").html(template('sum-area-content', {totalPrice}));
            }
        }
        new Shop();
    })
})