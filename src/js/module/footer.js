// 编辑器自动生成 导致页面不能被引入
// import { resolve } from "path";

define(['jquery'], $ => {
    function Footer () {
        this.container = $("#footer-container");
        this.load();
    }
    $.extend(Footer.prototype, {
        load () {
            return new Promise(resolve => {
                this.container.load('/html/module/footer.html', () => {
                    resolve();
                })
            });
        }
    })
    return new Footer();
});