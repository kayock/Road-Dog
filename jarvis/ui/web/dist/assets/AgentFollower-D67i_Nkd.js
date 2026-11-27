import { Bc as require_jsx_runtime, Ec as create, Oc as useQuery, Sa as fetchPets, Xc as require_react, Zt as useReducedMotion, da as pickActivePet, tl as __toESM, ua as petKeys } from "./index-BOzhgzD7.js";
import { E as slotDepthM, T as resolveFill, _ as skinHighlight, h as skinEffect, k as wornAccessories, o as SKIN_EFFECTS, r as companionEyeColors, v as ACCESSORY_CATALOG } from "./appearance-CnI1Xhkn.js";
import { An as Mesh, Da as Vector3, Ea as Vector2, Fi as Scene, Gi as Spherical, N as Color, Nn as MeshLambertMaterial, On as Matrix4, Pt as Group, Rn as MeshStandardMaterial, Sn as MOUSE, Sr as Plane, Ut as InstancedMesh, Wi as SphereGeometry, _ as BackSide, _i as Ray, _r as OrthographicCamera, b as Box3, jn as MeshBasicMaterial, kr as Quaternion, lr as Object3D, t as PMREMGenerator, ta as TOUCH, wr as PointLight, x as BoxGeometry, xr as PerspectiveCamera } from "./three.module-CsntsSp5.js";
import { a as useFrame, s as useThree } from "./react-three-fiber.esm-Dp0xg4g-.js";
import { t as _extends } from "./extends-rAidceeD.js";
import { t as useGLTF } from "./Gltf-CGnHGMSX.js";
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
	__defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
	return value;
};
var EventDispatcher = class {
	constructor() {
		__publicField$1(this, "_listeners");
	}
	addEventListener(type, listener) {
		if (this._listeners === void 0) this._listeners = {};
		const listeners = this._listeners;
		if (listeners[type] === void 0) listeners[type] = [];
		if (listeners[type].indexOf(listener) === -1) listeners[type].push(listener);
	}
	hasEventListener(type, listener) {
		if (this._listeners === void 0) return false;
		const listeners = this._listeners;
		return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
	}
	removeEventListener(type, listener) {
		if (this._listeners === void 0) return;
		const listenerArray = this._listeners[type];
		if (listenerArray !== void 0) {
			const index = listenerArray.indexOf(listener);
			if (index !== -1) listenerArray.splice(index, 1);
		}
	}
	dispatchEvent(event) {
		if (this._listeners === void 0) return;
		const listenerArray = this._listeners[event.type];
		if (listenerArray !== void 0) {
			event.target = this;
			const array = listenerArray.slice(0);
			for (let i = 0, l = array.length; i < l; i++) array[i].call(this, event);
			event.target = null;
		}
	}
};
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField = (obj, key, value) => {
	__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
	return value;
};
var _ray = /* @__PURE__ */ new Ray();
var _plane = /* @__PURE__ */ new Plane();
var TILT_LIMIT = Math.cos(70 * (Math.PI / 180));
var moduloWrapAround = (offset, capacity) => (offset % capacity + capacity) % capacity;
var OrbitControls = class extends EventDispatcher {
	constructor(object, domElement) {
		super();
		__publicField(this, "object");
		__publicField(this, "domElement");
		__publicField(this, "enabled", true);
		__publicField(this, "target", new Vector3());
		__publicField(this, "minDistance", 0);
		__publicField(this, "maxDistance", Infinity);
		__publicField(this, "minZoom", 0);
		__publicField(this, "maxZoom", Infinity);
		__publicField(this, "minPolarAngle", 0);
		__publicField(this, "maxPolarAngle", Math.PI);
		__publicField(this, "minAzimuthAngle", -Infinity);
		__publicField(this, "maxAzimuthAngle", Infinity);
		__publicField(this, "enableDamping", false);
		__publicField(this, "dampingFactor", .05);
		__publicField(this, "enableZoom", true);
		__publicField(this, "zoomSpeed", 1);
		__publicField(this, "enableRotate", true);
		__publicField(this, "rotateSpeed", 1);
		__publicField(this, "enablePan", true);
		__publicField(this, "panSpeed", 1);
		__publicField(this, "screenSpacePanning", true);
		__publicField(this, "keyPanSpeed", 7);
		__publicField(this, "zoomToCursor", false);
		__publicField(this, "autoRotate", false);
		__publicField(this, "autoRotateSpeed", 2);
		__publicField(this, "reverseOrbit", false);
		__publicField(this, "reverseHorizontalOrbit", false);
		__publicField(this, "reverseVerticalOrbit", false);
		__publicField(this, "keys", {
			LEFT: "ArrowLeft",
			UP: "ArrowUp",
			RIGHT: "ArrowRight",
			BOTTOM: "ArrowDown"
		});
		__publicField(this, "mouseButtons", {
			LEFT: MOUSE.ROTATE,
			MIDDLE: MOUSE.DOLLY,
			RIGHT: MOUSE.PAN
		});
		__publicField(this, "touches", {
			ONE: TOUCH.ROTATE,
			TWO: TOUCH.DOLLY_PAN
		});
		__publicField(this, "target0");
		__publicField(this, "position0");
		__publicField(this, "zoom0");
		__publicField(this, "_domElementKeyEvents", null);
		__publicField(this, "getPolarAngle");
		__publicField(this, "getAzimuthalAngle");
		__publicField(this, "setPolarAngle");
		__publicField(this, "setAzimuthalAngle");
		__publicField(this, "getDistance");
		__publicField(this, "getZoomScale");
		__publicField(this, "listenToKeyEvents");
		__publicField(this, "stopListenToKeyEvents");
		__publicField(this, "saveState");
		__publicField(this, "reset");
		__publicField(this, "update");
		__publicField(this, "connect");
		__publicField(this, "dispose");
		__publicField(this, "dollyIn");
		__publicField(this, "dollyOut");
		__publicField(this, "getScale");
		__publicField(this, "setScale");
		this.object = object;
		this.domElement = domElement;
		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.zoom0 = this.object.zoom;
		this.getPolarAngle = () => spherical.phi;
		this.getAzimuthalAngle = () => spherical.theta;
		this.setPolarAngle = (value) => {
			let phi = moduloWrapAround(value, 2 * Math.PI);
			let currentPhi = spherical.phi;
			if (currentPhi < 0) currentPhi += 2 * Math.PI;
			if (phi < 0) phi += 2 * Math.PI;
			let phiDist = Math.abs(phi - currentPhi);
			if (2 * Math.PI - phiDist < phiDist) if (phi < currentPhi) phi += 2 * Math.PI;
			else currentPhi += 2 * Math.PI;
			sphericalDelta.phi = phi - currentPhi;
			scope.update();
		};
		this.setAzimuthalAngle = (value) => {
			let theta = moduloWrapAround(value, 2 * Math.PI);
			let currentTheta = spherical.theta;
			if (currentTheta < 0) currentTheta += 2 * Math.PI;
			if (theta < 0) theta += 2 * Math.PI;
			let thetaDist = Math.abs(theta - currentTheta);
			if (2 * Math.PI - thetaDist < thetaDist) if (theta < currentTheta) theta += 2 * Math.PI;
			else currentTheta += 2 * Math.PI;
			sphericalDelta.theta = theta - currentTheta;
			scope.update();
		};
		this.getDistance = () => scope.object.position.distanceTo(scope.target);
		this.listenToKeyEvents = (domElement2) => {
			domElement2.addEventListener("keydown", onKeyDown);
			this._domElementKeyEvents = domElement2;
		};
		this.stopListenToKeyEvents = () => {
			this._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
			this._domElementKeyEvents = null;
		};
		this.saveState = () => {
			scope.target0.copy(scope.target);
			scope.position0.copy(scope.object.position);
			scope.zoom0 = scope.object.zoom;
		};
		this.reset = () => {
			scope.target.copy(scope.target0);
			scope.object.position.copy(scope.position0);
			scope.object.zoom = scope.zoom0;
			scope.object.updateProjectionMatrix();
			scope.dispatchEvent(changeEvent);
			scope.update();
			state = STATE.NONE;
		};
		this.update = (() => {
			const offset = new Vector3();
			const up = new Vector3(0, 1, 0);
			const quat = new Quaternion().setFromUnitVectors(object.up, up);
			const quatInverse = quat.clone().invert();
			const lastPosition = new Vector3();
			const lastQuaternion = new Quaternion();
			const twoPI = 2 * Math.PI;
			return function update() {
				const position = scope.object.position;
				quat.setFromUnitVectors(object.up, up);
				quatInverse.copy(quat).invert();
				offset.copy(position).sub(scope.target);
				offset.applyQuaternion(quat);
				spherical.setFromVector3(offset);
				if (scope.autoRotate && state === STATE.NONE) rotateLeft(getAutoRotationAngle());
				if (scope.enableDamping) {
					spherical.theta += sphericalDelta.theta * scope.dampingFactor;
					spherical.phi += sphericalDelta.phi * scope.dampingFactor;
				} else {
					spherical.theta += sphericalDelta.theta;
					spherical.phi += sphericalDelta.phi;
				}
				let min = scope.minAzimuthAngle;
				let max = scope.maxAzimuthAngle;
				if (isFinite(min) && isFinite(max)) {
					if (min < -Math.PI) min += twoPI;
					else if (min > Math.PI) min -= twoPI;
					if (max < -Math.PI) max += twoPI;
					else if (max > Math.PI) max -= twoPI;
					if (min <= max) spherical.theta = Math.max(min, Math.min(max, spherical.theta));
					else spherical.theta = spherical.theta > (min + max) / 2 ? Math.max(min, spherical.theta) : Math.min(max, spherical.theta);
				}
				spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
				spherical.makeSafe();
				if (scope.enableDamping === true) scope.target.addScaledVector(panOffset, scope.dampingFactor);
				else scope.target.add(panOffset);
				if (scope.zoomToCursor && performCursorZoom || scope.object.isOrthographicCamera) spherical.radius = clampDistance(spherical.radius);
				else spherical.radius = clampDistance(spherical.radius * scale);
				offset.setFromSpherical(spherical);
				offset.applyQuaternion(quatInverse);
				position.copy(scope.target).add(offset);
				if (!scope.object.matrixAutoUpdate) scope.object.updateMatrix();
				scope.object.lookAt(scope.target);
				if (scope.enableDamping === true) {
					sphericalDelta.theta *= 1 - scope.dampingFactor;
					sphericalDelta.phi *= 1 - scope.dampingFactor;
					panOffset.multiplyScalar(1 - scope.dampingFactor);
				} else {
					sphericalDelta.set(0, 0, 0);
					panOffset.set(0, 0, 0);
				}
				let zoomChanged = false;
				if (scope.zoomToCursor && performCursorZoom) {
					let newRadius = null;
					if (scope.object instanceof PerspectiveCamera && scope.object.isPerspectiveCamera) {
						const prevRadius = offset.length();
						newRadius = clampDistance(prevRadius * scale);
						const radiusDelta = prevRadius - newRadius;
						scope.object.position.addScaledVector(dollyDirection, radiusDelta);
						scope.object.updateMatrixWorld();
					} else if (scope.object.isOrthographicCamera) {
						const mouseBefore = new Vector3(mouse.x, mouse.y, 0);
						mouseBefore.unproject(scope.object);
						scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / scale));
						scope.object.updateProjectionMatrix();
						zoomChanged = true;
						const mouseAfter = new Vector3(mouse.x, mouse.y, 0);
						mouseAfter.unproject(scope.object);
						scope.object.position.sub(mouseAfter).add(mouseBefore);
						scope.object.updateMatrixWorld();
						newRadius = offset.length();
					} else {
						console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");
						scope.zoomToCursor = false;
					}
					if (newRadius !== null) if (scope.screenSpacePanning) scope.target.set(0, 0, -1).transformDirection(scope.object.matrix).multiplyScalar(newRadius).add(scope.object.position);
					else {
						_ray.origin.copy(scope.object.position);
						_ray.direction.set(0, 0, -1).transformDirection(scope.object.matrix);
						if (Math.abs(scope.object.up.dot(_ray.direction)) < TILT_LIMIT) object.lookAt(scope.target);
						else {
							_plane.setFromNormalAndCoplanarPoint(scope.object.up, scope.target);
							_ray.intersectPlane(_plane, scope.target);
						}
					}
				} else if (scope.object instanceof OrthographicCamera && scope.object.isOrthographicCamera) {
					zoomChanged = scale !== 1;
					if (zoomChanged) {
						scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / scale));
						scope.object.updateProjectionMatrix();
					}
				}
				scale = 1;
				performCursorZoom = false;
				if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
					scope.dispatchEvent(changeEvent);
					lastPosition.copy(scope.object.position);
					lastQuaternion.copy(scope.object.quaternion);
					zoomChanged = false;
					return true;
				}
				return false;
			};
		})();
		this.connect = (domElement2) => {
			scope.domElement = domElement2;
			scope.domElement.style.touchAction = "none";
			scope.domElement.addEventListener("contextmenu", onContextMenu);
			scope.domElement.addEventListener("pointerdown", onPointerDown);
			scope.domElement.addEventListener("pointercancel", onPointerUp);
			scope.domElement.addEventListener("wheel", onMouseWheel);
		};
		this.dispose = () => {
			var _a, _b, _c, _d, _e, _f;
			if (scope.domElement) scope.domElement.style.touchAction = "auto";
			(_a = scope.domElement) == null || _a.removeEventListener("contextmenu", onContextMenu);
			(_b = scope.domElement) == null || _b.removeEventListener("pointerdown", onPointerDown);
			(_c = scope.domElement) == null || _c.removeEventListener("pointercancel", onPointerUp);
			(_d = scope.domElement) == null || _d.removeEventListener("wheel", onMouseWheel);
			(_e = scope.domElement) == null || _e.ownerDocument.removeEventListener("pointermove", onPointerMove);
			(_f = scope.domElement) == null || _f.ownerDocument.removeEventListener("pointerup", onPointerUp);
			if (scope._domElementKeyEvents !== null) scope._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
		};
		const scope = this;
		const changeEvent = { type: "change" };
		const startEvent = { type: "start" };
		const endEvent = { type: "end" };
		const STATE = {
			NONE: -1,
			ROTATE: 0,
			DOLLY: 1,
			PAN: 2,
			TOUCH_ROTATE: 3,
			TOUCH_PAN: 4,
			TOUCH_DOLLY_PAN: 5,
			TOUCH_DOLLY_ROTATE: 6
		};
		let state = STATE.NONE;
		const EPS = 1e-6;
		const spherical = new Spherical();
		const sphericalDelta = new Spherical();
		let scale = 1;
		const panOffset = new Vector3();
		const rotateStart = new Vector2();
		const rotateEnd = new Vector2();
		const rotateDelta = new Vector2();
		const panStart = new Vector2();
		const panEnd = new Vector2();
		const panDelta = new Vector2();
		const dollyStart = new Vector2();
		const dollyEnd = new Vector2();
		const dollyDelta = new Vector2();
		const dollyDirection = new Vector3();
		const mouse = new Vector2();
		let performCursorZoom = false;
		const pointers = [];
		const pointerPositions = {};
		function getAutoRotationAngle() {
			return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
		}
		function getZoomScale() {
			return Math.pow(.95, scope.zoomSpeed);
		}
		function rotateLeft(angle) {
			if (scope.reverseOrbit || scope.reverseHorizontalOrbit) sphericalDelta.theta += angle;
			else sphericalDelta.theta -= angle;
		}
		function rotateUp(angle) {
			if (scope.reverseOrbit || scope.reverseVerticalOrbit) sphericalDelta.phi += angle;
			else sphericalDelta.phi -= angle;
		}
		const panLeft = (() => {
			const v = new Vector3();
			return function panLeft2(distance$1, objectMatrix) {
				v.setFromMatrixColumn(objectMatrix, 0);
				v.multiplyScalar(-distance$1);
				panOffset.add(v);
			};
		})();
		const panUp = (() => {
			const v = new Vector3();
			return function panUp2(distance$1, objectMatrix) {
				if (scope.screenSpacePanning === true) v.setFromMatrixColumn(objectMatrix, 1);
				else {
					v.setFromMatrixColumn(objectMatrix, 0);
					v.crossVectors(scope.object.up, v);
				}
				v.multiplyScalar(distance$1);
				panOffset.add(v);
			};
		})();
		const pan = (() => {
			const offset = new Vector3();
			return function pan2(deltaX, deltaY) {
				const element = scope.domElement;
				if (element && scope.object instanceof PerspectiveCamera && scope.object.isPerspectiveCamera) {
					const position = scope.object.position;
					offset.copy(position).sub(scope.target);
					let targetDistance = offset.length();
					targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180);
					panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
					panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
				} else if (element && scope.object instanceof OrthographicCamera && scope.object.isOrthographicCamera) {
					panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
					panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
				} else {
					console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
					scope.enablePan = false;
				}
			};
		})();
		function setScale(newScale) {
			if (scope.object instanceof PerspectiveCamera && scope.object.isPerspectiveCamera || scope.object instanceof OrthographicCamera && scope.object.isOrthographicCamera) scale = newScale;
			else {
				console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
				scope.enableZoom = false;
			}
		}
		function dollyOut(dollyScale) {
			setScale(scale / dollyScale);
		}
		function dollyIn(dollyScale) {
			setScale(scale * dollyScale);
		}
		function updateMouseParameters(event) {
			if (!scope.zoomToCursor || !scope.domElement) return;
			performCursorZoom = true;
			const rect = scope.domElement.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			const w = rect.width;
			const h = rect.height;
			mouse.x = x / w * 2 - 1;
			mouse.y = -(y / h) * 2 + 1;
			dollyDirection.set(mouse.x, mouse.y, 1).unproject(scope.object).sub(scope.object.position).normalize();
		}
		function clampDistance(dist) {
			return Math.max(scope.minDistance, Math.min(scope.maxDistance, dist));
		}
		function handleMouseDownRotate(event) {
			rotateStart.set(event.clientX, event.clientY);
		}
		function handleMouseDownDolly(event) {
			updateMouseParameters(event);
			dollyStart.set(event.clientX, event.clientY);
		}
		function handleMouseDownPan(event) {
			panStart.set(event.clientX, event.clientY);
		}
		function handleMouseMoveRotate(event) {
			rotateEnd.set(event.clientX, event.clientY);
			rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
			const element = scope.domElement;
			if (element) {
				rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
				rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
			}
			rotateStart.copy(rotateEnd);
			scope.update();
		}
		function handleMouseMoveDolly(event) {
			dollyEnd.set(event.clientX, event.clientY);
			dollyDelta.subVectors(dollyEnd, dollyStart);
			if (dollyDelta.y > 0) dollyOut(getZoomScale());
			else if (dollyDelta.y < 0) dollyIn(getZoomScale());
			dollyStart.copy(dollyEnd);
			scope.update();
		}
		function handleMouseMovePan(event) {
			panEnd.set(event.clientX, event.clientY);
			panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
			pan(panDelta.x, panDelta.y);
			panStart.copy(panEnd);
			scope.update();
		}
		function handleMouseWheel(event) {
			updateMouseParameters(event);
			if (event.deltaY < 0) dollyIn(getZoomScale());
			else if (event.deltaY > 0) dollyOut(getZoomScale());
			scope.update();
		}
		function handleKeyDown(event) {
			let needsUpdate = false;
			switch (event.code) {
				case scope.keys.UP:
					pan(0, scope.keyPanSpeed);
					needsUpdate = true;
					break;
				case scope.keys.BOTTOM:
					pan(0, -scope.keyPanSpeed);
					needsUpdate = true;
					break;
				case scope.keys.LEFT:
					pan(scope.keyPanSpeed, 0);
					needsUpdate = true;
					break;
				case scope.keys.RIGHT:
					pan(-scope.keyPanSpeed, 0);
					needsUpdate = true;
					break;
			}
			if (needsUpdate) {
				event.preventDefault();
				scope.update();
			}
		}
		function handleTouchStartRotate() {
			if (pointers.length == 1) rotateStart.set(pointers[0].pageX, pointers[0].pageY);
			else {
				const x = .5 * (pointers[0].pageX + pointers[1].pageX);
				const y = .5 * (pointers[0].pageY + pointers[1].pageY);
				rotateStart.set(x, y);
			}
		}
		function handleTouchStartPan() {
			if (pointers.length == 1) panStart.set(pointers[0].pageX, pointers[0].pageY);
			else {
				const x = .5 * (pointers[0].pageX + pointers[1].pageX);
				const y = .5 * (pointers[0].pageY + pointers[1].pageY);
				panStart.set(x, y);
			}
		}
		function handleTouchStartDolly() {
			const dx = pointers[0].pageX - pointers[1].pageX;
			const dy = pointers[0].pageY - pointers[1].pageY;
			const distance$1 = Math.sqrt(dx * dx + dy * dy);
			dollyStart.set(0, distance$1);
		}
		function handleTouchStartDollyPan() {
			if (scope.enableZoom) handleTouchStartDolly();
			if (scope.enablePan) handleTouchStartPan();
		}
		function handleTouchStartDollyRotate() {
			if (scope.enableZoom) handleTouchStartDolly();
			if (scope.enableRotate) handleTouchStartRotate();
		}
		function handleTouchMoveRotate(event) {
			if (pointers.length == 1) rotateEnd.set(event.pageX, event.pageY);
			else {
				const position = getSecondPointerPosition(event);
				const x = .5 * (event.pageX + position.x);
				const y = .5 * (event.pageY + position.y);
				rotateEnd.set(x, y);
			}
			rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
			const element = scope.domElement;
			if (element) {
				rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
				rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
			}
			rotateStart.copy(rotateEnd);
		}
		function handleTouchMovePan(event) {
			if (pointers.length == 1) panEnd.set(event.pageX, event.pageY);
			else {
				const position = getSecondPointerPosition(event);
				const x = .5 * (event.pageX + position.x);
				const y = .5 * (event.pageY + position.y);
				panEnd.set(x, y);
			}
			panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
			pan(panDelta.x, panDelta.y);
			panStart.copy(panEnd);
		}
		function handleTouchMoveDolly(event) {
			const position = getSecondPointerPosition(event);
			const dx = event.pageX - position.x;
			const dy = event.pageY - position.y;
			const distance$1 = Math.sqrt(dx * dx + dy * dy);
			dollyEnd.set(0, distance$1);
			dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));
			dollyOut(dollyDelta.y);
			dollyStart.copy(dollyEnd);
		}
		function handleTouchMoveDollyPan(event) {
			if (scope.enableZoom) handleTouchMoveDolly(event);
			if (scope.enablePan) handleTouchMovePan(event);
		}
		function handleTouchMoveDollyRotate(event) {
			if (scope.enableZoom) handleTouchMoveDolly(event);
			if (scope.enableRotate) handleTouchMoveRotate(event);
		}
		function onPointerDown(event) {
			var _a, _b;
			if (scope.enabled === false) return;
			if (pointers.length === 0) {
				(_a = scope.domElement) == null || _a.ownerDocument.addEventListener("pointermove", onPointerMove);
				(_b = scope.domElement) == null || _b.ownerDocument.addEventListener("pointerup", onPointerUp);
			}
			addPointer(event);
			if (event.pointerType === "touch") onTouchStart(event);
			else onMouseDown(event);
		}
		function onPointerMove(event) {
			if (scope.enabled === false) return;
			if (event.pointerType === "touch") onTouchMove(event);
			else onMouseMove(event);
		}
		function onPointerUp(event) {
			var _a, _b, _c;
			removePointer(event);
			if (pointers.length === 0) {
				(_a = scope.domElement) == null || _a.releasePointerCapture(event.pointerId);
				(_b = scope.domElement) == null || _b.ownerDocument.removeEventListener("pointermove", onPointerMove);
				(_c = scope.domElement) == null || _c.ownerDocument.removeEventListener("pointerup", onPointerUp);
			}
			scope.dispatchEvent(endEvent);
			state = STATE.NONE;
		}
		function onMouseDown(event) {
			let mouseAction;
			switch (event.button) {
				case 0:
					mouseAction = scope.mouseButtons.LEFT;
					break;
				case 1:
					mouseAction = scope.mouseButtons.MIDDLE;
					break;
				case 2:
					mouseAction = scope.mouseButtons.RIGHT;
					break;
				default: mouseAction = -1;
			}
			switch (mouseAction) {
				case MOUSE.DOLLY:
					if (scope.enableZoom === false) return;
					handleMouseDownDolly(event);
					state = STATE.DOLLY;
					break;
				case MOUSE.ROTATE:
					if (event.ctrlKey || event.metaKey || event.shiftKey) {
						if (scope.enablePan === false) return;
						handleMouseDownPan(event);
						state = STATE.PAN;
					} else {
						if (scope.enableRotate === false) return;
						handleMouseDownRotate(event);
						state = STATE.ROTATE;
					}
					break;
				case MOUSE.PAN:
					if (event.ctrlKey || event.metaKey || event.shiftKey) {
						if (scope.enableRotate === false) return;
						handleMouseDownRotate(event);
						state = STATE.ROTATE;
					} else {
						if (scope.enablePan === false) return;
						handleMouseDownPan(event);
						state = STATE.PAN;
					}
					break;
				default: state = STATE.NONE;
			}
			if (state !== STATE.NONE) scope.dispatchEvent(startEvent);
		}
		function onMouseMove(event) {
			if (scope.enabled === false) return;
			switch (state) {
				case STATE.ROTATE:
					if (scope.enableRotate === false) return;
					handleMouseMoveRotate(event);
					break;
				case STATE.DOLLY:
					if (scope.enableZoom === false) return;
					handleMouseMoveDolly(event);
					break;
				case STATE.PAN:
					if (scope.enablePan === false) return;
					handleMouseMovePan(event);
					break;
			}
		}
		function onMouseWheel(event) {
			if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) return;
			event.preventDefault();
			scope.dispatchEvent(startEvent);
			handleMouseWheel(event);
			scope.dispatchEvent(endEvent);
		}
		function onKeyDown(event) {
			if (scope.enabled === false || scope.enablePan === false) return;
			handleKeyDown(event);
		}
		function onTouchStart(event) {
			trackPointer(event);
			switch (pointers.length) {
				case 1:
					switch (scope.touches.ONE) {
						case TOUCH.ROTATE:
							if (scope.enableRotate === false) return;
							handleTouchStartRotate();
							state = STATE.TOUCH_ROTATE;
							break;
						case TOUCH.PAN:
							if (scope.enablePan === false) return;
							handleTouchStartPan();
							state = STATE.TOUCH_PAN;
							break;
						default: state = STATE.NONE;
					}
					break;
				case 2:
					switch (scope.touches.TWO) {
						case TOUCH.DOLLY_PAN:
							if (scope.enableZoom === false && scope.enablePan === false) return;
							handleTouchStartDollyPan();
							state = STATE.TOUCH_DOLLY_PAN;
							break;
						case TOUCH.DOLLY_ROTATE:
							if (scope.enableZoom === false && scope.enableRotate === false) return;
							handleTouchStartDollyRotate();
							state = STATE.TOUCH_DOLLY_ROTATE;
							break;
						default: state = STATE.NONE;
					}
					break;
				default: state = STATE.NONE;
			}
			if (state !== STATE.NONE) scope.dispatchEvent(startEvent);
		}
		function onTouchMove(event) {
			trackPointer(event);
			switch (state) {
				case STATE.TOUCH_ROTATE:
					if (scope.enableRotate === false) return;
					handleTouchMoveRotate(event);
					scope.update();
					break;
				case STATE.TOUCH_PAN:
					if (scope.enablePan === false) return;
					handleTouchMovePan(event);
					scope.update();
					break;
				case STATE.TOUCH_DOLLY_PAN:
					if (scope.enableZoom === false && scope.enablePan === false) return;
					handleTouchMoveDollyPan(event);
					scope.update();
					break;
				case STATE.TOUCH_DOLLY_ROTATE:
					if (scope.enableZoom === false && scope.enableRotate === false) return;
					handleTouchMoveDollyRotate(event);
					scope.update();
					break;
				default: state = STATE.NONE;
			}
		}
		function onContextMenu(event) {
			if (scope.enabled === false) return;
			event.preventDefault();
		}
		function addPointer(event) {
			pointers.push(event);
		}
		function removePointer(event) {
			delete pointerPositions[event.pointerId];
			for (let i = 0; i < pointers.length; i++) if (pointers[i].pointerId == event.pointerId) {
				pointers.splice(i, 1);
				return;
			}
		}
		function trackPointer(event) {
			let position = pointerPositions[event.pointerId];
			if (position === void 0) {
				position = new Vector2();
				pointerPositions[event.pointerId] = position;
			}
			position.set(event.pageX, event.pageY);
		}
		function getSecondPointerPosition(event) {
			return pointerPositions[(event.pointerId === pointers[0].pointerId ? pointers[1] : pointers[0]).pointerId];
		}
		this.dollyIn = (dollyScale = getZoomScale()) => {
			dollyIn(dollyScale);
			scope.update();
		};
		this.dollyOut = (dollyScale = getZoomScale()) => {
			dollyOut(dollyScale);
			scope.update();
		};
		this.getScale = () => {
			return scale;
		};
		this.setScale = (newScale) => {
			setScale(newScale);
			scope.update();
		};
		this.getZoomScale = () => {
			return getZoomScale();
		};
		if (domElement !== void 0) this.connect(domElement);
		this.update();
	}
};
var import_react = /* @__PURE__ */ __toESM(require_react());
var OrbitControls$1 = /* @__PURE__ */ import_react.forwardRef(({ makeDefault, camera, regress, domElement, enableDamping = true, keyEvents = false, onChange, onStart, onEnd, ...restProps }, ref) => {
	const invalidate = useThree((state) => state.invalidate);
	const defaultCamera = useThree((state) => state.camera);
	const gl = useThree((state) => state.gl);
	const events = useThree((state) => state.events);
	const setEvents = useThree((state) => state.setEvents);
	const set = useThree((state) => state.set);
	const get = useThree((state) => state.get);
	const performance = useThree((state) => state.performance);
	const explCamera = camera || defaultCamera;
	const explDomElement = domElement || events.connected || gl.domElement;
	const controls = import_react.useMemo(() => new OrbitControls(explCamera), [explCamera]);
	useFrame(() => {
		if (controls.enabled) controls.update();
	}, -1);
	import_react.useEffect(() => {
		if (keyEvents) controls.connect(keyEvents === true ? explDomElement : keyEvents);
		controls.connect(explDomElement);
		return () => void controls.dispose();
	}, [
		keyEvents,
		explDomElement,
		regress,
		controls,
		invalidate
	]);
	import_react.useEffect(() => {
		const callback = (e) => {
			invalidate();
			if (regress) performance.regress();
			if (onChange) onChange(e);
		};
		const onStartCb = (e) => {
			if (onStart) onStart(e);
		};
		const onEndCb = (e) => {
			if (onEnd) onEnd(e);
		};
		controls.addEventListener("change", callback);
		controls.addEventListener("start", onStartCb);
		controls.addEventListener("end", onEndCb);
		return () => {
			controls.removeEventListener("start", onStartCb);
			controls.removeEventListener("end", onEndCb);
			controls.removeEventListener("change", callback);
		};
	}, [
		onChange,
		onStart,
		onEnd,
		controls,
		invalidate,
		setEvents
	]);
	import_react.useEffect(() => {
		if (makeDefault) {
			const old = get().controls;
			set({ controls });
			return () => set({ controls: old });
		}
	}, [makeDefault, controls]);
	return /* @__PURE__ */ import_react.createElement("primitive", _extends({
		ref,
		object: controls,
		enableDamping
	}, restProps));
});
var companions_default = "/assets/companions-Cyq1mAgH.glb";
var gigi_default = "/assets/gigi-BHcJLBxt.glb";
var accessories_default = "/assets/accessories-DEy2B9FY.glb";
var distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
function createPetTrail(owner) {
	return {
		position: [...owner],
		owner: [...owner],
		points: [],
		yaw: 0,
		speed: 0
	};
}
function petDisplayPosition(position, yaw, size, clear) {
	if (!clear) return position;
	const offset = Math.min(.38, size * .7);
	for (const side of [1, -1]) {
		const candidate = [
			position[0] + Math.cos(yaw) * offset * side,
			position[1],
			position[2] - Math.sin(yaw) * offset * side
		];
		if (clear(candidate, size / 2)) return candidate;
	}
	return position;
}
function recordOwner(trail, owner, via) {
	if (!owner.every(Number.isFinite)) return false;
	const gap = distance(trail.owner, owner);
	if (gap < .025) return true;
	if (gap > 12 || trail.points.length > 512) {
		trail.position = [...owner];
		trail.owner = [...owner];
		trail.points = [];
		trail.speed = 0;
		return false;
	}
	if (via && via.every(Number.isFinite) && distance(trail.owner, via) > .025) trail.points.push([...via]);
	trail.points.push([...owner]);
	trail.owner = [...owner];
	return true;
}
function advancePetTrail(trail, gap, delta) {
	if (!Number.isFinite(delta) || delta <= 0) return;
	let length = 0, last = trail.position;
	for (const point of trail.points) {
		length += distance(last, point);
		last = point;
	}
	const dt = Math.min(delta, .1);
	let budget = Math.min(Math.max(0, length - gap), Math.min(8, 2 + Math.max(0, length - gap) * 2) * dt);
	const travel = budget;
	while (budget > 1e-7 && trail.points.length) {
		const next = trail.points[0];
		const segment = distance(trail.position, next);
		if (segment < 1e-7) {
			trail.points.shift();
			continue;
		}
		const fraction = Math.min(1, budget / segment);
		const dx = next[0] - trail.position[0], dz = next[2] - trail.position[2];
		if (Math.hypot(dx, dz) > 1e-7) trail.yaw = Math.atan2(dx, dz);
		for (let axis = 0; axis < 3; axis++) trail.position[axis] += (next[axis] - trail.position[axis]) * fraction;
		budget -= segment * fraction;
		if (fraction === 1) trail.points.shift();
	}
	trail.speed = (travel - budget) / dt;
}
const GIGI_COMPANION = {
	id: "gigi",
	kind: "gigi",
	gait: "fly",
	heightM: .5,
	modelHeightM: .4,
	strideM: 1
};
const BUILTIN_COMPANIONS = {
	ember: {
		kind: "model",
		gait: "fly",
		heightM: .5,
		modelHeightM: .534,
		strideM: 1
	},
	miso: {
		kind: "model",
		gait: "walk",
		heightM: .44,
		modelHeightM: .519,
		strideM: .42
	},
	bolt: {
		kind: "model",
		gait: "waddle",
		heightM: .38,
		modelHeightM: .367,
		strideM: .3
	},
	brew: {
		kind: "model",
		gait: "hop",
		heightM: .34,
		modelHeightM: .341,
		strideM: .5
	},
	mochi: {
		kind: "model",
		gait: "bounce",
		heightM: .28,
		modelHeightM: .25,
		strideM: .45
	},
	shelly: {
		kind: "model",
		gait: "crawl",
		heightM: .36,
		modelHeightM: .4,
		strideM: .28
	},
	cocoa: {
		kind: "model",
		gait: "walk",
		heightM: .4,
		modelHeightM: .483,
		strideM: .3
	}
};
const VOXEL_HEIGHT_M = .42;
function companionFor(pet) {
	if (!pet || pet.id === GIGI_COMPANION.id) return GIGI_COMPANION;
	const builtin = pet.builtin ? BUILTIN_COMPANIONS[pet.id] : void 0;
	if (builtin) return {
		id: pet.id,
		...builtin
	};
	const idle = pet.animations?.idle;
	if (!pet.sheet_url || !idle || !(pet.frame_size > 0)) return GIGI_COMPANION;
	return {
		id: pet.id,
		kind: "voxel",
		gait: "float",
		heightM: VOXEL_HEIGHT_M,
		modelHeightM: VOXEL_HEIGHT_M,
		strideM: 1,
		sheetUrl: pet.sheet_url,
		frameSize: pet.frame_size,
		idle: {
			row: idle.row,
			frames: Math.max(1, idle.frames),
			fps: Math.max(1, idle.fps)
		}
	};
}
function companionFlies(pet) {
	return pet.gait === "fly" || pet.gait === "float";
}
function sameCompanion(a, b) {
	return a.id === b.id && a.kind === b.kind && a.sheetUrl === b.sheetUrl && a.frameSize === b.frameSize && a.idle?.row === b.idle?.row && a.idle?.frames === b.idle?.frames && a.idle?.fps === b.idle?.fps;
}
const useCompanionPet = create((set, get) => ({
	pet: GIGI_COMPANION,
	catalog: null,
	setPet: (pet) => {
		if (!sameCompanion(get().pet, pet)) set({ pet });
	},
	setCatalog: (next) => {
		const current = get().catalog;
		const merged = {};
		let changed = !current || Object.keys(current).length !== Object.keys(next).length;
		for (const [id, pet] of Object.entries(next)) {
			const kept = current?.[id];
			merged[id] = kept && sameCompanion(kept, pet) ? kept : pet;
			if (merged[id] !== kept) changed = true;
		}
		if (changed) set({ catalog: merged });
	}
}));
function useWornPet(petId) {
	return useCompanionPet((s) => !petId ? null : s.catalog === null ? void 0 : s.catalog[petId] ?? null);
}
function useSyncCompanionPet() {
	const { data } = useQuery({
		queryKey: petKeys.all,
		queryFn: fetchPets,
		staleTime: Infinity
	});
	const setPet = useCompanionPet((s) => s.setPet);
	const setCatalog = useCompanionPet((s) => s.setCatalog);
	(0, import_react.useEffect)(() => {
		if (!data) return;
		const active = pickActivePet(data);
		if (active) setPet(companionFor(active));
		const catalog = {};
		for (const pet of Array.isArray(data.pets) ? data.pets : []) {
			const companion = companionFor(pet);
			if (companion.id === pet.id) catalog[pet.id] = companion;
		}
		setCatalog(catalog);
	}, [
		data,
		setPet,
		setCatalog
	]);
}
var RoomEnvironment = class extends Scene {
	constructor() {
		super();
		this.name = "RoomEnvironment";
		this.position.y = -3.5;
		const geometry = new BoxGeometry();
		geometry.deleteAttribute("uv");
		const roomMaterial = new MeshStandardMaterial({ side: 1 });
		const boxMaterial = new MeshStandardMaterial();
		const mainLight = new PointLight(16777215, 900, 28, 2);
		mainLight.position.set(.418, 16.199, .3);
		this.add(mainLight);
		const room = new Mesh(geometry, roomMaterial);
		room.position.set(-.757, 13.219, .717);
		room.scale.set(31.713, 28.305, 28.591);
		this.add(room);
		const boxes = new InstancedMesh(geometry, boxMaterial, 6);
		const transform = new Object3D();
		transform.position.set(-10.906, 2.009, 1.846);
		transform.rotation.set(0, -.195, 0);
		transform.scale.set(2.328, 7.905, 4.651);
		transform.updateMatrix();
		boxes.setMatrixAt(0, transform.matrix);
		transform.position.set(-5.607, -.754, -.758);
		transform.rotation.set(0, .994, 0);
		transform.scale.set(1.97, 1.534, 3.955);
		transform.updateMatrix();
		boxes.setMatrixAt(1, transform.matrix);
		transform.position.set(6.167, .857, 7.803);
		transform.rotation.set(0, .561, 0);
		transform.scale.set(3.927, 6.285, 3.687);
		transform.updateMatrix();
		boxes.setMatrixAt(2, transform.matrix);
		transform.position.set(-2.017, .018, 6.124);
		transform.rotation.set(0, .333, 0);
		transform.scale.set(2.002, 4.566, 2.064);
		transform.updateMatrix();
		boxes.setMatrixAt(3, transform.matrix);
		transform.position.set(2.291, -.756, -2.621);
		transform.rotation.set(0, -.286, 0);
		transform.scale.set(1.546, 1.552, 1.496);
		transform.updateMatrix();
		boxes.setMatrixAt(4, transform.matrix);
		transform.position.set(-2.193, -.369, -5.547);
		transform.rotation.set(0, .516, 0);
		transform.scale.set(3.875, 3.487, 2.986);
		transform.updateMatrix();
		boxes.setMatrixAt(5, transform.matrix);
		this.add(boxes);
		const light1 = new Mesh(geometry, createAreaLightMaterial(50));
		light1.position.set(-16.116, 14.37, 8.208);
		light1.scale.set(.1, 2.428, 2.739);
		this.add(light1);
		const light2 = new Mesh(geometry, createAreaLightMaterial(50));
		light2.position.set(-16.109, 18.021, -8.207);
		light2.scale.set(.1, 2.425, 2.751);
		this.add(light2);
		const light3 = new Mesh(geometry, createAreaLightMaterial(17));
		light3.position.set(14.904, 12.198, -1.832);
		light3.scale.set(.15, 4.265, 6.331);
		this.add(light3);
		const light4 = new Mesh(geometry, createAreaLightMaterial(43));
		light4.position.set(-.462, 8.89, 14.52);
		light4.scale.set(4.38, 5.441, .088);
		this.add(light4);
		const light5 = new Mesh(geometry, createAreaLightMaterial(20));
		light5.position.set(3.235, 11.486, -12.541);
		light5.scale.set(2.5, 2, .1);
		this.add(light5);
		const light6 = new Mesh(geometry, createAreaLightMaterial(100));
		light6.position.set(0, 20, 0);
		light6.scale.set(1, .1, 1);
		this.add(light6);
	}
	dispose() {
		const resources = /* @__PURE__ */ new Set();
		this.traverse((object) => {
			if (object.isMesh) {
				resources.add(object.geometry);
				resources.add(object.material);
			}
		});
		for (const resource of resources) resource.dispose();
	}
};
function createAreaLightMaterial(intensity) {
	return new MeshLambertMaterial({
		color: 0,
		emissive: 16777215,
		emissiveIntensity: intensity
	});
}
const FULL_STRIDE_SPEED = .9;
var BLINK_PERIOD_S = 4.3;
var BLINK_S = .14;
var TAU = Math.PI * 2;
function createRigState() {
	return {
		phase: 0,
		stride: 0,
		blink: 0,
		t: 0
	};
}
function restMotion() {
	return {
		rx: 0,
		ry: 0,
		rz: 0,
		dy: 0,
		sx: 1,
		sy: 1,
		sz: 1
	};
}
function clamp(value, min, max) {
	return value < min ? min : value > max ? max : value;
}
function stepRig(state, pet, input) {
	const dt = Number.isFinite(input.dt) ? clamp(input.dt, 0, .1) : 0;
	const speed = Number.isFinite(input.speed) ? Math.max(0, input.speed) : 0;
	if (input.reduced) {
		state.stride = 0;
		state.blink = input.mood === "sleep" ? 1 : 0;
		return;
	}
	state.t += dt;
	const target = clamp(speed / FULL_STRIDE_SPEED, 0, 1);
	state.stride += (target - state.stride) * (1 - Math.exp(-8 * dt));
	if (speed > .02) state.phase = (state.phase + speed * dt / Math.max(.05, pet.strideM) * TAU) % TAU;
	else if (state.stride < .05) {
		const settle = state.phase % Math.PI;
		if (settle > .02 && settle < Math.PI - .02) state.phase = (state.phase + dt * 3) % TAU;
	}
	if (input.mood === "sleep") state.blink = 1;
	else state.blink = state.t % BLINK_PERIOD_S < BLINK_S ? 1 : 0;
}
function part(out, name) {
	let motion = out.get(name);
	if (!motion) {
		motion = restMotion();
		out.set(name, motion);
	} else {
		motion.rx = motion.ry = motion.rz = motion.dy = 0;
		motion.sx = motion.sy = motion.sz = 1;
	}
	return motion;
}
function eyes(out, id, blink) {
	for (const side of ["L", "R"]) part(out, `${id}_Eye_${side}`).sy = 1 - .9 * blink;
}
function rigPose(pet, state, mood, out = /* @__PURE__ */ new Map()) {
	const { phase: p, stride: s, t } = state;
	const talk = mood === "talk" ? 1 : 0;
	const sleep = mood === "sleep" ? 1 : 0;
	const work = mood === "work" ? 1 : 0;
	switch (pet.id) {
		case "miso": {
			const swing = .6 * s;
			part(out, "miso_Leg_FL").rx = swing * Math.sin(p);
			part(out, "miso_Leg_BR").rx = swing * Math.sin(p);
			part(out, "miso_Leg_FR").rx = swing * Math.sin(p + Math.PI);
			part(out, "miso_Leg_BL").rx = swing * Math.sin(p + Math.PI);
			const body = part(out, "miso_Body");
			body.dy = .01 * s * Math.abs(Math.cos(p)) - .03 * sleep;
			body.sy = 1 + .02 * Math.sin(t * 1.6) * (1 - s);
			const head = part(out, "miso_Head");
			head.rx = .06 * s * Math.sin(2 * p) + .12 * sleep;
			head.ry = .3 * Math.sin(t * .45) * (1 - s) * (1 - sleep);
			head.rz = .16 * talk * Math.sin(t * 3.2);
			head.dy = -.04 * sleep;
			const tail = part(out, "miso_Tail");
			tail.rz = .32 * Math.sin(t * 2.1) * (1 - .5 * s) + .15 * s * Math.sin(p);
			tail.rx = .18 * s - .25 * sleep;
			const flick = t % 5.3 < .18 ? Math.sin(t % 5.3 / .18 * Math.PI) : 0;
			part(out, "miso_Ear_L").rz = .35 * flick;
			part(out, "miso_Ear_R").rz = -.12 * flick;
			eyes(out, "miso", state.blink);
			break;
		}
		case "ember": {
			const beat = Math.sin(t * TAU * (2.2 + 1.6 * s + 1.2 * talk));
			const flap = sleep ? .25 : .15 + .55 * beat;
			part(out, "ember_Wing_R").rz = flap;
			part(out, "ember_Wing_L").rz = -flap;
			const dangle = .2 + .25 * s + .08 * Math.sin(t * TAU * 1.1);
			part(out, "ember_Leg_L").rx = dangle;
			part(out, "ember_Leg_R").rx = dangle;
			part(out, "ember_Arm_L").rx = -.25 + .12 * Math.sin(t * 3 + 1) - .5 * talk * Math.abs(Math.sin(t * 5));
			part(out, "ember_Arm_R").rx = -.25 + .12 * Math.sin(t * 3);
			const tail = part(out, "ember_Tail");
			tail.ry = .35 * Math.sin(t * 1.8);
			tail.rx = -.25 * s;
			const head = part(out, "ember_Head");
			head.rx = .08 * Math.sin(t * 1.3) + .1 * sleep;
			head.rz = .12 * talk * Math.sin(t * 3);
			eyes(out, "ember", state.blink);
			break;
		}
		case "bolt": {
			const step = Math.sin(p);
			const left = part(out, "bolt_Foot_L"), right = part(out, "bolt_Foot_R");
			left.rx = .5 * s * step;
			left.dy = .03 * s * Math.max(0, step);
			right.rx = -.5 * s * step;
			right.dy = .03 * s * Math.max(0, -step);
			const body = part(out, "bolt_Body");
			body.rz = .1 * s * step + .05 * talk * Math.sin(t * 6);
			body.dy = .012 * s * Math.abs(step);
			part(out, "bolt_Arm_L").rx = -.6 * s * step;
			const wave = part(out, "bolt_Arm_R");
			wave.rx = .6 * s * step;
			wave.rz = talk * (.9 + .35 * Math.sin(t * 9));
			const level = work ? Math.floor(t * 2.5 % 4) : 3;
			for (let i = 1; i <= 3; i++) {
				const bar = part(out, `bolt_Bar_${i}`);
				bar.sx = i <= level ? 1 : .02;
			}
			eyes(out, "bolt", state.blink);
			break;
		}
		case "brew": {
			const air = Math.max(0, Math.sin(p));
			const ground = Math.max(0, -Math.sin(p));
			const body = part(out, "brew_Body");
			body.dy = .06 * s * air;
			body.sy = 1 - .09 * s * ground + .015 * Math.sin(t * 1.7) * (1 - s);
			body.sx = body.sz = 1 + .045 * s * ground;
			body.rz = .05 * s * Math.sin(p * .5);
			const lid = part(out, "brew_Lid");
			lid.dy = .012 * s * ground + .012 * talk * Math.abs(Math.sin(t * 17));
			lid.rz = .1 * talk * Math.sin(t * 13) + .06 * s * Math.sin(p * 2);
			eyes(out, "brew", state.blink);
			break;
		}
		case "mochi": {
			const lift = Math.sin(p);
			const body = part(out, "mochi_Body");
			const jiggle = (.035 + .04 * talk) * Math.sin(t * (2.4 + 6 * talk));
			body.sy = 1 + .16 * s * lift + jiggle * (1 - s) - .08 * sleep;
			const across = 1 / Math.sqrt(Math.max(.5, body.sy));
			body.sx = across;
			body.sz = across;
			body.dy = .05 * s * Math.max(0, lift);
			eyes(out, "mochi", state.blink);
			break;
		}
		case "shelly": {
			const body = part(out, "shelly_Body");
			body.sz = 1 + .07 * s * Math.sin(p);
			body.sx = 1 - .025 * s * Math.sin(p);
			const shell = part(out, "shelly_Shell");
			shell.dy = .006 * s * Math.sin(p + 1) - .02 * sleep;
			shell.rz = .04 * s * Math.sin(p) + .05 * talk * Math.sin(t * 4);
			const head = part(out, "shelly_Head");
			head.ry = .25 * Math.sin(t * .5) * (1 - s);
			head.rx = .1 * talk * Math.sin(t * 5) + .3 * sleep;
			for (const [side, offset] of [["L", 0], ["R", 1.7]]) {
				const stalk = part(out, `shelly_Stalk_${side}`);
				stalk.rx = .16 * Math.sin(t * 1.3 + offset) - .15 * s;
				stalk.rz = .14 * Math.sin(t * 1.05 + offset * 2);
				stalk.sy = 1 - .55 * sleep;
			}
			eyes(out, "shelly", state.blink);
			break;
		}
		case "cocoa": {
			const swing = .62 * s;
			const lift = .02 * s;
			const fold = sleep * (1 - s);
			const tap = .012 * talk * (1 - s);
			for (const [leg, sign, front] of [
				[
					"FL",
					1,
					1
				],
				[
					"BR",
					1,
					0
				],
				[
					"FR",
					-1,
					1
				],
				[
					"BL",
					-1,
					0
				]
			]) {
				const motion = part(out, `cocoa_Leg_${leg}`);
				motion.rx = sign * swing * Math.sin(p) + (front ? -1.25 : 1.2) * fold;
				motion.dy = lift * Math.max(0, -sign * Math.cos(p)) - .1 * fold + front * tap * Math.max(0, sign * Math.sin(t * TAU * 1.6));
			}
			const excite = Math.max(s, talk);
			const wag = (Math.sin(t * TAU * 2.8) * (1 - excite) + Math.sin(t * TAU * 4.6) * excite) * (1 - sleep) + Math.sin(t * TAU * .45) * sleep;
			const bounce = .012 * s * Math.abs(Math.cos(p));
			const body = part(out, "cocoa_Body");
			body.dy = bounce - .075 * fold;
			body.rz = .035 * s * Math.sin(p);
			body.rx = .07 * work;
			body.ry = (.035 + .04 * talk) * wag * (1 - sleep);
			const breath = sleep ? .035 * Math.sin(t * 1.3) : .018 * Math.sin(t * 2.2) * (1 - s);
			body.sy = 1 + breath;
			const tail = part(out, "cocoa_Tail");
			tail.ry = (.5 + .15 * excite - .38 * sleep) * wag;
			tail.rx = .2 * s + .2 * talk + .25 * work - .55 * sleep;
			tail.dy = body.dy;
			const cycle = t % 7;
			const curious = cycle < 2.4 ? Math.min(1, 1.8 * Math.sin(cycle / 2.4 * Math.PI)) : 0;
			const idle = (1 - s) * (1 - sleep) * (1 - work) * (1 - talk);
			const tilt = .32 * curious * idle * (Math.floor(t / 7) % 2 ? 1 : -1);
			const head = part(out, "cocoa_Head");
			head.rx = .06 * s * Math.sin(2 * p) + work * (.38 + .035 * Math.sin(t * TAU * 4)) + .22 * sleep + .08 * talk * Math.sin(t * TAU * 1.6);
			head.ry = .28 * Math.sin(t * .45) * idle * (1 - curious) + .28 * work * Math.sin(t * 1.2);
			head.rz = tilt + .14 * talk * Math.sin(t * 2.4);
			head.dy = .8 * bounce - .095 * fold - .03 * work + .1 * breath * sleep;
			const pant = talk * (.18 + .14 * Math.sin(t * TAU * 3.4));
			part(out, "cocoa_Jaw").rx = .1 * s * (1 - talk) + pant;
			const tongue = part(out, "cocoa_Tongue");
			tongue.sy = 1 + .3 * s + 1.5 * pant - .4 * sleep;
			tongue.sz = 1 + .6 * pant;
			const flop = .13 * s * (1 + Math.sin(2 * p - 1.2));
			for (const [side, outward, offset] of [[
				"L",
				-1,
				0
			], [
				"R",
				1,
				.9
			]]) {
				const ear = part(out, `cocoa_Ear_${side}`);
				ear.rz = outward * (flop + .28 * talk * (.5 + .5 * Math.sin(t * TAU * 2.2 + offset)) + .08 * fold) - .7 * head.rz;
				ear.rx = .12 * s * Math.sin(2 * p - .6) - .15 * curious * idle - .6 * head.rx;
			}
			eyes(out, "cocoa", state.blink);
			break;
		}
		default: break;
	}
	return out;
}
function voxelFrames(data, sheetWidth, sheetHeight, frameSize, row, frames) {
	if (!(frameSize > 0) || row < 0 || frames < 1) return null;
	const top = row * frameSize;
	if (top + frameSize > sheetHeight) return null;
	const out = [];
	let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
	for (let f = 0; f < frames; f++) {
		const left = f * frameSize;
		if (left + frameSize > sheetWidth) break;
		const voxels = [];
		for (let py = 0; py < frameSize; py++) for (let px = 0; px < frameSize; px++) {
			const i = ((top + py) * sheetWidth + left + px) * 4;
			if (data[i + 3] < 128) continue;
			const y = frameSize - 1 - py;
			voxels.push({
				x: px,
				y,
				color: data[i] << 16 | data[i + 1] << 8 | data[i + 2]
			});
			if (px < minX) minX = px;
			if (px > maxX) maxX = px;
			if (y < minY) minY = y;
			if (y > maxY) maxY = y;
		}
		if (voxels.length > 4096) return null;
		out.push(voxels);
	}
	if (out.length === 0 || !Number.isFinite(minX)) return null;
	return {
		frames: out,
		minX,
		maxX,
		minY,
		maxY
	};
}
var bolt_default = "/assets/bolt-B-Zgy4Hd.glb";
var brew_default = "/assets/brew-Dz7f8dyH.glb";
var cocoa_default = "/assets/cocoa-BbJGYFZm.glb";
var ember_default = "/assets/ember-ei6xgfT6.glb";
var miso_default = "/assets/miso-Bkz6c75r.glb";
var mochi_default = "/assets/mochi-DaP-hqHG.glb";
var shelly_default = "/assets/shelly-BByOIeun.glb";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var PET_FILES = {
	"../../../assets/society/companions/pets/bolt.glb": bolt_default,
	"../../../assets/society/companions/pets/brew.glb": brew_default,
	"../../../assets/society/companions/pets/cocoa.glb": cocoa_default,
	"../../../assets/society/companions/pets/ember.glb": ember_default,
	"../../../assets/society/companions/pets/miso.glb": miso_default,
	"../../../assets/society/companions/pets/mochi.glb": mochi_default,
	"../../../assets/society/companions/pets/shelly.glb": shelly_default
};
function petModelUrl(id) {
	const suffix = `/pets/${id}.glb`;
	for (const [key, url] of Object.entries(PET_FILES)) if (key.endsWith(suffix)) return url;
	return null;
}
var STUDIO = /* @__PURE__ */ new WeakMap();
function studioReflection(gl) {
	let texture = STUDIO.get(gl);
	if (!texture) {
		const pmrem = new PMREMGenerator(gl);
		const room = new RoomEnvironment();
		texture = pmrem.fromScene(room, .04).texture;
		room.dispose();
		pmrem.dispose();
		STUDIO.set(gl, texture);
	}
	return texture;
}
function ownMaterials(model, reflection) {
	const owned = [];
	model.traverse((object) => {
		const mesh = object;
		if (!mesh.isMesh) return;
		const swap = (material) => {
			const own = material.clone();
			if (reflection && own instanceof MeshStandardMaterial && !own.envMap) {
				own.envMap = reflection;
				own.envMapIntensity = .7;
			}
			owned.push(own);
			return own;
		};
		mesh.material = Array.isArray(mesh.material) ? mesh.material.map(swap) : swap(mesh.material);
	});
	return owned;
}
function applyMotion(part$1, motion) {
	const { object, position, rotation, scale } = part$1;
	object.position.set(position.x, position.y + motion.dy, position.z);
	object.rotation.set(rotation[0] + motion.rx, rotation[1] + motion.ry, rotation[2] + motion.rz);
	object.scale.set(scale.x * motion.sx, scale.y * motion.sy, scale.z * motion.sz);
}
function PetModel({ pet, drive, reduced, paused }) {
	const url = petModelUrl(pet.id);
	if (!url) throw new Error(`No 3D model for pet ${pet.id}`);
	const { scene } = useGLTF(url);
	const gl = useThree((state) => state.gl);
	const lit = useThree((state) => !!state.scene.environment);
	const instance = (0, import_react.useMemo)(() => {
		const model = scene.clone(true);
		const materials = ownMaterials(model, lit ? null : studioReflection(gl));
		const parts = /* @__PURE__ */ new Map();
		model.traverse((object) => {
			if (object.isMesh) object.castShadow = true;
			const name = typeof object.userData.name === "string" ? object.userData.name : object.name;
			if (name.startsWith(`${pet.id}_`)) parts.set(name, {
				object,
				position: object.position.clone(),
				rotation: [
					object.rotation.x,
					object.rotation.y,
					object.rotation.z
				],
				scale: object.scale.clone()
			});
		});
		const groundOffset = new Vector3();
		if (pet.id === "miso") {
			const torso = model.getObjectByName("miso_Torso");
			if (torso) {
				new Box3().setFromObject(torso).getCenter(groundOffset);
				groundOffset.set(-groundOffset.x, 0, -groundOffset.z);
			}
		}
		return {
			model,
			parts,
			groundOffset,
			materials
		};
	}, [
		scene,
		pet.id,
		gl,
		lit
	]);
	(0, import_react.useEffect)(() => () => {
		instance.materials.forEach((material) => material.dispose());
	}, [instance]);
	const rig = (0, import_react.useRef)(createRigState());
	const pose = (0, import_react.useMemo)(() => /* @__PURE__ */ new Map(), []);
	(0, import_react.useEffect)(() => {
		pose.clear();
	}, [pet.id, pose]);
	useFrame((_, dt) => {
		if (paused) return;
		const { speed, mood } = drive.current;
		stepRig(rig.current, pet, {
			dt,
			speed,
			mood,
			reduced
		});
		rigPose(pet, rig.current, mood, pose);
		for (const [name, motion] of pose) {
			const part$1 = instance.parts.get(name);
			if (part$1) applyMotion(part$1, motion);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		scale: pet.heightM / pet.modelHeightM,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: instance.groundOffset,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", {
				object: instance.model,
				dispose: null
			})
		})
	});
}
function useVoxelFrames(pet) {
	const [frames, setFrames] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setFrames(null);
		if (!pet.sheetUrl || !pet.frameSize || !pet.idle) return;
		let cancelled = false;
		const image = new Image();
		image.onload = () => {
			if (cancelled) return;
			const canvas = document.createElement("canvas");
			canvas.width = image.naturalWidth;
			canvas.height = image.naturalHeight;
			const context = canvas.getContext("2d", { willReadFrequently: true });
			if (!context) return;
			context.drawImage(image, 0, 0);
			const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
			const idle = pet.idle;
			const result = voxelFrames(data, canvas.width, canvas.height, pet.frameSize, idle.row, idle.frames);
			if (!result) console.warn("Pet sheet has no usable idle frames for a 3D figure", pet.id);
			setFrames(result);
		};
		image.onerror = () => {
			if (!cancelled) console.warn("Pet sheet could not load", pet.id);
		};
		image.src = pet.sheetUrl;
		return () => {
			cancelled = true;
			image.onload = null;
			image.onerror = null;
		};
	}, [
		pet.id,
		pet.sheetUrl,
		pet.frameSize,
		pet.idle
	]);
	return frames;
}
function VoxelPet({ pet, reduced, paused }) {
	const frames = useVoxelFrames(pet);
	const holder = (0, import_react.useRef)(null);
	const shown = (0, import_react.useRef)(-1);
	const clock = (0, import_react.useRef)(0);
	const capacity = frames ? Math.max(...frames.frames.map((f) => f.length)) : 0;
	const resources = (0, import_react.useMemo)(() => {
		if (!frames || capacity === 0) return null;
		const geometry = new BoxGeometry(1, 1, 1);
		const material = new MeshStandardMaterial({ roughness: .85 });
		const mesh = new InstancedMesh(geometry, material, capacity);
		mesh.castShadow = true;
		mesh.frustumCulled = false;
		return {
			mesh,
			geometry,
			material
		};
	}, [frames, capacity]);
	(0, import_react.useEffect)(() => () => {
		if (!resources) return;
		resources.mesh.dispose();
		resources.geometry.dispose();
		resources.material.dispose();
	}, [resources]);
	const scratch = (0, import_react.useMemo)(() => ({
		matrix: new Matrix4(),
		colour: new Color(),
		parent: new Quaternion(),
		facing: new Quaternion(),
		up: new Vector3(0, 1, 0),
		at: new Vector3()
	}), []);
	(0, import_react.useEffect)(() => {
		shown.current = -1;
	}, [resources]);
	useFrame(({ camera }, dt) => {
		if (!frames || !resources || !holder.current) return;
		if (!paused && !reduced) clock.current += Math.min(dt, .1);
		const index = Math.floor(clock.current * (pet.idle?.fps ?? 6)) % frames.frames.length;
		if (index !== shown.current) {
			shown.current = index;
			const voxel = pet.heightM / (frames.maxY - frames.minY + 1);
			const centreX = (frames.minX + frames.maxX + 1) / 2;
			const { mesh } = resources;
			const list = frames.frames[index];
			for (let i = 0; i < list.length; i++) {
				const v = list[i];
				scratch.matrix.makeScale(voxel, voxel, voxel * 2);
				scratch.matrix.setPosition((v.x + .5 - centreX) * voxel, (v.y - frames.minY + .5) * voxel, 0);
				mesh.setMatrixAt(i, scratch.matrix);
				mesh.setColorAt(i, scratch.colour.setHex(v.color));
			}
			mesh.count = list.length;
			mesh.instanceMatrix.needsUpdate = true;
			if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
		}
		const group = holder.current;
		const parent = group.parent;
		group.getWorldPosition(scratch.at);
		const yaw = Math.atan2(camera.position.x - scratch.at.x, camera.position.z - scratch.at.z);
		scratch.facing.setFromAxisAngle(scratch.up, yaw);
		if (parent) {
			parent.getWorldQuaternion(scratch.parent);
			group.quaternion.copy(scratch.parent.invert().multiply(scratch.facing));
		} else group.quaternion.copy(scratch.facing);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: holder,
		children: resources && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: resources.mesh })
	});
}
var VERTEX_HEAD = "#include <common>\nvarying vec3 vSkinPos;";
var VERTEX_BODY = "#include <begin_vertex>\nvSkinPos = position;";
var FRAGMENT_HEAD = `#include <common>
varying vec3 vSkinPos;
uniform vec3 uSkinColors[4];
uniform int uSkinCount;
uniform int uSkinRadial;
uniform vec2 uSkinDir;
uniform vec3 uSkinMin;
uniform vec3 uSkinMax;
uniform int uSkinEffect;
uniform float uSkinTime;
uniform vec3 uSkinHighlight;
vec3 skinSample(float t) {
  t = clamp(t, 0.0, 1.0) * float(uSkinCount - 1);
  vec3 c = uSkinColors[0];
  for (int i = 1; i < 4; i++) {
    if (i >= uSkinCount) break;
    c = mix(c, uSkinColors[i], clamp(t - float(i - 1), 0.0, 1.0));
  }
  return c;
}
vec3 skinRing(float u) {
  float t = fract(u) * float(uSkinCount);
  vec3 c = uSkinColors[0];
  for (int i = 1; i <= 4; i++) {
    if (i > uSkinCount) break;
    c = mix(c, uSkinColors[i % uSkinCount], clamp(t - float(i - 1), 0.0, 1.0));
  }
  return c;
}
float skinHash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float skinSpecks(vec3 p, float cells, float density, float speed) {
  vec3 q = p * cells;
  vec3 cell = floor(q);
  float h = skinHash(cell);
  vec3 offset = vec3(skinHash(cell + 1.7), skinHash(cell + 4.3), skinHash(cell + 8.9)) - 0.5;
  float d = length(fract(q) - 0.5 - offset * 0.5);
  float twinkle = 0.55 + 0.45 * sin(uSkinTime * speed + h * 40.0);
  return step(1.0 - density, h) * smoothstep(0.24, 0.02, d) * twinkle;
}`;
var FRAGMENT_DIFFUSE = `vec3 skinP = (vSkinPos - uSkinMin) / max(uSkinMax - uSkinMin, vec3(1e-4)) - 0.5;
float skinT = uSkinRadial == 1 ? length(skinP - vec3(-0.12, 0.16, 0.3)) * 1.25 : dot(skinP.xy, uSkinDir) + 0.5;
vec3 skinColor = uSkinEffect == 3 ? skinRing(skinT * 0.9 - uSkinTime * 0.14) : skinSample(skinT);
vec4 diffuseColor = vec4( skinColor, opacity );`;
var FRAGMENT_EMISSIVE = `#include <emissivemap_fragment>
if (uSkinEffect == 1) totalEmissiveRadiance += vec3(1.0) * skinSpecks(skinP, 7.0, 0.3, 2.4) * 2.6;
if (uSkinEffect == 2) {
  float sweep = fract(uSkinTime * 0.26) * 2.6 - 1.3;
  float band = exp(-pow((skinP.x + skinP.y * 0.6 - sweep) * 8.0, 2.0));
  totalEmissiveRadiance += vec3(band * 0.55);
}
if (uSkinEffect == 4) totalEmissiveRadiance += uSkinHighlight * (0.32 + 0.18 * sin(uSkinTime * 2.2));
if (uSkinEffect == 5) totalEmissiveRadiance += uSkinHighlight * skinSpecks(skinP, 5.0, 0.18, 1.6) * 2.4;`;
function effectCode(skin) {
	return SKIN_EFFECTS.indexOf(skinEffect(skin));
}
function createSkinMaterial(skin, geometry) {
	const box = new Box3(new Vector3(-.5, -.5, -.5), new Vector3(.5, .5, .5));
	if (geometry) {
		if (!geometry.boundingBox) geometry.computeBoundingBox();
		if (geometry.boundingBox) box.copy(geometry.boundingBox);
	}
	const colors = [
		0,
		1,
		2,
		3
	].map((i) => new Color(skin.colors[Math.min(i, skin.colors.length - 1)]));
	const rad = skin.angle * Math.PI / 180;
	const uniforms = {
		uSkinColors: { value: colors },
		uSkinCount: { value: skin.colors.length },
		uSkinRadial: { value: skin.pattern === "radial" ? 1 : 0 },
		uSkinDir: { value: new Vector2(Math.sin(rad), Math.cos(rad)) },
		uSkinMin: { value: box.min.clone() },
		uSkinMax: { value: box.max.clone() },
		uSkinEffect: { value: effectCode(skin) },
		uSkinTime: { value: 0 },
		uSkinHighlight: { value: new Color(skinHighlight(skin.colors)) }
	};
	const material = new MeshStandardMaterial({
		color: "#ffffff",
		roughness: skinEffect(skin) === "shimmer" ? .38 : .62
	});
	material.userData.skinUniforms = uniforms;
	material.onBeforeCompile = (shader) => {
		Object.assign(shader.uniforms, uniforms);
		shader.vertexShader = shader.vertexShader.replace("#include <common>", VERTEX_HEAD).replace("#include <begin_vertex>", VERTEX_BODY);
		shader.fragmentShader = shader.fragmentShader.replace("#include <common>", FRAGMENT_HEAD).replace("vec4 diffuseColor = vec4( diffuse, opacity );", FRAGMENT_DIFFUSE).replace("#include <emissivemap_fragment>", FRAGMENT_EMISSIVE);
	};
	material.customProgramCacheKey = () => "jarvis-companion-skin";
	return material;
}
function advanceSkin(material, seconds) {
	const uniforms = material.userData.skinUniforms;
	if (uniforms) uniforms.uSkinTime.value = (uniforms.uSkinTime.value + seconds) % 3600;
}
var PetBoundary = class extends import_react.Component {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch(error) {
		console.warn("Companion asset unavailable", error);
	}
	render() {
		return this.state.failed ? null : this.props.children;
	}
};
const WORN_PET_LIFT_M = .32;
function CompanionModel({ appearance, lead = false, drive, paused = false }) {
	const pet = useWornPet(lead ? void 0 : appearance.pet);
	if (pet === void 0) return null;
	if (pet) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WornPet, {
		pet,
		drive,
		paused
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShapeModel, {
		appearance,
		lead
	});
}
function WornPet({ pet, drive, paused }) {
	const reduced = useReducedMotion() ?? false;
	const still = (0, import_react.useRef)({
		speed: 0,
		mood: "idle"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			0,
			companionFlies(pet) ? WORN_PET_LIFT_M : 0,
			0
		],
		children: pet.kind === "model" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetModel, {
			pet,
			drive: drive ?? still,
			reduced,
			paused
		}) : pet.kind === "voxel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoxelPet, {
			pet,
			reduced,
			paused
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShapeModel, {
			appearance: GIGI_LOOK,
			lead: true
		})
	});
}
var GIGI_LOOK = {
	shape: "circle",
	color: "#ffcd61",
	eyes: "dots",
	enabled: true,
	accessories: {},
	sizeM: .5,
	followDistanceM: 1
};
function ShapeModel({ appearance, lead = false }) {
	const { scene } = useGLTF(lead ? gigi_default : companions_default);
	const reduced = useReducedMotion() ?? false;
	const skinKey = appearance.skin ? JSON.stringify(appearance.skin) : "";
	const instance = (0, import_react.useMemo)(() => {
		const original = lead ? scene : scene.getObjectByName(appearance.shape);
		if (!original) throw new Error("Companion silhouette missing from asset");
		const model = original.clone(true);
		const materials = [];
		if (!lead) {
			const ink = companionEyeColors(appearance.color);
			let bodyMesh;
			model.traverse((object) => {
				if (object.isMesh && object.name.includes("Body")) bodyMesh ??= object;
			});
			const body = appearance.skin ? createSkinMaterial(appearance.skin, bodyMesh?.geometry) : new MeshStandardMaterial({
				color: appearance.color,
				roughness: .62
			});
			const eyes$1 = new MeshStandardMaterial({
				color: ink.eye,
				roughness: 1
			});
			const shine = new MeshStandardMaterial({
				color: ink.highlight,
				roughness: 1
			});
			materials.push(body, eyes$1, shine);
			model.traverse((object) => {
				const mesh = object;
				if (!mesh.isMesh) return;
				const name = mesh.name;
				mesh.castShadow = true;
				mesh.visible = name.includes("Dots") ? appearance.eyes === "dots" : name.includes("Lines") ? appearance.eyes === "lines" : !name.includes("Highlight");
				mesh.material = name.includes("Body") ? body : name.includes("Highlight") ? shine : eyes$1;
			});
		}
		return {
			model,
			materials
		};
	}, [
		scene,
		lead,
		appearance.shape,
		appearance.color,
		appearance.eyes,
		skinKey
	]);
	(0, import_react.useEffect)(() => () => {
		instance.materials.forEach((material) => material.dispose());
	}, [instance]);
	useFrame((_, delta) => {
		if (!reduced && skinKey) advanceSkin(instance.materials[0], delta);
	});
	const wearing = !lead && wornAccessories(appearance.accessories).length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		scale: appearance.sizeM / (lead ? .4 : 1),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", {
			object: instance.model,
			dispose: null
		}), wearing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanionAccessories, { appearance })
		}) })]
	});
}
var PUFFS = 7;
var PUFF_GEOMETRY = new SphereGeometry(1, 12, 8);
function SmokePlume({ position, scale, color }) {
	const puffs = (0, import_react.useRef)([]);
	const reduced = useReducedMotion() ?? false;
	const materials = (0, import_react.useMemo)(() => Array.from({ length: PUFFS }, () => new MeshBasicMaterial({
		color,
		transparent: true,
		opacity: 0,
		depthWrite: false
	})), [color]);
	(0, import_react.useEffect)(() => () => {
		materials.forEach((material) => material.dispose());
	}, [materials]);
	useFrame(({ clock }) => {
		const t = clock.getElapsedTime();
		puffs.current.forEach((puff, i) => {
			if (!puff) return;
			const phase = (t / 3.4 + i / PUFFS) % 1;
			const wobble = Math.sin(t * 1.3 + i * 1.7) * .05;
			puff.position.set(phase * .12 + wobble * phase, phase * .62, phase * .04);
			puff.scale.setScalar(.035 + phase * .13);
			materials[i].opacity = Math.sin(Math.min(1, phase * 1.25) * Math.PI) * .42;
		});
	});
	if (reduced) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position,
		scale,
		children: materials.map((material, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			ref: (node) => {
				puffs.current[i] = node;
			},
			geometry: PUFF_GEOMETRY,
			material
		}, i))
	});
}
function CompanionAccessories({ appearance }) {
	const { scene } = useGLTF(accessories_default);
	const reflective = useThree((state) => !!state.scene.environment);
	const instance = (0, import_react.useMemo)(() => {
		const group = new Group();
		const materials = [];
		const meta = ACCESSORY_CATALOG.shapes[appearance.shape];
		const unit = 1 / (meta.bottom - meta.top);
		for (const item of wornAccessories(appearance.accessories)) {
			const fitted = scene.getObjectByName(`acc_${item.id}__${appearance.shape}__fit`);
			const free = fitted ? void 0 : scene.getObjectByName(`acc_${item.id}`);
			if (fitted) group.add(fitted.clone(true));
			if (free) {
				const [x, y, k] = meta.anchors[item.slot];
				const node = free.clone(true);
				node.position.set((x - 20) * unit, (meta.bottom - y) * unit, slotDepthM(appearance.shape, item.slot));
				node.rotation.set(0, 0, 0);
				node.scale.setScalar(k * (item.scale ?? 1) * unit);
				group.add(node);
			}
			const patch = item.regions ? scene.getObjectByName(`acc_${item.id}__${appearance.shape}`) : void 0;
			if (patch) group.add(patch.clone(true));
		}
		group.traverse((object) => {
			const mesh = object;
			if (!mesh.isMesh) return;
			mesh.castShadow = true;
			const source = mesh.material;
			const own = source.clone();
			const token = source.name.split(":")[1] ?? "";
			if (token && !token.startsWith("#")) own.color.set(resolveFill(token, appearance.color));
			if (!reflective && own.metalness > .5) {
				own.metalness = .35;
				own.roughness = .42;
			}
			mesh.material = own;
			materials.push(own);
		});
		const plumes = [];
		for (const item of wornAccessories(appearance.accessories)) {
			const [x, y, k] = meta.anchors[item.slot];
			const size = k * (item.scale ?? 1) * unit;
			const depth = slotDepthM(appearance.shape, item.slot);
			item.parts.forEach((part$1, index) => {
				if (part$1.t !== "smoke") return;
				plumes.push({
					key: `${item.id}-${index}`,
					color: part$1.fill,
					scale: part$1.size,
					position: [
						(x - 20) * unit + part$1.c[0] * size,
						(meta.bottom - y) * unit - part$1.c[1] * size,
						depth + part$1.c[2] * size
					]
				});
			});
		}
		return {
			group,
			materials,
			plumes
		};
	}, [
		scene,
		reflective,
		appearance.shape,
		appearance.color,
		appearance.accessories
	]);
	(0, import_react.useEffect)(() => () => {
		instance.materials.forEach((material) => material.dispose());
	}, [instance]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", {
		object: instance.group,
		dispose: null
	}), instance.plumes.map((plume) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmokePlume, {
		position: plume.position,
		scale: plume.scale,
		color: plume.color
	}, plume.key))] });
}
function AgentFollower({ owner, appearance, paused, lead = false, waypoint, initialPosition, clear }) {
	const root = (0, import_react.useRef)(null);
	const motion = (0, import_react.useRef)(null);
	const scratch = (0, import_react.useMemo)(() => new Vector3(), []);
	const phase = (0, import_react.useRef)(0);
	const reduced = useReducedMotion() ?? false;
	const { invalidate } = useThree();
	const worn = useWornPet(lead ? void 0 : appearance.pet);
	const drive = (0, import_react.useRef)({
		speed: 0,
		mood: "idle"
	});
	(0, import_react.useEffect)(() => {
		motion.current = null;
		invalidate();
	}, [appearance.enabled, invalidate]);
	useFrame((_, delta) => {
		if (!root.current || !owner.current) return;
		root.current.visible = appearance.enabled && owner.current.visible;
		if (!root.current.visible || paused) return;
		owner.current.getWorldPosition(scratch);
		const point = [
			scratch.x,
			scratch.y,
			scratch.z
		];
		let trail = motion.current ?? (motion.current = createPetTrail(initialPosition ?? point));
		if (!recordOwner(trail, point, waypoint?.current ?? void 0) && initialPosition) {
			trail = motion.current = createPetTrail(initialPosition);
			recordOwner(trail, point);
		}
		if (waypoint) waypoint.current = null;
		advancePetTrail(trail, appearance.followDistanceM, delta);
		if (!reduced) phase.current += Math.min(delta, .1) * trail.speed * 9;
		drive.current.speed = trail.speed;
		const bob = worn || reduced || trail.speed < .02 ? 0 : Math.abs(Math.sin(phase.current)) * .035;
		const display = petDisplayPosition(trail.position, trail.yaw, appearance.sizeM, clear);
		root.current.position.set(display[0], display[1] + .04 + bob, display[2]);
		root.current.rotation.y = trail.points.length ? trail.yaw : owner.current.rotation.y;
		if (trail.speed > .005) invalidate();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: root,
		visible: false,
		children: appearance.enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanionModel, {
				appearance,
				lead,
				drive,
				paused
			})
		}) }, lead ? "gigi" : appearance.pet ?? appearance.shape)
	});
}
export { VoxelPet as a, useWornPet as c, PetModel as i, companionFlies as l, CompanionModel as n, useCompanionPet as o, WORN_PET_LIFT_M as r, useSyncCompanionPet as s, AgentFollower as t, OrbitControls$1 as u };
