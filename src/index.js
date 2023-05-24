import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,

} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBymh5Kh6a-t8GObVVwyuJ6h7dBYKEqo5M",
  authDomain: "fir-startup-e554f.firebaseapp.com",
  projectId: "fir-startup-e554f",
  storageBucket: "fir-startup-e554f.appspot.com",
  messagingSenderId: "136552291737",
  appId: "1:136552291737:web:4f54efd44eaecb2080c708",
};

// init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();
const auth = getAuth()

// collection ref
const colRef = collection(db, "Books");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

const docRef = doc(db, "Books", deleteBookForm.id.value);
deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

//Queries
const q = query(
  colRef,
  where("author", "==", "Harry"),
  orderBy("createdAt"),

);

// Real time database
const subDb = onSnapshot(q, (snap) => {
  let books = [];
  snap.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

let x = null;
const fetch = document.getElementById("fetch")
fetch.addEventListener('click', () => {
  x = prompt("Enter the id")

  const docSel = doc(db, "Books", x);
  onSnapshot(docSel, (snap) => {
    console.log({...snap.data(), id: snap.id})
  })
})

const updateBookForm = document.querySelector('.update')
updateBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = updateBookForm.title.value
  const author = updateBookForm.author.value
  console.log('hello',title,author)
  const docUpd = doc(db, 'Books', updateBookForm.id.value)
  if (!(title) && !(author)) {
    alert('Must fill atleast one value');
    // console.log(title,author)
  } else if ((title != null) && (author != null)) {

    updateDoc(docUpd, {
      title : title,
      author : author
    })
  

  
  } else {
    title ? (
      updateDoc(docUpd, {
        title : title
      })
    ) : (
      null
    )
  
    author ? (
      updateDoc(docUpd, {
        author : author
      })
    ) : (
      null
    )

  }

})

// const docSel = doc(db, "Books", x);
// // getDoc(docSel)
// //   .then((doc) => {
// //     console.log({...doc.data(), id: doc.id})
// //   })

// onSnapshot(docSel, (snap) => {
//   console.log({...snap.data(), id: snap.id})
// })

const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const pass = signupForm.password.value
  createUserWithEmailAndPassword(auth, email, pass)
    .then((cred) => {
      console.log('user created', cred.user)
    })
    .catch((err) => {
      console.log(err.message)
    })
})



const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const pass = loginForm.password.value

  signInWithEmailAndPassword(auth, email, pass)
    .then((cred) => {
      console.log('user logged in : ', cred.user)
    })
    .catch((err) => {
      console.log(err.message)
    })
})


const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', (e) => {
  e.preventDefault()
  signOut(auth)
    .then(() => {
      console.log('User logged out')
    })
    .catch((err) => {
      console.log(err.message)
    })

})


// subscribing to auth changes
const subAuth = onAuthStateChanged(auth, (user) => {
  // alert('hello')
  console.log('user status changed: ', user)
})

//unsubscribing rom changes (auth & db)
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
  console.log('unsubscribe')
  subAuth()
  subDb()
})