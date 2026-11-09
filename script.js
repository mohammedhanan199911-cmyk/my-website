// Import Firebase Modular SDK via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration from Console
const firebaseConfig = {
    apiKey: "AIzaSyCKGh-umjNMvJFU03BUYhzOjM9GhSc2CCo",
    authDomain: "my-website-db-855ae.firebaseapp.com",
    projectId: "my-website-db-855ae",
    storageBucket: "my-website-db-855ae.firebasestorage.app",
    messagingSenderId: "522154136289",
    appId: "1:522154136289:web:72889e9a7f4609227b5da0"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const message = document.getElementById('userMessage').value.trim();

        submitBtn.disabled = true;
        submitBtn.innerText = "Saving to Firebase...";
        formStatus.className = "status-msg hidden";

        try {
            // Add a new document to the "contacts" collection in Firestore
            await addDoc(collection(db, "contacts"), {
                name: name,
                email: email,
                message: message,
                createdAt: serverTimestamp()
            });

            formStatus.innerText = "🎉 Message saved successfully in Firebase Database!";
            formStatus.className = "status-msg status-success";
            contactForm.reset();
        } catch (error) {
            console.error("Firebase Error: ", error);
            formStatus.innerText = "❌ Failed to save: " + error.message;
            formStatus.className = "status-msg status-error";
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "Send Message to Firebase";
        }
    });
}
