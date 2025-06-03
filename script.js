// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const studentID = document.getElementById("studentID").value;
  const room = document.getElementById("roomNumber").value;
  const email = document.getElementById("email").value;

  if (studentID.length !== 8 || room.length !== 4) {
    alert("Student ID must be 8 digits, Room Number must be 4 digits.");
    return;
  }

  try {
    await addDoc(collection(db, "attendees"), {
      name,
      studentID,
      room,
      email,
      timestamp: new Date()
    });

    // Send confirmation email
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      to_name: name,
      to_email: email
    }, "YOUR_PUBLIC_KEY");

    document.getElementById("status").textContent = "Submission successful! Check your email.";
  } catch (err) {
    console.error(err);
    document.getElementById("status").textContent = "There was an error.";
  }
});
