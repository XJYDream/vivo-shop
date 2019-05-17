require(['require.config'], () => {
    require(['url', 'jquery'], (url) => {
      class Register {
        constructor () {
          this.usernameInput = $("#vivo-username");
          this.passwordInput = $("#vivo-userpwd");
          this.btn = $("#register-btn");
          this.bindEvents();
        }
        // 写入数据库 不存cookie
        // 用$引用jquery
        bindEvents () {
          this.btn.on("click", () => {
            // 取用户名和密码提交后台
            let username = this.usernameInput.val(),
                password = this.passwordInput.val();
            // 数据库写入注册数据 成功返回 跳转
            $.ajax({
              url: url.phpBaseUrl + "/user/register.php",
              type: "post",
              data: {username, password},
              success: data => {
                if(data.res_code === 1) {
                  alert(data.res_message+", 即将跳转登录页");
                  location.href='login.html';
                }
              },
              dataType: 'json'
            })
            
          })
        }
      }
      new Register();
    })
  })