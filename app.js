// app.js
// Firebase + Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCHmfOv5oZe2r4n8MRE02x1t5EBIXXcjqg",
  authDomain: "roompartysignup.firebaseapp.com",
  projectId: "roompartysignup",
  storageBucket: "roompartysignup.appspot.com",
  messagingSenderId: "16363538188",
  appId: "1:16363538188:web:c6e40175e84da6840e2b29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize EmailJS
(function () {
  emailjs.init("hjHRKyMjQt1F5GRtm");
})();

// Handle form submit
document.getElementById("signup-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submit-btn");
  const originalBtnText = submitBtn.textContent;

  // Show loading
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  // Get form values
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
      timestamp: new Date(),
    });

    console.log("Data saved to Firebase successfully");

    // Send confirmation email
    const templateParams = {
      name: name,
      email: email,
      studentID: studentID,
      room: room,
    };

    try {
      const response = await emailjs.send(
        "service_8kr7wvx",
        "template_s9x70vz",
        templateParams
      );

      console.log("Email sent successfully:", response);

      Swal.fire({
        title: "Signup successful! Confirmation email sent.",
        icon: "success",
      });

      e.target.reset();
    } catch (emailError) {
      console.error("Email failed:", emailError);

      Swal.fire({
        title: "Signup successful, but confirmation email failed to send.",
        icon: "warning",
      });
    }
  } catch (firebaseError) {
    console.error("Firebase error:", firebaseError);

    Swal.fire({
      title: "Signup failed. Please try again.",
      icon: "error",
    });
  } finally {
    // Reset loading state
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
});