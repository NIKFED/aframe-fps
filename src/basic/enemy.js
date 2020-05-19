export default class Enemy {
    constructor(index, position, rotation, parent, nameModel) {
        this.index = index;
        this.position = position;
        this.rotation = rotation;
        this.parent = parent;
        this.nameModel = nameModel;
        this.isMovement = false;
        this.name = this.getNameModelByIndex();
        this.cameraName = this.getCameraNameByIndex();
    }

    createEntity() {
        console.log('enemy loading');
        let parent = document.getElementById(this.parent);

        this.enemy = document.createElement('a-entity');

        parent.appendChild(this.enemy);

        this.enemy.setAttribute('id', this.name);
        this.enemy.setAttribute('class', 'enemy');
        this.enemy.setAttribute('scale', '2 2 2');
        this.enemy.object3D.position.set(this.position.x,
            this.position.y,
            this.position.z);
        this.enemy.object3D.rotation.set(this.rotation.x,
            this.rotation.y,
            this.rotation.z);
        this.enemy.setAttribute('hit-handler', '');
        this.enemy.setAttribute('target', {
            healthPoints: ASHOOTER.settings.healthEnemy,
            static: false
        });

        // camera
        this.camera = document.createElement('a-entity');

        this.enemy.appendChild(this.camera);

        this.camera.setAttribute('id', this.cameraName);
        this.camera.setAttribute('class', 'camera-enemy');
        this.camera.object3D.position.set(ASHOOTER.enemyInfo.camera.position.x,
            ASHOOTER.enemyInfo.camera.position.y,
            ASHOOTER.enemyInfo.camera.position.z);
        this.camera.object3D.rotation.set(ASHOOTER.enemyInfo.camera.rotation.x,
            ASHOOTER.enemyInfo.camera.rotation.y,
            ASHOOTER.enemyInfo.camera.rotation.z);
        this.camera.setAttribute('shooter', '');
        // this.camera.setAttribute('enemy-camera', '');

        // mesh
        this.mesh = document.createElement('a-entity');

        this.enemy.appendChild(this.mesh);

        this.mesh.setAttribute('gltf-model', this.getModelByNameModel());
        this.mesh.setAttribute('position',  this.getMeshPositionByNameModel());
        this.mesh.setAttribute('rotation',  this.getMeshRotationByNameModel());
        this.mesh.setAttribute('scale', this.getScaleByNameModel());

        // gun
        this.gun = document.createElement('a-entity');

        this.enemy.appendChild(this.gun);

        this.gun.setAttribute('gltf-model', '#bullet');
        this.gun.setAttribute('position',  ASHOOTER.modelInfo.gun.position);
        this.gun.setAttribute('rotation',  ASHOOTER.modelInfo.gun.rotation);
        this.gun.setAttribute('scale', ASHOOTER.modelInfo.gun.scale);
    }

    getNameModelByIndex() {
        return 'enemy' + this.index;
    }

    getCameraNameByIndex() {
        return 'camera-enemy' +  this.index;
    }

    getModelByNameModel() {
        return '#' + this.nameModel;
    }

    getScaleByNameModel() {
        switch (this.nameModel) {
            case 'stitch':
                return ASHOOTER.modelInfo.stitch.scale;
            case 'yuna':
                return ASHOOTER.modelInfo.yuna.scale;
        }
    }

    getMeshPositionByNameModel() {
        switch (this.nameModel) {
            case 'stitch':
                return ASHOOTER.modelInfo.stitch.position;
            case 'yuna':
                return ASHOOTER.modelInfo.yuna.position;
        }
    }

    getMeshRotationByNameModel() {
        switch (this.nameModel) {
            case 'stitch':
                return ASHOOTER.modelInfo.stitch.rotation;
            case 'yuna':
                return ASHOOTER.modelInfo.yuna.rotation;
        }
    }
}
