import React,{useContext,useState} from 'react'
import NoteContext from '../context/notes/noteContext';


const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"",description:"",tag:""})

    const handleOnClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value});
    } 

    return (
        <div>
            <h2 className="my-2 mx-2">Add Note</h2>
            <div className="container">
                <form className="my-2">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                           Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            aria-describedby="emailHelp"
                            onChange={onChange}
                            value={note.title}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            onChange={onChange}
                            value={note.description}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Tag
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            onChange={onChange}
                            value={note.tag}
                        />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleOnClick}>
                        Add Note
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
