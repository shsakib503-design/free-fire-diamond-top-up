import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore();

async function loadOrders() {
  const querySnapshot = await getDocs(collection(db, "orders"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}
loadOrders();
