import React, { useState } from 'react';
import noteContext from "./noteContext";

const NoteState = (props)=>{
    const initialnotes =[
        {
          "_id": "61d8a80ac49a9f6f0b31e403",
          "user": "61d8983bc3ae567dc0bedd75",
          "title": "demo title",
          "description": "demo description",
          "tag": "demo-tag",
          "date": "2022-01-07T20:52:16.416Z",
          "__v": 0
        },
        {
          "_id": "61d8a80ac49a9f6f0b31e405",
          "user": "61d8983bc3ae567dc0bedd75",
          "title": "demo title",
          "description": "demo description",
          "tag": "demo-tag",
          "date": "2022-01-07T20:52:16.416Z",
          "__v": 0
        }
      ]
    const [notes, setNotes] = useState(initialnotes);
    return (
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;