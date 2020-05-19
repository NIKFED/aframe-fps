export default class Score {
    constructor(points, position, rotation, parent) {
        this.points = points;
        this.position = position;
        this.rotation = rotation;
        this.parent = parent;
    }

    createEntity() {
        let menu = document.getElementById(this.parent);

        this.score = document.createElement('a-entity');

        menu.appendChild(this.score);

        this.score.setAttribute('id', 'score');
        this.score.setAttribute('geometry', {
            primitive: 'plane',
            width: 1,
            height: 1
        });
        this.score.setAttribute('material', {
            opacity: 0
        });
        this.score.setAttribute('rotation', this.rotation);
        this.score.setAttribute('position', this.position);
        this.score.setAttribute('text', {
            value: this.points,
            align: 'center',
            color: 'red',
            width: 30,
            height: 5,
            wrapCount: 40
        });
    }

    changePoints() {
        this.score.setAttribute('text', {
            value: this.points
        });
    }
}
