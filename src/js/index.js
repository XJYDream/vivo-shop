require(["require.config"],() => {
    require(["url", "template", "swiper", "footer", "header"],(url, template,Swiper) => {
        class Index {
            constructor() {
                this.getType();
                this.bannerList();
                this.carousel();
            }
            // 轮播
            carousel() {
                var mySwiper = new Swiper ('.swiper-container', {
                    autoplay: 'true',
                    loop: true, // 循环模式选项
                    
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                      clickable: 'true'
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev'
                    },
                    
                    
                  })        
            }
            // 获取数据 rap2
            getType() {
                // ajax 请求假数据 
                $.get(url.rapBaseUrl + 'index/type-top', data => {
                    if(data.res_code === 1) {
                        // console.log(data);
                        // console.log(data.res_body.list);
                        this.renderUlType(data.res_body.list);
                    }
                });
                $.get(url.rapBaseUrl + 'index/hotSell', data => {
                    if(data.res_code === 1) {
                        // console.log(data);
                        // console.log(data.res_body.list);
                        this.renderPhoneType(data.res_body.list);
                    }
                });
            }
            // 渲染 .banner-out-bottom
            renderUlType(list) {
                let html = template("banner-out-bottom", {list});
                $("#banner-out-bottom-container").html(html);
            }
            // 渲染 .hotSell
            renderPhoneType(list) {
                let html = template("hotSell", {list});
                $("#hotSell-content-container").html(html);
            }
            // banner 弹出菜单
            bannerList() {
                $('.category-a').hover((e) => {
                    $(".category-hover").removeClass("category-ac");
                    let target=e.target;
                    console.log($(target).next(".category-hover"));
                    // jq .next()  :next  + 整理
                    // 对象比较的是指针 创造两个对象 $(this)  $("target + .category-hover") 不等
                    $(target).next(".category-hover").addClass("category-ac");
                    $(target).next(".category-hover").on('mouseleave', () => {
                        // 全部移除 移除当前的会覆盖存在
                        // $(target).next(".category-hover").removeClass("category-ac");
                        $(".category-hover").removeClass("category-ac");
                    });
                });

                //   以下 垃圾代码 还有bug


                // $('#category-phone').on('mouseenter', function () {
                //         // over
                //         //莫名奇妙的bug 菜兮兮的 改好了也忘了
                //         $("#category-phone > .category-hover").addClass("category-ac");
                //         $(".category-hover").on('mouseleave', () => {
                //             $("#category-phone > .category-hover").removeClass("category-ac");
                //         })
                //     }
                // );
                // $('#category-charge').on('mouseenter', function () {
                //         // over
                //         $("#category-charge > .category-hover").addClass("category-ac");
                //         $(".category-hover").on('mouseleave', () => {
                //             $("#category-charge > .category-hover").removeClass("category-ac");
                //         })
                //     }
                // );
                // $('#category-music').on('mouseenter', function () {
                //         // over
                //         $("#category-music > .category-hover").addClass("category-ac");
                //         $(".category-hover").on('mouseleave', () => {
                //             $("#category-music > .category-hover").removeClass("category-ac");
                //         })
                //     }
                // );
                // $('#category-part').on('mouseenter', function () {
                //         // over
                //         $("#category-part > .category-hover").addClass("category-ac");
                //         $(".category-hover").on('mouseleave', () => {
                //             $("#category-part > .category-hover").removeClass("category-ac");
                //         })
                //     }
                // );
                // $('#category-mind').on('mouseenter', function () {
                //         // over
                //         $("#category-mind > .category-hover").addClass("category-ac");
                //         $(".category-hover").on('mouseleave', () => {
                //             $("#category-mind > .category-hover").removeClass("category-ac");
                //         })
                //     }
                // );
                // $('#category-pic').on('mouseenter', function () {
                //         // over
                //         $("#category-pic > .category-hover").addClass("category-ac");
                //         $(".category-hover").on('mouseleave', () => {
                //             $("#category-pic > .category-hover").removeClass("category-ac");
                //         })
                //     }
                // );
                // $('#category-life').on('mouseenter', function () {
                //         // over
                //         $("#category-life > .category-hover").addClass("category-ac");
                //         $(".category-hover").on('mouseleave', () => {
                //             $("#category-life > .category-hover").removeClass("category-ac");
                //         })
                //     }
                // );
            } 
        }
        new Index();
    })
})