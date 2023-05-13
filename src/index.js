import { initializeApp } from 'firebase/app'
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where
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

  

  
// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })
})



// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'Books', deleteBookForm.id.value)
  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })

})

//Queries
const q = query(colRef, where('author', '==', 'Harry'))

// Real time database
onSnapshot(q,(snap) => {
  let books = [];
  snap.docs.forEach((doc) => {
    books.push({...doc.data(), id: doc.id })
    
  })
  console.log(books)
})
