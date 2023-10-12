import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAOLlhMD_jCbJjW6SFnnCLOqG8Ka9uSyEE",
  authDomain: "lyrid-crud-test.firebaseapp.com",
  projectId: "lyrid-crud-test",
  storageBucket: "lyrid-crud-test.appspot.com",
  messagingSenderId: "542152688657",
  appId: "1:542152688657:web:ed7e812bbf0a99857f5db0"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
