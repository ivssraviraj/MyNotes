import { React, useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/noteContext";
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getAllNotes, editNote} = context;
    useEffect(() => {
        getAllNotes();
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote);
    }
    const ref = useRef(null);

    const [note, setNote] = useState({id:"",title:"",description:"",tag:"default"})
    const handleOnClick = (e)=>{
        e.preventDefault();
        editNote(note._id,note.title,note.description,note.tag);
        ref.current.click();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value});
    }

    return (
        <>
            <AddNote />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form className="my-2">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" 
                                            onChange={onChange} value={note.title}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" 
                                            onChange={onChange} value={note.description}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" 
                                            onChange={onChange} value={note.tag}/>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length<5 || note.description.length<5} type="button" 
                            class="btn btn-primary" onClick={handleOnClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-2">
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem note={note} key={note._id} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes
