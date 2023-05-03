import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data.js"
import Split from "react-split"
import {nanoid} from "nanoid"
import { onSnapshot, addDoc,doc,deleteDoc ,setDoc} from "firebase/firestore"
import { notesCollection , db} from "./firebase"
/**
 * Challenge: Spend 10-20+ minutes reading through the code
 * and trying to understand how it's currently working. Spend
 * as much time as you need to feel confident that you 
 * understand the existing code (although you don't need
 * to fully understand everything to move on)
 */

export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")

    const [tempNoteText, setTempNoteText] = React.useState("")
   // console.log(currentNoteId)
    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0];
      //  console.log("re-rendered");
   // console.log(currentNoteId)
   const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)
    React.useEffect(() => {
            const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
                // Sync up our local notes array with the snapshot data
               // console.log("THINGS ARE CHANGING!")
                const notesArr = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }))
                
                setNotes(notesArr);
                //console.log(sortedNotes);   
                //setNotes(notesArr)
            })
            return unsubscribe
        }, [])    //Will run first time to fetchthe data from database and initialize the notes array
        React.useEffect(() => {
            if (!currentNoteId) {
                setCurrentNoteId(notes[0]?.id)
            }
        }, [notes])

        React.useEffect(() => {
            if (currentNote) {
                setTempNoteText(currentNote.body)
            }
        }, [currentNote])

        React.useEffect(() => {
            const timeoutId = setTimeout(() => {
                if (tempNoteText !== currentNote.body) {
                    updateNote(tempNoteText)
                }
            }, 500)
            return () => clearTimeout(timeoutId)
        }, [tempNoteText])
    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote) // the onsnapshot will automatically update the state of note
        setCurrentNoteId(newNoteRef.id)
    }
    
    async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(docRef, { body: text , updatedAt: Date.now()}, { merge: true })
         
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
        //console.log("findCurrentNote called")
    }

    async function deleteNote(event,noteId) {
        event.stopPropagation();
        const docRef = doc(db, "notes", noteId)
        await deleteDoc(docRef)
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={sortedNotes}
                   // sortedNotes={sortedNotes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                
                    <Editor 
                      tempNoteText={tempNoteText}
                      setTempNoteText={setTempNoteText}
                    />
                
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
