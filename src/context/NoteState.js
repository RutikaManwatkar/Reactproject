import React, { useState } from "react";
import NoteContext from "./noteContext1";

const NoteState = (props) => {
  const host = "http://localhost:3002";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // const notesInitial=[
  //   {
  //     "_id":"65eec8c0a1e5366cbeff69c3",
  //     "user":"65e82a8a2f8d6e8e1103b13f",
  //     "title":"C++ by psk technologies",
  //     "description":"C++ is an object oriented programming language",
  //     "tag":"published by balvesh",
  //     "date":"24-03-2000",
  //     "__v":"0"
  //   },
  //   {
  //     "_id":"65eec8bfa1e5366cbeff69c1",
  //     "user":"65e82a8a2f8d6e8e1103b13f",
  //     "title":"C++ by psk technologies",
  //     "description":"C++ is an object oriented programming language",
  //     "tag":"published by balvesh",
  //     "date":"24-03-2000",
  //     "__v":"0"
  //   }
  // ]

  // fetch all notes from database
  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      //      body: JSON.stringify(data)
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);

    // return response.json();

    // const note={
    //     "_id":"65eec8bfa1e5366cbeff69c1",
    //     "user":"65e82a8a2f8d6e8e1103b13f",
    //     "title":title,
    //     "description":description,
    //     "tag":tag,
    //     "date":"24-03-2000",
    //     "__v":"0"
    // }
    // setNotes(notes.concat(note))
  };

  //add notes
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json({ title, description, tag });
    console.log(json);
    console.log("adding  new note");
    alert("Data added!");
    const note =  {
      _id: "65f5628f3a7088f1f474e975",
      user: "65f55a1dcf0bed7318beb63a",
      title: title,
      description: description,
      tag: tag,
      __v: "0",
    };
    setNotes(notes.concat(note));
  };

  //delete notes
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      //  body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json);
    console.log("deleting notes" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  // edit with api database
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    var newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      setNotes(newNotes);
    }
    // console.log("adding  new note");
    // alert("Data added!")
    // const note={
    //     "_id":"65eec8bfa1e5366cbeff69c1",
    //     "user":"65e82a8a2f8d6e8e1103b13f",
    //     "title":title,
    //     "description":description,
    //     "tag":tag,
    //     "date":"24-03-2000",
    //     "__v":"0"
    // }
  };

  return (
    <div>
      <NoteContext.Provider
        value={{ notes, addNote, deleteNote, getNote, editNote }}
      >
        {props.children}
      </NoteContext.Provider>
    </div>
  );
};

export default NoteState;
