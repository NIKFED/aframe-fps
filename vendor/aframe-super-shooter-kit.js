!function (e) {
    var t = {};

    function i(n) {
        if (t[n]) return t[n].exports;
        var l = t[n] = {i: n, l: !1, exports: {}};
        return e[n].call(l.exports, l, l.exports, i), l.l = !0, l.exports
    }

    i.m = e, i.c = t, i.d = function (e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
    }, i.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, i.t = function (e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var l in e) i.d(n, l, function (t) {
            return e[t]
        }.bind(null, l));
        return n
    }, i.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return i.d(t, "a", t), t
    }, i.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i.p = "", i(i.s = 0)
}([function (e, t) {
    if ("undefined" == typeof AFRAME) throw new Error("Component attempted to register before AFRAME was available.");
    AFRAME.registerComponent("shooter", {
        schema: {
            activeBulletType: {type: "string", default: "normal"},
            bulletTypes: {type: "array", default: ["normal"]},
            cycle: {default: !1}
        }, init: function () {
            this.el.addEventListener("shoot", this.onShoot.bind(this)), this.el.addEventListener("changebullet", this.onChangeBullet.bind(this)), this.bulletSystem = this.el.sceneEl.systems.bullet
        }, onShoot: function () {
            this.bulletSystem.shoot(this.data.activeBulletType, this.el.object3D)
        }, onChangeBullet: function (e) {
            var t, i = this.data, n = this.el;
            if ("next" === e.detail) {
                if (-1 === (t = i.bulletTypes.indexOf(i.activeBulletType))) return;
                return t = i.cycle ? (t + 1) % i.bulletTypes.length : Math.min(i.bulletTypes.length - 1, t + 1), i.activeBulletType = i.bulletTypes[t], void n.setAttribute("shooter", "activeBulletType", i.bulletTypes[t])
            }
            if ("prev" === e.detail) {
                if (-1 === (t = i.bulletTypes.indexOf(i.activeBulletType))) return;
                return t = i.cycle ? (t - 1) % i.bulletTypes.length : Math.max(0, t - 1), i.activeBulletType = i.bulletTypes[t], void n.setAttribute("shooter", "activeBulletType", i.bulletTypes[t])
            }
            n.setAttribute("shooter", "activeBulletType", e.detail)
        }
    }), AFRAME.registerComponent("bullet", {
        dependencies: ["material"],
        schema: {
            damagePoints: {default: 1, type: "float"},
            maxTime: {default: 4, type: "float"},
            name: {default: "normal", type: "string"},
            poolSize: {default: 10, type: "int", min: 0},
            speed: {default: 8, type: "float"}
        },
        init: function () {
            var e = this.el;
            e.object3D.visible = !1, e.addEventListener("object3dset", t => {
                e.sceneEl.systems.bullet.registerBullet(this)
            })
        }
    }), AFRAME.registerSystem("bullet", {
        init: function () {
            var e;
            (e = document.createElement("a-entity")).id = "superShooterBulletContainer", this.el.sceneEl.appendChild(e), this.container = e.object3D, this.pool = {}, this.targets = []
        }, registerBullet: function (e) {
            var t, i, n, l;
            if (l = e.el.object3D) for (i = e.data, this.pool[i.name] = [], n = 0; n < i.poolSize; n++) (t = l.clone()).damagePoints = i.damagePoints, t.direction = new THREE.Vector3(0, 0, -1), t.maxTime = 1e3 * i.maxTime, t.name = i.name + n, t.speed = i.speed, t.time = 0, t.visible = !1, this.pool[i.name].push(t)
        }, registerTarget: function (e, t) {
            var i;
            this.targets.push(e.el), t && ((i = e.el.object3D).boundingBox = (new THREE.Box3).setFromObject(i))
        }, shoot: function (e, t) {
            var i, n = 0, l = 0, o = this.pool[e];
            if (void 0 === o) return null;
            for (i = 0; i < o.length; i++) {
                if (!1 === o[i].visible) return this.shootBullet(o[i], t);
                o[i].time > l && (n = i, l = o[i].time)
            }
            return this.shootBullet(o[n], t)
        }, shootBullet: function (e, t) {
            return e.visible = !0, e.time = 0, t.getWorldPosition(e.position), t.getWorldDirection(e.direction), e.direction.multiplyScalar(-e.speed), this.container.add(e), e
        }, tick: function () {
            var e = new THREE.Box3, t = new THREE.Vector3, i = new THREE.Box3;
            return function (n, l) {
                var o, r, s, a, u;
                for (r = 0; r < this.container.children.length; r++) if ((o = this.container.children[r]).visible) if (o.time += l, o.time >= o.maxTime) this.killBullet(o); else for (t.copy(o.direction).multiplyScalar(l / 850), o.position.add(t), e.setFromObject(o), u = 0; u < this.targets.length; u++) {
                    let t = this.targets[u];
                    if (t.getAttribute("target").active && ((a = t.object3D).visible && (s = !1, a.boundingBox ? s = a.boundingBox.intersectsBox(e) : (i.setFromObject(a), s = i.intersectsBox(e)), s))) {
                        this.killBullet(o), t.components.target.onBulletHit(o), t.emit("hit", null);
                        break
                    }
                }
            }
        }(), killBullet: function (e) {
            e.visible = !1
        }
    }), AFRAME.registerComponent("target", {
        schema: {
            active: {default: !0},
            healthPoints: {default: 1, type: "float"},
            static: {default: !0}
        }, init: function () {
            var e = this.el;
            e.addEventListener("object3dset", t => {
                e.sceneEl.systems.bullet.registerTarget(this, this.data.static)
            })
        }, update: function (e) {
            this.healthPoints = this.data.healthPoints
        }, onBulletHit: function (e) {
            this.data.active && (this.lastBulletHit = e, this.healthPoints -= e.damagePoints, this.healthPoints <= 0 && this.el.emit("die"))
        }
    })
}]);