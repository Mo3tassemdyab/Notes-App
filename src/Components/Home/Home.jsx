import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import axios from "axios";
import Note from "../Note/Note";
import Swal from "sweetalert2";
import SideBar from "./../SideBar/SideBar";
import { Slide } from "react-awesome-reveal";
import { useRecoilState } from "recoil";
import { noteState } from "../NoteAtom/NoteAtom";
import * as yup from "yup";

export default function Home() {
  const [show, setShow] = useState(false);
  const [userNotes, setUserNotes] = useState([]);
  const [noteValidation, setNoteValidation] = useState(null);
  let [noteLength, setNoteLength] = useRecoilState(noteState);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function addNote(values) {
    try {
      let { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        values,
        {
          headers: { token: "3b8ny__" + localStorage.getItem("userToken") },
        }
      );
      console.log(data);
      handleClose();
      getUserNotes();
    } catch (error) {
      setNoteValidation(error.response.data.msg);
    }
  }

  async function getUserNotes() {
    try {
      const { data } = await axios.get(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        {
          headers: { token: "3b8ny__" + localStorage.getItem("userToken") },
        }
      );
      setUserNotes(data.notes);
      console.log(data);
      setNoteLength(data.notes.length);
    } catch (error) {
      console.log(error);
    }
  }

  function deleteNote(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ms-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteNoteX(id);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  }

  async function deleteNoteX(id) {
    let { data } = await axios.delete(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      {
        headers: { token: "3b8ny__" + localStorage.getItem("userToken") },
      }
    );
    console.log(data);
    getUserNotes();
  }

  let validationSchema = yup.object({
    title: yup
      .string()
      .min(3, "minimum 3 chars")
      .max(20, "maximum 20 chars")
      .required("title is required"),
    content: yup
      .string()
      .min(3, "minimum 3 chars")
      .max(20, "maximum 20 chars")
      .required("content is required"),
  });
  const noteFormik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema,
    onSubmit: addNote,
  });

  useEffect(() => {
    getUserNotes();
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <SideBar />
            </div>
            <div className="col-md-10">
              <div className="mb-5">
                <button
                  type="button"
                  onClick={handleShow}
                  className="btn bg-white ms-auto d-block  mt-5 fw-bold fs-5"
                >
                  <i className="fa fa-circle-plus me-2"></i>
                  Add New Note
                </button>
              </div>

              <div className="row gy-4">
                {userNotes.map((notes) => {
                  return (
                    <Note
                      key={notes._id}
                      noteDetails={notes}
                      deleteNote={deleteNote}
                      noteValidation={noteValidation}
                      getData={getUserNotes}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto fw-bold">New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {noteValidation ? (
              <div className="alert alert-danger mb-2">{noteValidation}</div>
            ) : (
              ""
            )}
            <input
              onChange={noteFormik.handleChange}
              type="text"
              className="form-control mb-2 fw-semibold"
              id="title"
              name="title"
              placeholder="Note Title"
            />
            {noteFormik.errors.title && noteFormik.touched.title ? (
              <div className="alert alert-danger">
                {noteFormik.errors.title}
              </div>
            ) : (
              ""
            )}
            <textarea
              onChange={noteFormik.handleChange}
              className="form-control fw-semibold"
              name="content"
              id="content"
              rows="5"
              col="20"
              placeholder="Note Content"
            ></textarea>
                  {noteFormik.errors.content && noteFormik.touched.content ? (
              <div className="alert alert-danger">
                {noteFormik.errors.content}
              </div>
            ) : (
              ""
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={noteFormik.handleSubmit}>
            Add note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
