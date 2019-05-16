require(["require.config"], () => {
    require(["url", "template", "swiper", "footer", "header"],(url, template, Swiper) => {
        class List {
            constructor() {
                this.getType();
            }
            getType() {
                // rap2 名字 起错
                $.get(url.rapBaseUrl + 'detail/list', data => {
                    if(data.res_code === 1) {
                        // console.log(data);
                        // console.log(data.res_body.list);
                        this.renderListType(data.res_body.list);
                    }
                });
            }
            renderListType(list) {
                console.log(list);
                let html = template("list-content-template", {list});
                $("#list-content-container").html(html);
            }
        }
        new List();
    })
})