export const healthyHomeCampaign = Object.freeze({
  id: "healthy-home-foundation",
  title: "Healthy Home Adventure",
  missions: [
    {
      id: "clean-hands",
      room: "kitchen",
      prompt: "You just left the toilet. The chicken smells delicious. What comes first?",
      lesson: "Wash with soap and clean running water before touching food.",
      choices: [
        { id: "eat", label: "Eat the chicken now", correct: false, feedback: "Germs from unwashed hands can reach food." },
        { id: "wash", label: "Wash hands with soap", correct: true, feedback: "Clean hands help stop germs from reaching your food." },
      ],
    },
    {
      id: "medicine-safety",
      room: "bedroom",
      prompt: "A colorful tablet is on the table. Nobody told you to take it. What should you do?",
      lesson: "Medicine is only used with a trusted adult and the correct instructions.",
      choices: [
        { id: "take", label: "Taste it", correct: false, feedback: "Never taste unknown medicine. It can be harmful." },
        { id: "adult", label: "Tell a trusted adult", correct: true, feedback: "Excellent. A trusted adult can secure it safely." },
      ],
    },
    {
      id: "cough-care",
      room: "living-room",
      prompt: "The hero needs to cough while standing near a friend. What is the healthy move?",
      lesson: "Cover a cough with a tissue or the inside of your elbow, then clean your hands.",
      choices: [
        { id: "open", label: "Cough into the air", correct: false, feedback: "An uncovered cough can spread droplets." },
        { id: "elbow", label: "Use the inside of the elbow", correct: true, feedback: "Great choice. This helps protect people nearby." },
      ],
    },
  ],
});
