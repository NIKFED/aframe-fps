export default class Table {
    constructor(position, rotation, parent) {
        this.position = position;
        this.rotation = rotation;
        this.parent = parent;
        this.currentRowId = 0;
        this.rowPosition = {
            x: 0,
            y: 4,
            z: -5
        };
    }

    createEntity() {
        let scene = this.parent;

        this.table = document.createElement('a-entity');

        scene.appendChild(this.table);

        this.table.setAttribute('id', 'table');
        this.table.setAttribute('geometry', {
            primitive: 'plane',
            width: 4,
            height: 4
        });
        this.table.setAttribute('material', {
            opacity: 0
        });
        this.table.setAttribute('rotation', this.rotation);
        this.table.setAttribute('position', this.position);
    }

    addRow(username, score) {
        let row = document.createElement('a-entity');

        row.setAttribute('id', 'row' + this.currentRowId);
        this.currentRowId++;
        row.setAttribute('scale', '3 3 3');
        row.object3D.position.set(this.rowPosition.x,
            this.rowPosition.y,
            this.rowPosition.z);
        this.rowPosition.y--;

        this.table.appendChild(row);

        let colUsername = document.createElement('a-entity');
        let colScore = document.createElement('a-entity');

        row.appendChild(colUsername);
        row.appendChild(colScore);
        colUsername.setAttribute('text', {
            value: username,
            align: 'center',
            color: 'grey',
            width: 6,
            font: 'kelsonsans'
        });
        colUsername.setAttribute('position', '-1 0 0');
        colScore.setAttribute('text', {
            value: score,
            align: 'center',
            color: 'grey',
            width: 6,
            font: 'kelsonsans'
        });
        colScore.setAttribute('position', '1 0 0');
    }
}
