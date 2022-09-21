import {React,useContext} from 'react'
import NoteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const {note, updateNote} = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const handleOnClickDelete = (noteId)=>{
        deleteNote(noteId);
    }

    return (
        <div className="col-md-3 my-2">
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{marginLeft:'-25px'}}>
                    {note.tag}</span>
                <i className="far fa-trash-alt mx-2" onClick={()=>{handleOnClickDelete(note._id)}}></i>
                <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
