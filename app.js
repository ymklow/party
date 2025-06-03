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
    await emailjs.send("your_service_id", "your_template_id", {
      name: name,
      email: email
    });

    alert("Signup successful! Confirmation email sent.");
    e.target.reset();
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong.");
  }
});
