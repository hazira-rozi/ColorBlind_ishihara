const plates = [
  { image: "plates/plate1.jpg", answer: "12" },
  { image: "plates/plate2.jpg", answer: "8" },
  { image: "plates/plate3.jpg", answer: "6" },
  { image: "plates/plate4.jpg", answer: "29" },
  { image: "plates/plate5.jpg", answer: "57" },
  { image: "plates/plate6.jpg", answer: "5" },
  { image: "plates/plate7.jpg", answer: "3" },
  { image: "plates/plate8.jpg", answer: "15" },
  { image: "plates/plate9.jpg", answer: "74" },
  { image: "plates/plate10.jpg", answer: "2" },
  { image: "plates/plate11.jpg", answer: "6" },
  { image: "plates/plate12.jpg", answer: "45" },
  { image: "plates/plate13.jpg", answer: "5" },
  { image: "plates/plate14.jpg", answer: "7" },
  { image: "plates/plate15.jpg", answer: "16" },
  { image: "plates/plate16.jpg", answer: "73" },
  { image: "plates/plate17.jpg", answer: "42" }
];

let current = 0;
let correct = 0;
let userName = "";

function startTest() {
  userName = document.getElementById("userName").value.trim();
  if (userName === "") {
    alert("Please enter your name.");
    return;
  }

  document.getElementById("nameSection").style.display = "none";
  document.getElementById("testSection").style.display = "block";
  document.getElementById("greeting").textContent = `Hello, ${userName}!`;
  showPlate();
}

function showPlate() {
  document.getElementById("plateImage").src = plates[current].image;
  document.getElementById("plateCount").textContent = `Plate ${current + 1} of ${plates.length}`;
  document.getElementById("answerInput").value = "";
}

function submitAnswer() {
  const userAnswer = document.getElementById("answerInput").value.trim();
  if (userAnswer === plates[current].answer) {
    correct++;
  }

  current++;
  if (current < plates.length) {
    showPlate();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("testSection").style.display = "none";
  document.getElementById("resultSection").style.display = "block";

  let diagnosis;
  if (correct >= 15) {
    diagnosis = "Normal color vision.";
  } else if (correct >= 10) {
    diagnosis = "Possible mild color vision deficiency.";
  } else {
    diagnosis = "Possible color blindness (red-green deficiency).";
  }

  document.getElementById("finalResult").textContent = 
    `${userName}, you got ${correct} out of ${plates.length} correct. ${diagnosis}`;
}
