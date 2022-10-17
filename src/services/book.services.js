import {db} from '../firebase-config';

import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const bookCollectionRef = collection(db, 'books');

class BookDataService {
    addBook=(newBook) => {
       return addDoc(bookCollectionRef, newBook); 
    }

    updateBook =(id, updatedBook) => {
        const bookDoc = doc(db, "books", id);
        return updateDoc(bookDoc, updatedBook)
    };

    deleteBook = (id) => {
        const bookDoc = doc(db, "books", id);
        return deleteDoc(bookDoc)
    };

    getAllBooks = () => {
        return getDocs(bookCollectionRef)
    }

    getBook =(id) => {
        const bookDoc = doc(db, "books", id);
        return getDoc(bookDoc);
    }
}
export default new BookDataService()