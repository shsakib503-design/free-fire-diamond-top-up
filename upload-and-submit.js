import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const paymentForm = document.getElementById("paymentForm");
const fileInput = document.getElementById("screenshotFile");
const urlInput = document.getElementById("screenshot");

if (paymentForm) {
  paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect values reliably
    const name = document.getElementById("name")?.value?.trim() || "";
    const uid = document.getElementById("uid")?.value?.trim() || "";
    const amount = document.getElementById("amount")?.value?.trim() || "";
    const number = document.getElementById("number")?.value?.trim() || "";
    const trxid = document.getElementById("trxid")?.value?.trim() || "";
   
    if (!name || !uid || !number || !trxid) {
      alert("Please fill all required fields.");
      return;
    }

    let screenshotUrl = null;

    try {
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
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
        package,
        number,
        trxid,
        screenshot: screenshotUrl || null,
        status: "Pending",
        createdAt: serverTimestamp()
      };

      console.log("Submitting order to Firestore:", data);

      await addDoc(collection(db, "orders"), data);

      document.getElementById("manual-payment").style.display = "none";
      document.getElementById("success").style.display = "block";
      paymentForm.reset();

    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting payment. See console for details.");
    }
  });
}
