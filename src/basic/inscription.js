export default class Inscription {
    constructor(name, position, rotation, parent) {
        this.name = name;
        this.position = position;
        this.rotation = rotation;
        this.parent = parent;
    }

    createEntity() {
        console.log('inscription loading');
        let menu = document.getElementById(this.parent);

        this.inscription = document.createElement('a-entity');

        menu.appendChild(this.inscription);

        this.inscription.setAttribute('id', 'inscription');
        this.inscription.setAttribute('geometry', {
            primitive: 'plane',
            width: 5,
            height: 2
        });
        this.inscription.setAttribute('material', {
            opacity: 0
        });
        this.inscription.setAttribute('rotation', this.rotation);
        this.inscription.setAttribute('position', this.position);
        this.inscription.setAttribute('text', {
            value: this.name,
            align: 'center',
            color: 'red',
            width: 30,
            height: 5,
            wrapCount: 40,
            font: 'kelsonsans'
        });
    }

    changeInscription(color) {
        this.inscription.setAttribute('text', {
            value: this.name,
            color: color
        });
    }

    changePosition(position) {
        this.inscription.setAttribute('position', position);
    }
}
