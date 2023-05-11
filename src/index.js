import { initializeApp } from 'firebase/app'
import {
  collection,
  getFirestore,
  getDocs,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBymh5Kh6a-t8GObVVwyuJ6h7dBYKEqo5M",
    authDomain: "fir-startup-e554f.firebaseapp.com",
    projectId: "fir-startup-e554f",
    storageBucket: "fir-startup-e554f.appspot.com",
    messagingSenderId: "136552291737",
    appId: "1:136552291737:web:4f54efd44eaecb2080c708"
  };

  // init firebase app
  initializeApp(firebaseConfig)

  //init services
  const db = getFirestore()

  // collection ref
  const colRef = collection(db,'Books')

  // get collection data
  getDocs(colRef)
    .then((snapshot) => {
      let books = []
      snapshot.docs.forEach((doc)=>{
        books.push({ ...doc.data(), id: doc.id })
      })
      console.log(books)
    })
    .catch(err => {
      console.log(err.message)
    })

