import { Group, SpotLight, PointLight } from 'three';
import AnimationStore from '../stores/AnimationStore';

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const point = new PointLight(0xFFFFFF, 1, 10, 1);
    const dir = new SpotLight(0xFFFFFF, 1, 10, 1, 1, 1);

    dir.position.set(-1, 5, 2);
    dir.target.position.set(0,0,0);

    dir.castShadow = true;

    dir.shadow.mapSize.width = 512 * 2;
    dir.shadow.mapSize.height = 512 * 2;

    dir.shadow.camera.near = 1;
    dir.shadow.camera.far = 10;
    dir.shadow.camera.fov = 40;

    AnimationStore.addChangeListener( (d)=>{
      const { startTime, currentTime } = d;
      const delta = (currentTime - startTime) / 1000;
      const r = 2;
      const x = r * Math.cos( delta );
      const z = r * Math.sin( delta );
      point.position.set(x, 0.5, z);
    });

    this.add(point, dir);
  }
}
