import React from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { noteState } from '../NoteAtom/NoteAtom';

export default function LayOut() {

 let [noteLength, setNoteLength] =  useRecoilState(noteState);
  return<>
  
   
      <div className='bg-info text-center p-2 '>Notes App : {noteLength} </div>
 
    
        <Outlet/>
     


  </>
}
