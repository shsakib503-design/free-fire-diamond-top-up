import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const paymentForm = document.getElementById("paymentForm");
const fileInput = document.getElementById("screenshotFile"); // optional file input
const urlInput = document.getElementById("screenshot"); // optional URL input

if (paymentForm) {
  paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // collect fields
    const name = document.getElementById("name")?.value || "";
    const uid = document.getElementById("uid")?.value || "";
    const amount = document.getElementById("amount")?.value || "";
    const number = document.getElementById("number")?.value || "";
    const trxid = document.getElementById("trxid")?.value || "";

    // handle screenshot: prefer file upload, fallback to URL input, else null
    let screenshotUrl = null;

    try {
      if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const storage = getStorage();
        const path = `screenshots/${Date.now()}_${file.name}`;
        const ref = storageRef(storage, path);
        await uploadBytes(ref, file);
        screenshotUrl = await getDownloadURL(ref);
      } else if (urlInput && urlInput.value.trim() !== "") {
        screenshotUrl = urlInput.value.trim();
      }

      const data = {
        name,
        uid,
        amount,
        number,
        trxid,
        screenshot: screenshotUrl || null,
        status: "Pending",
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "orders"), data);

      // show success UI (match your index.html behavior)
      document.getElementById("manual-payment").style.display = "none";
      document.getElementById("success").style.display = "block";
      paymentForm.reset();

    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting payment. Try again.");
    }
  });
}