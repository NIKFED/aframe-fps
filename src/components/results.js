import Table from "../basic/table";

AFRAME.registerComponent('get-results', {
    schema: {
        data: {default: null}
    },

    init: function () {
        this.el.addEventListener('data-uploaded', this.createTable.bind(this));
        this.getResult();
    },

    createTable: function () {
        let table = new Table('0 0 0', '0 0 0', this.el);
        table.createEntity();
        if (this.schema.data) {
            this.schema.data.forEach(function (item) {
                table.addRow(item.username, item.score);
            })
        }
    },

    getResult: function () {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', evt => {

            if (xhr.status == 200) {
                let data = JSON.parse(xhr.response);
                this.schema.data = data['data'];
                this.el.emit('data-uploaded');
            }

        });

        xhr.open('get', '/api/results/get', true);
        xhr.send();
    }
});
