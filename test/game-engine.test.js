import test from "node:test";
import assert from "node:assert/strict";
import { healthyHomeCampaign as campaign } from "../src/domain/campaign.js";
import { HealthyHomeGame, STATES } from "../src/domain/game-engine.js";

test("the healthy route completes the campaign with three stars", () => {
  const game = new HealthyHomeGame(campaign);
  game.start();
  game.choose("wash");
  game.choose("adult");
  const result = game.choose("elbow");
  assert.equal(result.state, STATES.COMPLETE);
  assert.equal(result.stars, 3);
});

test("eating before handwashing fails the mission", () => {
  const game = new HealthyHomeGame(campaign);
  game.start();
  const result = game.choose("eat");
  assert.equal(result.state, STATES.FAILED);
  assert.match(result.feedback, /unwashed hands/i);
});

test("unknown choices cannot mutate progression", () => {
  const game = new HealthyHomeGame(campaign);
  game.start();
  assert.throws(() => game.choose("invented"), /Unknown choice/);
  assert.equal(game.missionIndex, 0);
});
