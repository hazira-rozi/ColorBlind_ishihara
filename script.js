const plates = [
  { image: "plates/plate1.jpg", answer: "12" },
  { image: "plates/plate2.jpg", answer: "8" },
  { image: "plates/plate3.jpg", answer: "6" },
  { image: "plates/plate4.jpg", answer: "29" },
  { image: "plates/plate5.jpg", answer: "57" },
  { image: "plates/plate6.jpg", answer: "5" },
  { image: "plates/plate7.jpg", answer: "3" },
  { image: "plates/plate8.jpg", answer: "15" },
  { image: "plates/plate9.jpg", answer: "6" },
  { image: "plates/plate10.jpg", answer: "74" },
  { image: "plates/plate11.jpg", answer: "2" },
  { image: "plates/plate12.jpg", answer: "97" },
  { image: "plates/plate13.jpg", answer: "45" },
  { image: "plates/plate14.jpg", answer: "5" },
  { image: "plates/plate15.jpg", answer: "7" },
  { image: "plates/plate16.jpg", answer: "16" },
  { image: "plates/plate17.jpg", answer: "73" }
];

let current = 0;
let responses = [];
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
  document.getElementById("result-screen").style.display = "block";

  const score = responses.filter(r => r[3] === "Benar").length;
  const prediction = score >= 15 ? "Normal" : score >= 10 ? "Anomali Ringan" : "Kemungkinan Buta Warna";
  document.getElementById("score-text").textContent = `Skor: ${score}/${plates.length}, Prediksi: ${prediction}`;

  // Kirim ke Google Apps Script (ganti URL)
  fetch("https://script.google.com/macros/s/AKfycbwOdLWyYZ10iBP6vOE2rVPohn6AaNmw0B2kBcxe7ppFL33gItq--Q-8qwrp3sLDsvBV/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: userName,
      score: score,
      total: plates.length,
      prediction: prediction,
      answers: responses
    })
  });
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const score = responses.filter(r => r[3] === "Benar").length;
  const prediction = score >= 15 ? "Normal" : score >= 10 ? "Anomali Ringan" : "Kemungkinan Buta Warna";

  doc.text("Hasil Tes Buta Warna", 20, 20);
  doc.text(`Nama: ${username}`, 20, 30);
  doc.text(`Skor: ${score}/${plates.length}`, 20, 40);
  doc.text(`Prediksi: ${prediction}`, 20, 50);
  doc.save("transkrip_" + username + ".pdf");
}
