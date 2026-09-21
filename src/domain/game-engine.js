export const STATES = Object.freeze({ READY: "ready", CHOOSING: "choosing", FAILED: "failed", COMPLETE: "complete" });

export class HealthyHomeGame {
  constructor(campaign) {
    this.campaign = campaign;
    this.reset();
  }

  reset() {
    this.state = STATES.READY;
    this.missionIndex = 0;
    this.stars = 0;
    this.history = [];
    return this.snapshot();
  }

  start() {
    if (this.state !== STATES.READY) throw new Error("Campaign already started.");
    this.state = STATES.CHOOSING;
    return this.snapshot();
  }

  choose(choiceId) {
    if (this.state !== STATES.CHOOSING) throw new Error(`Choice unavailable during ${this.state}.`);
    const mission = this.currentMission;
    const choice = mission.choices.find((item) => item.id === choiceId);
    if (!choice) throw new Error(`Unknown choice: ${choiceId}`);

    this.history.push({ missionId: mission.id, choiceId, correct: choice.correct });
    if (!choice.correct) {
      this.state = STATES.FAILED;
      return this.snapshot({ feedback: choice.feedback });
    }

    this.stars += 1;
    this.missionIndex += 1;
    if (this.missionIndex === this.campaign.missions.length) this.state = STATES.COMPLETE;
    return this.snapshot({ feedback: choice.feedback });
  }

  get currentMission() {
    return this.campaign.missions[this.missionIndex] ?? null;
  }

  snapshot(extra = {}) {
    return Object.freeze({
      state: this.state,
      missionIndex: this.missionIndex,
      missionCount: this.campaign.missions.length,
      stars: this.stars,
      mission: this.currentMission,
      ...extra,
    });
  }
}
