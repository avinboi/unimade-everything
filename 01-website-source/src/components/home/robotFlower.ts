import type { Application } from "@splinetool/runtime";

const PETALS = 6;

/**
 * Tucks a little pink flower onto the hero robot's head. Built at runtime through the
 * Spline API and parented to the "Head" group, so it tilts along as the robot follows the cursor.
 * Positions are in the head's local units (its dome tops out around y = 105).
 */
export async function addRobotFlower(app: Application) {
  if (app.findObjectByName("Flower")) return;
  const head = app.findObjectByName("Head");
  if (!head) return;

  const flower = await app.createObject("Group", {
    name: "Flower",
    parent: head,
    position: [20, 108, 14],
    rotation: [-12, 0, -24],
  });
  const add = (type: string, options: Parameters<Application["createObject"]>[1]) =>
    app.createObject(type, { parent: flower, ...options });

  await add("Cylinder", {
    name: "Flower Stem",
    position: [0, -14, -2],
    scale: [0.06, 0.22, 0.06],
    material: { color: "#4ade80", roughness: 0.5 },
  });
  await add("Sphere", {
    name: "Flower Leaf",
    position: [8, -15, -2],
    rotation: [0, 0, -45],
    scale: [0.14, 0.06, 0.04],
    material: { color: "#22c55e", roughness: 0.45 },
  });

  for (let i = 0; i < PETALS; i++) {
    const angle = (i / PETALS) * 360;
    const rad = (angle * Math.PI) / 180;
    await add("Sphere", {
      name: `Flower Petal ${i + 1}`,
      position: [Math.cos(rad) * 13, Math.sin(rad) * 13, 0],
      rotation: [0, 0, angle - 90],
      scale: [0.17, 0.28, 0.07],
      material: { color: i % 2 ? "#f9a8d4" : "#f472b6", roughness: 0.3 },
    });
  }

  await add("Sphere", {
    name: "Flower Center",
    position: [0, 0, 3.5],
    scale: [0.12, 0.12, 0.09],
    material: { color: "#fde047", roughness: 0.4 },
  });
}
