// app.js
// Firebase + Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCHmfOv5oZe2r4n8MRE02x1t5EBIXXcjqg",
  authDomain: "roompartysignup.firebaseapp.com",
  projectId: "roompartysignup",
  storageBucket: "roompartysignup.firebasestorage.app",
  messagingSenderId: "16363538188",
  appId: "1:16363538188:web:c6e40175e84da6840e2b29"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form submit
document.getElementById("signup-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = e.target.name.value;
  const studentID = e.target.studentID.value;
  const room = e.target.room.value;
  const email = e.target.email.value;

  try {
    // Save to Firebase
    await addDoc(collection(db, "partyGuests"), {
      name,
      studentID,
      room,
      email,
      timestamp: new Date()
    });

    // Send confirmation email
    emailjs.send("service_8kr7wvx", "template_s9x70vz", {
  name: name,
  email: email
}).then(response => {
  console.log("Email sent:", response);
  alert("Signup successful! Confirmation email sent.");
  e.target.reset();
}).catch(error => {
  console.error("Email failed:", error);
  alert("Signup successful, but email failed.");
});