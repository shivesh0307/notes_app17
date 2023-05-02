import React from "react"

export default function Sidebar(props) {
    console.log(props.notes);
   
    const noteElements = props.notes.map((note, index) =>  {
       // console.log(JSON.stringify(note.body));
        let i=note.body.indexOf("\n");
        //console.log("i  " + i);
    let firstIndex=(i!=-1)?(i): note.body.length;
    let firstLine= note.body.slice(0,firstIndex);
    //let firstLine=note.body.split("\n");
     return <div key={note.id}>
            <div
                
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{firstLine}</h4>
                <button 
                    className="delete-btn"
                    // Your onClick event handler here
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
})

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
