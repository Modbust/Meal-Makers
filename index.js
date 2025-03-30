import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const app = initializeApp({
  apiKey: "AIzaSyAQTQFDmCje513tV_kkyMF2TyVeBz2fh6Q",
  authDomain: "meal-makers.firebaseapp.com",
  projectId: "meal-makers",
  storageBucket: "meal-makers.firebasestorage.app",
  messagingSenderId: "465895986321",
  appId: "1:465895986321:web:342a82e11bbe0775699b30",
  measurementId: "G-C7KRBBZMDR",
});

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const user = auth.currentUser;

var displayName;
var email;
var photoURL;
var token;

onAuthStateChanged(auth, (user) => {
  document.getElementById("dropdown-content").hidden = true;
  if (user != null) {
    console.log("Signed in");

    displayName = user.displayName;
    email = user.email;
    photoURL = user.photoURL;
    token = user.token;

    document.getElementById("pfp").src = photoURL;
    document.getElementById("pfp").style.display = "block";
    document.getElementById("sign-in").hidden = true;
  } else {
    console.log("Signed Out");
    document.getElementById("sign-in").hidden = false;
    document.getElementById("pfp").style.display = "none";
  }
});

getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    console.log("Error signing in");
  });

window.addEventListener("load", function () {
  document.getElementById("sign-in").onclick = function () {
    if (auth.currentUser == null) {
      signInWithRedirect(auth, provider);
    }
  };

  document.getElementById("sign-out").onclick = function () {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log("Error signing out");
      });
  };

  document.getElementById("pfp").onclick = function () {
    if (document.getElementById("dropdown-content").hidden) {
      document.getElementById("dropdown-content").hidden = false;
    } else {
      document.getElementById("dropdown-content").hidden = true;
    }
  };
});

window.onclick = function (event) {
  if (!event.target.matches("#pfp")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
