import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { healthyHomeCampaign as campaign } from "../domain/campaign.js";
import { HealthyHomeGame, STATES } from "../domain/game-engine.js";

const canvas = document.querySelector("#world");
const prompt = document.querySelector("#prompt");
const lesson = document.querySelector("#lesson");
const choices = document.querySelector("#choices");
const stars = document.querySelector("#stars");
const level = document.querySelector("#level");
const splash = document.querySelector("#splash");
const game = new HealthyHomeGame(campaign);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe8ff);
const camera = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 8.5, 13.5);
camera.lookAt(0, 0, 0);

scene.add(new THREE.HemisphereLight(0xffffff, 0x8cb77f, 2.7));
const sun = new THREE.DirectionalLight(0xffffff, 3.2);
sun.position.set(7, 12, 8);
sun.castShadow = true;
scene.add(sun);

const floor = new THREE.Mesh(new THREE.BoxGeometry(18, 0.35, 11), new THREE.MeshStandardMaterial({ color: 0xf2d8a8 }));
floor.position.y = -0.25;
floor.receiveShadow = true;
scene.add(floor);

const rooms = {
  bathroom: room(-6, 0x9edff3, "BATHROOM"),
  kitchen: room(0, 0xffcf8a, "KITCHEN"),
  bedroom: room(6, 0xcbb8ff, "BEDROOM"),
  "living-room": room(0, 0xaee6a7, "LIVING ROOM", -4.3),
};

function room(x, color, name, z = 0) {
  const group = new THREE.Group();
  const rug = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.12, 4.4), new THREE.MeshStandardMaterial({ color, roughness: 0.8 }));
  rug.position.set(x, 0, z);
  rug.receiveShadow = true;
  group.add(rug);
  const marker = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.7, 16), new THREE.MeshStandardMaterial({ color: 0xffffff }));
  marker.position.set(x, 0.42, z);
  group.add(marker);
  group.userData = { position: new THREE.Vector3(x, 0.65, z), name };
  scene.add(group);
  return group;
}

const tap = prop(1.3, 0.9, 0, 0x5b8ab9);
const soap = prop(-1.25, 0.45, 0.45, 0xff63aa, 0.28);
const chicken = prop(0, 0.5, -1.15, 0xc96c28, 0.48);
const tablet = prop(6, 0.5, -0.8, 0xff4068, 0.32);
const toilet = prop(-6, 0.5, 0, 0xf7fbff, 0.7);
void tap; void soap; void chicken; void tablet; void toilet;

function prop(x, y, z, color, size = 0.55) {
  const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 2), new THREE.MeshStandardMaterial({ color, roughness: 0.35 }));
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  scene.add(mesh);
  return mesh;
}

const hero = new THREE.Group();
const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 0.9, 6, 12), new THREE.MeshStandardMaterial({ color: 0x3155ff }));
body.castShadow = true;
const head = new THREE.Mesh(new THREE.SphereGeometry(0.37, 20, 20), new THREE.MeshStandardMaterial({ color: 0x8b4d27 }));
head.position.y = 0.95;
head.castShadow = true;
hero.add(body, head);
hero.position.copy(rooms.bathroom.userData.position);
scene.add(hero);

let target = hero.position.clone();
document.querySelector("#start").addEventListener("click", () => {
  splash.hidden = true;
  present(game.start());
});
document.querySelector("#restart").addEventListener("click", () => {
  document.body.classList.remove("failed", "complete");
  splash.hidden = false;
  hero.position.copy(rooms.bathroom.userData.position);
  target.copy(hero.position);
  present(game.reset());
});

function present(state) {
  stars.textContent = `★ ${state.stars}`;
  level.textContent = state.state === STATES.COMPLETE ? "Adventure complete" : `Mission ${Math.min(state.missionIndex + 1, state.missionCount)} of ${state.missionCount}`;
  choices.replaceChildren();

  if (state.feedback) lesson.textContent = state.feedback;
  if (state.state === STATES.CHOOSING) {
    prompt.textContent = state.mission.prompt;
    if (!state.feedback) lesson.textContent = state.mission.lesson;
    target = rooms[state.mission.room].userData.position.clone();
    state.mission.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice.label;
      button.type = "button";
      button.addEventListener("click", () => present(game.choose(choice.id)));
      choices.append(button);
    });
  } else if (state.state === STATES.FAILED) {
    prompt.textContent = "Mission paused. Let's learn and try again.";
    document.body.classList.add("failed");
  } else if (state.state === STATES.COMPLETE) {
    prompt.textContent = "Healthy Home Champion!";
    lesson.textContent = "You protected the meal, handled medicine safely, and covered a cough. Three smart choices, three stars.";
    document.body.classList.add("complete");
  }
}

renderer.setAnimationLoop((time) => {
  hero.position.lerp(target, 0.025);
  hero.rotation.y = Math.sin(time * 0.002) * 0.08;
  hero.position.y = 0.65 + Math.abs(Math.sin(time * 0.004)) * 0.08;
  renderer.render(scene, camera);
});

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

present(game.snapshot());
