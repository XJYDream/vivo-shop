require(["require.config"], () => {
    require(["url", 'jquery', 'header', 'cookie'],(url, $, header) => {
        // 未使用header footer  jQuery需要引入 否则$undefined
        class Login {
            constructor() {
                this.usernameInput = $('#input-username');
                this.passwordInput = $('#input-userpwd');
                this.btn = $('#login-btn');
                this.bindEvents();
            }
            bindEvents() {
                this.btn.on("click" ,() => {
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val();
                    console.log(1);
                    $.ajax({
                        url: url.phpBaseUrl + "/user/login.php",
                        type: "post",
                        data: {username, password},
                        success: data => {
                            if(data.res_code === 1) {
                            this.loginDone(username);
                            }
                        },
                        dataType: 'json'
                    })
                    
                })
            }
            loginDone (username) {
                // 依赖jQuery的插件存cookie
                $.cookie('username', username);
                alert('登陆成功，即将跳转首页');
                location.href = "/";
                // 本页面没有header
                // 跳转后不执行该页面的业务逻辑
                // header.addAttr();
            }

        }
        new Login();
    })
})