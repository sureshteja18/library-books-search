import {db} from '../FirebaseConfig'

import { collection,getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'


const bookCollectionRef =collection(db, 'books')
class bookDataService{
   
    addBooks=(newBook)=>{
        return addDoc(bookCollectionRef,newBook)
    }
    updateBooks=(id,updatedBook)=>{
        const bookDoc = doc(db, 'books',id )
        return updateDoc(bookDoc, updatedBook)
    }

    deleteBook=(id)=>{
        const bookDoc =doc(db, 'books', id);
        return deleteDoc(bookDoc);
    }
    getAllBooks=()=>{
      return getDocs(bookCollectionRef);  
    }
    getBook=(id)=>{
        const bookDoc=doc(db,'books',id)
        return getDoc(bookDoc)
    }
}
 export default new bookDataService();