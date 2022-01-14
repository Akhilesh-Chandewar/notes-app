import React , {useContext} from 'react'
import NotesForm from './forms/NotesForm'
// import noteContext from '../context/notes/noteContext';
import { createContext } from "react";


export const Home = () => {
    const noteContext = createContext();
    const context = useContext(noteContext);
    const {notes, setNotes} = context;
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <NotesForm />
            </div>
            <div className="container my-3">
                <h2>Your Notes</h2>
                {notes.map((note)=>{
                    return note.title;
                })}
            </div>
        </div>
    )
}
