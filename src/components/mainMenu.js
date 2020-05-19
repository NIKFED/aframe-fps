AFRAME.registerComponent('login', {
    schema: {
        string: {default: ''}
    },

    init: function () {
        this.schema.string = '';
        this.el.addEventListener("click", this.displayForm.bind(this));
        document.addEventListener('keydown', this.usernameInput.bind(this));
    },

    displayForm: function () {
        let form = document.getElementById('form');
        form.setAttribute('visible', 'true');
    },

    usernameInput: function () {
        let username = document.getElementById('username');
        if (event.keyCode === 8) { // BackSpace
            this.schema.string = this.schema.string.slice(0, this.schema.string.length - 1);
            username.setAttribute('text', {
                value: this.schema.string
            });
        }
        else if (event.keyCode !== 13) { // not Enter
            this.schema.string = this.schema.string + event.key;
            username.setAttribute('text', {
                value: this.schema.string
            });
        } else {
            const xhr = new XMLHttpRequest();

            xhr.open('post', '/api/username/register', true);
            let userName = username.getAttribute('text').value;

            let formData = new FormData();
            formData.append("username", userName);

            xhr.send(formData);
            window.location.href = '/game';
        }
    }
});

AFRAME.registerComponent('result', {
    init: function () {
        this.el.addEventListener("click", function (event) {
            window.location.href = "/results";
        });
    }
});

AFRAME.registerComponent('menu', {
    init: function () {
        this.el.addEventListener("click", function (event) {
            window.location.href = "/menu";
        });
    }
});

AFRAME.registerComponent('help', {
    init: function () {
        this.el.addEventListener("click", function (event) {
            let form = document.getElementById('instruction');
            form.setAttribute('visible', 'true');
        });
    }
});