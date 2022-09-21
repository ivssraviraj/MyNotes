import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=> {
    const host = "http://localhost:5000"  
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);
    const [authToken, setAuthToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3YWFiYTgyNGUzZDRhNDIwYzM5MTViIn0sImlhdCI6MTYzODEwNTcxMn0.z08faHmilZvDy_-WTioSPwTAiIhWyZvhXourN_f4E1Q');

    const getAllNotes = async ()=>{
      //API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          'auth-token' : authToken
        } 
      });
      
      const json = await response.json();
      console.log(json);

      setNotes(json);
    }

    //Add note
    const addNote = async (title,description,tag)=>{
      //API call
      const response = await fetch(`${host}/api/notes/addnote`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'auth-token' : authToken
        },
        body : JSON.stringify({title,description,tag}) 
      });

      const note = await response.json(); 
      setNotes(notes.concat(note));
    }

    //delete note
    const deleteNote = async(id)=>{
      //Api call pending
      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method : 'DELETE',
        headers : {
          'Content-Type' : 'application/json',
          'auth-token' : authToken
        },
      });

      console.log("delete note with id : ",id);
      const newNotes = notes.filter((note)=>{return note._id !== id});
      setNotes(newNotes);
    }

    //edit note
    const editNote = async (id,title,description,tag) =>{
      console.log(id,title,description,tag);
      //API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json',
          'auth-token' : authToken
        },
        body : JSON.stringify({title,description,tag}) 
      });
      
      const json = await response.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = notes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getAllNotes,setAuthToken}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;