import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  DoubleSide,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  Line,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Points,
  PointsMaterial,
  RingGeometry,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from "three";
import { haloTexture } from "../glow";
import { pseudoRandom } from "../random";
import type { RegisterUniforms } from "../registers";
import type { Act, ActContext } from "../types";

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

/**
 * Ato da consultoria — uma hipótese visual, não um fluxograma ilustrado.
 *
 * Um campo inicialmente disperso atravessa seis planos de decisão. A cada
 * plano ele perde ruído, ganha estrutura e termina numa malha que ainda se
 * move: produto bem definido não é produto congelado. O scroll conduz a
 * transformação, enquanto o ponteiro só muda o ponto de vista.
 */
export function createConsultingAct(): Act {
  const root = new Group();
  const instrument = new Group();
  root.add(instrument);

  const disposableGeometries: BufferGeometry[] = [];
  const disposableMaterials: Array<LineBasicMaterial | MeshBasicMaterial | PointsMaterial> = [];

  const pathPoints = [
    new Vector3(-1.72, -0.08, 0.08),
    new Vector3(-1.23, 0.2, -0.04),
    new Vector3(-0.72, -0.16, 0.05),
    new Vector3(-0.2, 0.13, -0.03),
    new Vector3(0.34, -0.1, 0.03),
    new Vector3(0.86, 0.1, -0.02),
    new Vector3(1.08, 0, 0),
  ];

  // Uma spline amostrada à mão mantém o update barato: nenhuma curva cria
  // objetos novos dentro do requestAnimationFrame.
  const samples = Array.from({ length: 181 }, (_, index) => {
    const t = index / 180;
    const scaled = t * (pathPoints.length - 1);
    const segment = Math.min(pathPoints.length - 2, Math.floor(scaled));
    const local = smooth(scaled - segment);
    return pathPoints[segment].clone().lerp(pathPoints[segment + 1], local);
  });

  const pathGeometry = new BufferGeometry().setFromPoints(samples);
  const pathMaterial = new LineBasicMaterial({ transparent: true, opacity: 0.28 });
  const path = new Line(pathGeometry, pathMaterial);
  disposableGeometries.push(pathGeometry);
  disposableMaterials.push(pathMaterial);
  instrument.add(path);

  const gateOuterGeometry = new TorusGeometry(0.39, 0.008, 5, 72);
  const gateInnerGeometry = new TorusGeometry(0.285, 0.004, 4, 56);
  const gateFieldGeometry = new RingGeometry(0.29, 0.385, 72);
  disposableGeometries.push(gateOuterGeometry, gateInnerGeometry, gateFieldGeometry);

  const gates = pathPoints.slice(1).map((point, index) => {
    const group = new Group();
    group.position.copy(point);
    group.rotation.y = Math.PI / 2;
    group.rotation.z = (pseudoRandom(index, 91) - 0.5) * 0.4;

    const lineMaterial = new MeshBasicMaterial({
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });
    const innerMaterial = lineMaterial.clone();
    const fieldMaterial = new MeshBasicMaterial({
      transparent: true,
      opacity: 0.015,
      depthWrite: false,
      side: DoubleSide,
    });
    disposableMaterials.push(lineMaterial, innerMaterial, fieldMaterial);

    const outer = new Mesh(gateOuterGeometry, lineMaterial);
    const inner = new Mesh(gateInnerGeometry, innerMaterial);
    const field = new Mesh(gateFieldGeometry, fieldMaterial);
    group.add(field, outer, inner);

    const tickGeometry = new BufferGeometry().setFromPoints([
      new Vector3(-0.48, 0, 0),
      new Vector3(-0.33, 0, 0),
      new Vector3(0.33, 0, 0),
      new Vector3(0.48, 0, 0),
      new Vector3(0, -0.48, 0),
      new Vector3(0, -0.33, 0),
      new Vector3(0, 0.33, 0),
      new Vector3(0, 0.48, 0),
    ]);
    const tickMaterial = new LineBasicMaterial({ transparent: true, opacity: 0.15 });
    disposableGeometries.push(tickGeometry);
    disposableMaterials.push(tickMaterial);
    group.add(new LineSegments(tickGeometry, tickMaterial));

    instrument.add(group);
    return { group, lineMaterial, innerMaterial, fieldMaterial, tickMaterial };
  });

  const particleGeometry = new BufferGeometry();
  const halo = haloTexture(64);
  const particleMaterial = new PointsMaterial({
    size: 0.032,
    map: halo,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    opacity: 0.45,
  });
  const particles = new Points(particleGeometry, particleMaterial);
  disposableGeometries.push(particleGeometry);
  disposableMaterials.push(particleMaterial);
  instrument.add(particles);

  const dustGeometry = new BufferGeometry();
  const dustMaterial = new PointsMaterial({
    size: 0.013,
    transparent: true,
    depthWrite: false,
    opacity: 0.14,
  });
  const dust = new Points(dustGeometry, dustMaterial);
  disposableGeometries.push(dustGeometry);
  disposableMaterials.push(dustMaterial);
  instrument.add(dust);

  const architecture = new Group();
  architecture.position.copy(pathPoints[pathPoints.length - 1]);
  const coreGeometry = new IcosahedronGeometry(0.36, 1);
  const coreEdgesGeometry = new EdgesGeometry(coreGeometry);
  const coreMaterial = new MeshBasicMaterial({
    transparent: true,
    opacity: 0.025,
    depthWrite: false,
  });
  const edgeMaterial = new LineBasicMaterial({ transparent: true, opacity: 0.42 });
  const core = new Mesh(coreGeometry, coreMaterial);
  const edges = new LineSegments(coreEdgesGeometry, edgeMaterial);
  disposableGeometries.push(coreGeometry, coreEdgesGeometry);
  disposableMaterials.push(coreMaterial, edgeMaterial);
  architecture.add(core, edges);

  const orbitGeometry = new TorusGeometry(0.53, 0.004, 4, 80);
  const orbitMaterial = new MeshBasicMaterial({ transparent: true, opacity: 0.24 });
  const orbitBMaterial = orbitMaterial.clone();
  const orbitA = new Mesh(orbitGeometry, orbitMaterial);
  const orbitB = new Mesh(orbitGeometry, orbitBMaterial);
  orbitA.rotation.x = 1.12;
  orbitA.rotation.y = 0.35;
  orbitB.rotation.x = 0.35;
  orbitB.rotation.y = 1.1;
  disposableGeometries.push(orbitGeometry);
  disposableMaterials.push(orbitMaterial, orbitBMaterial);
  architecture.add(orbitA, orbitB);

  const satelliteGeometry = new SphereGeometry(0.025, 8, 8);
  const satelliteMaterial = new MeshBasicMaterial();
  disposableGeometries.push(satelliteGeometry);
  disposableMaterials.push(satelliteMaterial);
  const satellitePositions = [
    new Vector3(0.46, 0.22, 0.2),
    new Vector3(-0.38, 0.31, -0.24),
    new Vector3(0.12, -0.48, 0.22),
    new Vector3(-0.18, -0.22, -0.48),
  ];
  satellitePositions.forEach((position) => {
    const satellite = new Mesh(satelliteGeometry, satelliteMaterial);
    satellite.position.copy(position);
    architecture.add(satellite);
  });
  instrument.add(architecture);

  let positions = new Float32Array();
  let starts = new Float32Array();
  let targets = new Float32Array();
  let offsets = new Float32Array();
  let delays = new Float32Array();
  const temp = new Vector3();
  const ink = new Color();
  const accent = new Color();
  let pointerReader: ActContext["pointer"] = () => null;

  const pointOnPath = (progress: number, target: Vector3) => {
    const scaled = clamp01(progress) * (samples.length - 1);
    const index = Math.min(samples.length - 2, Math.floor(scaled));
    return target.copy(samples[index]).lerp(samples[index + 1], scaled - index);
  };

  return {
    id: "consulting",
    anchor: "#metodo-jornada",
    frame: () => document.querySelector(".consulting__scene-frame"),
    scale: { pt: "", en: "" },

    build(ctx: ActContext) {
      pointerReader = ctx.pointer;
      const total = Math.max(260, Math.floor(ctx.budget.particles / 9));
      positions = new Float32Array(total * 3);
      starts = new Float32Array(total * 3);
      targets = new Float32Array(total * 3);
      offsets = new Float32Array(total * 3);
      delays = new Float32Array(total);

      for (let index = 0; index < total; index += 1) {
        const i = index * 3;
        starts[i] = -1.76 + (pseudoRandom(index, 1) - 0.5) * 0.55;
        starts[i + 1] = (pseudoRandom(index, 2) - 0.5) * 1.15;
        starts[i + 2] = (pseudoRandom(index, 3) - 0.5) * 0.8;
        positions[i] = starts[i];
        positions[i + 1] = starts[i + 1];
        positions[i + 2] = starts[i + 2];

        const y = 1 - (2 * (index + 0.5)) / total;
        const radius = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = index * Math.PI * (3 - Math.sqrt(5));
        targets[i] = 1.08 + Math.cos(theta) * radius * 0.32;
        targets[i + 1] = y * 0.32;
        targets[i + 2] = Math.sin(theta) * radius * 0.32;

        offsets[i] = 0;
        offsets[i + 1] = (pseudoRandom(index, 4) - 0.5) * 0.38;
        offsets[i + 2] = (pseudoRandom(index, 5) - 0.5) * 0.38;
        delays[index] = pseudoRandom(index, 6);
      }
      particleGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

      const dustTotal = Math.max(90, Math.floor(total / 2.5));
      const dustPositions = new Float32Array(dustTotal * 3);
      for (let index = 0; index < dustTotal; index += 1) {
        dustPositions[index * 3] = (pseudoRandom(index, 51) - 0.5) * 4.1;
        dustPositions[index * 3 + 1] = (pseudoRandom(index, 52) - 0.5) * 1.65;
        dustPositions[index * 3 + 2] = (pseudoRandom(index, 53) - 0.5) * 1.2;
      }
      dustGeometry.setAttribute("position", new Float32BufferAttribute(dustPositions, 3));
      return root;
    },

    update(t: number, progress: number, register: RegisterUniforms) {
      ink.setRGB(register.stroke[0], register.stroke[1], register.stroke[2]);
      accent.setRGB(register.halo[0], register.halo[1], register.halo[2]);
      pathMaterial.color.copy(ink);
      pathMaterial.opacity = register.strokeAlpha * 1.25;
      particleMaterial.color.copy(accent);
      particleMaterial.opacity = Math.min(0.5, register.haloAlpha * 1.55);
      dustMaterial.color.copy(ink);
      dustMaterial.opacity = register.strokeAlpha * 0.65;
      edgeMaterial.color.copy(ink);
      coreMaterial.color.copy(accent);
      orbitMaterial.color.copy(ink);
      orbitBMaterial.color.copy(accent);
      satelliteMaterial.color.copy(accent);

      const phase = Math.min(5, Math.floor(progress * 6));
      gates.forEach((gate, index) => {
        const proximity = Math.max(0, 1 - Math.abs(index - progress * 5.75));
        const passed = index < phase ? 1 : 0;
        gate.lineMaterial.color.copy(ink);
        gate.innerMaterial.color.copy(index % 2 ? accent : ink);
        gate.fieldMaterial.color.copy(index % 2 ? accent : ink);
        gate.tickMaterial.color.copy(ink);
        gate.lineMaterial.opacity = register.strokeAlpha * (0.62 + proximity * 1.5 + passed * 0.22);
        gate.innerMaterial.opacity = register.strokeAlpha * (0.35 + proximity * 1.1);
        gate.fieldMaterial.opacity = register.strokeAlpha * (0.04 + proximity * 0.2);
        gate.tickMaterial.opacity = register.strokeAlpha * (0.45 + proximity * 0.7);
        const pulse = 1 + proximity * (0.045 + Math.sin(t * 2.2 + index) * 0.018);
        gate.group.scale.setScalar(pulse);
        gate.group.rotation.z += 0.0007 * (index % 2 ? -1 : 1);
      });

      const attribute = particleGeometry.getAttribute("position") as Float32BufferAttribute;
      const total = delays.length;
      for (let index = 0; index < total; index += 1) {
        const i = index * 3;
        const motion = smooth(progress * 1.14 - delays[index] * 0.14);

        if (motion < 0.18) {
          const gather = smooth(motion / 0.18);
          pointOnPath(0, temp);
          positions[i] = starts[i] + (temp.x - starts[i]) * gather;
          positions[i + 1] =
            starts[i + 1] + (temp.y + offsets[i + 1] - starts[i + 1]) * gather;
          positions[i + 2] =
            starts[i + 2] + (temp.z + offsets[i + 2] - starts[i + 2]) * gather;
        } else if (motion < 0.84) {
          const travel = (motion - 0.18) / 0.66;
          pointOnPath(travel, temp);
          const taper = 1 - travel * 0.76;
          positions[i] = temp.x;
          positions[i + 1] = temp.y + offsets[i + 1] * taper;
          positions[i + 2] = temp.z + offsets[i + 2] * taper;
        } else {
          const settle = smooth((motion - 0.84) / 0.16);
          const last = samples[samples.length - 1];
          positions[i] = last.x + (targets[i] - last.x) * settle;
          positions[i + 1] =
            last.y + offsets[i + 1] * 0.24 * (1 - settle) + (targets[i + 1] - last.y) * settle;
          positions[i + 2] =
            last.z + offsets[i + 2] * 0.24 * (1 - settle) + (targets[i + 2] - last.z) * settle;
        }
      }
      attribute.needsUpdate = true;

      const reveal = smooth((progress - 0.62) / 0.28);
      architecture.scale.setScalar(Math.max(0.001, reveal));
      architecture.rotation.y = t * 0.13 + progress * 0.5;
      architecture.rotation.x = 0.12 + Math.sin(t * 0.22) * 0.06;
      coreMaterial.opacity = reveal * register.haloAlpha * 0.26;
      edgeMaterial.opacity = reveal * register.strokeAlpha * 1.6;
      orbitMaterial.opacity = reveal * register.strokeAlpha * 0.95;
      orbitBMaterial.opacity = reveal * register.haloAlpha * 0.95;

      dust.rotation.y = t * 0.012;
      const pointer = pointerReader();
      instrument.rotation.y += ((pointer?.x ?? 0) * 0.055 - instrument.rotation.y) * 0.045;
      instrument.rotation.x += ((pointer?.y ?? 0) * 0.035 - instrument.rotation.x) * 0.045;
    },

    station(progress: number) {
      return {
        position: new Vector3(0.03 + progress * 0.08, 0.06, 4.15 - progress * 0.12),
        target: new Vector3(0.03 + progress * 0.12, 0, 0),
      };
    },

    dispose() {
      disposableGeometries.forEach((geometry) => geometry.dispose());
      disposableMaterials.forEach((material) => material.dispose());
      halo.dispose();
    },
  };

}
