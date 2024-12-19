import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Fade, Slide } from 'react-awesome-reveal';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Note({ noteDetails, deleteNote, noteValidation , getData}) {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function updateNote(values) {
        console.log(values);
        console.log("3b8ny__" + localStorage.getItem("userToken"));
        console.log(noteDetails._id);
        
        
       axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteDetails._id}`, values,{
        headers:{
          token: `3b8ny__${localStorage.getItem('userToken')}`
        }
       } ).then((res)=>{
            console.log(res);
            getData();
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
        .finally(()=>{
            handleClose()
        })
    }



    const updFormik = useFormik({
        initialValues: {
            title: noteDetails.title,
            content: noteDetails.content
        },
        onSubmit: updateNote
    })



    return (
        <>
         
           <div className="col-md-6">
              <Slide>
              <div className='bg-black p-3 text-white bg-opacity-50 rounded-3'>
                    <div className='d-flex justify-content-between align-items-center border-bottom border-1 border-dark pb-2'>
                        <h5 className='fw-bold text-black text-capitalize titlee'>{noteDetails.title}</h5>
                        <div className='d-flex '>
                            <i style={{ cursor: "pointer" }} onClick={() => deleteNote(noteDetails._id)} className='fa fa-trash-can fs-5 me-3'></i>
                            <i style={{ cursor: "pointer" }} onClick={handleShow} className='fa-solid fa-pen-to-square fs-5'></i>
                        </div>
                    </div>
                    <p className='mt-3 contentt'>{noteDetails.content}</p>
                </div>
              </Slide>
            </div>
           

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='ms-auto fw-bold'>Update Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        {noteValidation ? <div className='alert alert-danger mb-2'>{noteValidation}</div> : ""}
                        <input onChange={updFormik.handleChange} defaultValue={noteDetails.title} type="text" className="form-control mb-2 fw-semibold" id="title" name="title" placeholder='Note Title' />
                        <textarea onChange={updFormik.handleChange} defaultValue={noteDetails.content} className="form-control fw-semibold" name="content" id="content" rows="5" col="20" placeholder='Note Content'></textarea>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updFormik.handleSubmit} >
                        Update Note
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
