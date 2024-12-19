import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import homeCover from "../Assets/notesBlack.png";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  //   let [signUpMsg, setSignUpMsg] = useState(null);
  //   let [signUpError, setSignUpError] = useState(null);
  //  let nav = useNavigate();

  // let validationSchema = yup.object({
  //   name:yup.string().min(3,'minimum 3 chars').max(20,'maximum 20 chars').required('name is required'),
  //   email:yup.string().email('Please Enter Valid Email').required('email is required'),
  //   password:yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,'at least uppercase, lowercase one digit, special char allowed').required('password is allowed'),
  //   age:yup.number().min(16,'under age').max(50).required('age is required'),
  //   phone:yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone").required('phone is required')
  // })

  // function clearMsg(){
  //   setSignUpMsg(' ');
  //   setSignUpError(' ');
  // }

  // let formik =  useFormik({
  //   initialValues:{
  //     name:'',
  //     email:'',
  //     password:'',
  //     age:'',
  //     phone:''
  //   },
  //   validationSchema,
  //   onSubmit:signUp

  // })

  // function signUp(values){
  //   axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`,values)
  //   .then( (res)=> {
  //    console.log(res);
  //    setSignUpMsg(res.data.msg);
  //    nav('/login');

  //   } )
  //   .catch((err)=>{
  //    console.log(err);
  //    setSignUpError(err.response.data.msg)

  //   })

  //  }

  async function registerNow(values) {
    try {
        let { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
        console.log(data);
       
    } catch (error) {
        console.log(error);
    }
}

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit: registerNow,
    validate: function (values) {
      const errors = {};
      if (values.name.length < 4) {
        errors.name = "Name must be more than 4 characters.";
      }
      if (!values.email.includes("@") && !values.email.includes(".")) {
        errors.email = "Enter a valid email.";
      }
      if (values.password.length > 6 && values.password.length < 12) {
        errors.password = "Password must be at least 6 characters.";
      }
      if (!values.age.match(/^[1-9][0-9]$/)) {
        errors.age = "Age must be above 10 years old.";
      }
      if (!values.phone.match(/^01[0125][0-9]{8}$/)) {
        errors.phone = "Enter a valid mobile number.";
      }
      return errors;
    },
  });

  return (
    <>
      <section className="bg-reg">
        <li className="fixed-top d-flex w-100 me-auto ps-5">
          <div>
            <img src={homeCover} width={"50%"} alt="" />
          </div>
        </li>
        <div className="container">
          <div className="row">
            <div className="ms-5 col-md-7">
              <div className="min-vh-100 d-flex justify-content-center align-items-center">
                <div
                  className="bg-secondary p-3 shadow shadow-lg rounded-2 bg-info-subtle"
                  style={{ width: "65%" }}
                >
                  <h2 className="text-center fw-bold rounded-2 my-4">
                    Sign Up Now!
                  </h2>
                  <form action="" onSubmit={registerFormik.handleSubmit}>
                    <div className="form-floating mb-1">
                      <input
                        onBlur={registerFormik.handleBlur}
                        onChange={registerFormik.handleChange}
                        value={registerFormik.values.name}
                        type="text"
                        className="form-control "
                        name="name"
                        id="name"
                        placeholder="Name"
                      />
                      <label htmlFor="name" className="">
                        Name
                      </label>
                      {registerFormik.errors.name &&
                      registerFormik.touched.name ? (
                        <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger">
                          {registerFormik.errors.name}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-floating mb-1">
                      <input
                        onBlur={registerFormik.handleBlur}
                        onChange={registerFormik.handleChange}
                        value={registerFormik.values.email}
                        type="email"
                        className="form-control "
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                      <label htmlFor="email" className="">
                        Email
                      </label>
                      {registerFormik.errors.email &&
                      registerFormik.touched.email ? (
                        <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger">
                          {registerFormik.errors.email}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-floating mb-1">
                      <input
                         onBlur={registerFormik.handleBlur}
                         onChange={registerFormik.handleChange}
                         value={registerFormik.values.password}
                        type="password"
                        className="form-control "
                        name="password"
                        id="password"
                        placeholder="Password"
                      />
                      <label htmlFor="password" className="">
                        Password
                      </label>
                      {registerFormik.errors.password &&
                      registerFormik.touched.password ? (
                        <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger">
                          {registerFormik.errors.password}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="form-floating mb-1">
                      <input
                        onBlur={registerFormik.handleBlur}
                        onChange={registerFormik.handleChange}
                        value={registerFormik.values.age}
                        type="num"
                        className="form-control "
                        name="age"
                        id="age"
                        placeholder="Age"
                      />
                      <label htmlFor="age" className="">
                        Age
                      </label>
                      {registerFormik.errors.age &&
                      registerFormik.touched.age ? (
                        <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger">
                          {registerFormik.errors.age}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-floating mb-1">
                      <input
                        onBlur={registerFormik.handleBlur}
                        onChange={registerFormik.handleChange}
                        value={registerFormik.values.phone}
                        type="tel"
                        className="form-control "
                        name="phone"
                        id="phone"
                        placeholder="Phone"
                      />
                      <label htmlFor="phone" className="">
                        Phone
                      </label>
                      {registerFormik.errors.phone &&
                      registerFormik.touched.phone ? (
                        <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger">
                          {registerFormik.errors.phone}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={
                        registerFormik.isValid === false ||
                        registerFormik.dirty === false
                      }
                      className="fw-semibold text-black btn btn-info w-50 float-end mt-2 "
                    >
                      Register
                    </button>
                  </form>
                  <div className="ms-2">
                    <p className="pt-2">
                      Have already an account?{" "}
                      <Link
                        className="ms-1 text-decoration-underline fw-bold text-info rounded-2"
                        to="/login"
                      >
                        Login
                      </Link>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>
        <p className="ps-2 fs-4 fw-bold">Notes</p>
      </li>
      <div className="container">
        <div className="row">
          <div className="col-md-5  d-none d-lg-flex justify-content-center align-items-center">
            <img className="w-100 p-5" src={notesImg} alt="" />
          </div>

          <div className="col-md-7 ">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
              <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2">
                <h1 className="fw-bold">Sign Up Now</h1>
                <div className="pt-3">

                  <form onSubmit={formik.handleSubmit} >
                  {signUpMsg ? <div className=''>{signUpMsg}</div> :'' }
              
                  {signUpError ?<div className="text-danger">{signUpError}</div>  : ''  }       
                    <input
                    onFocus={clearMsg}
                   onChange={formik.handleChange}
                    onBlur = {formik.handleBlur}
                      className="form-control my-2"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your Name"
                    />

                    {  formik.errors.name &&  formik.touched.name ? 
                    <div className='alert alert-danger'>{formik.errors.name}</div> : '' }
                    <input
                     onFocus={clearMsg}
                     onChange={formik.handleChange}
                     onBlur = {formik.handleBlur}
                      className="form-control my-2"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                    />
                       { formik.errors.email && formik.touched.email   ? 
                    <div className='alert alert-danger'>{formik.errors.email}</div> : '' }


                    <input
                    onFocus={clearMsg}
                    onChange={formik.handleChange}
                    onBlur = {formik.handleBlur}
                      className="form-control my-2"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                    />
                       { formik.errors.password &&  formik.touched.password  ? 
                    <div className='alert alert-danger'>{formik.errors.password}</div> : '' }

                    <input
                     onFocus={clearMsg}
                    onChange={formik.handleChange}
                    onBlur = {formik.handleBlur}
                      className="form-control my-2"
                      type="number"
                      name="age"
                      id="age"
                      placeholder="Enter Your Age"
                    />
                       { formik.errors.age &&  formik.touched.age  ? 
                    <div className='alert alert-danger'>{formik.errors.age}</div> : '' }

                    <input
                     onFocus={clearMsg}
                    onChange={formik.handleChange}
                    onBlur = {formik.handleBlur}
                      className="form-control my-2"
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter Your Phone Number"
                    />
                         { formik.errors.phone && formik.touched.phone ? 
                    <div className='alert alert-danger'>{formik.errors.phone}</div> : '' }

                    <button
                    disabled={!(formik.isValid && formik.dirty)}
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2"
                    >
                      Sign Up
                    </button>

                    
            
                  </form>
                  <p>Already Have Account ? Login</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 */}
    </>
  );
}
