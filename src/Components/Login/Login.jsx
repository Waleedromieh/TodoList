import axios from 'axios'
import { Alert } from 'flowbite-react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Login() {
  let navigate=useNavigate();
  const [Apierror, setApierror] = useState('')
  const [Loading, setLoading] = useState(false)

     async function handleLogin(values){
      setLoading(true)
         await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',values)
          .then((res)=>{
            if(res.data.msg =='done'){
              localStorage.setItem('userToken',res.data.token)
            }
         setLoading(false)
         navigate('/Home')
         
          })
             .catch((err)=>{
              setApierror(err.response.data.msg);
              setLoading(false)
             }) 
          
      }
  
      let validationSchema=Yup.object().shape({
          email:Yup.string().email('invalid email').required('email is required'),
          password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,'password should be between 6 to 10').required('password is required'),
      })
  
  
  
  let formik=useFormik({
      initialValues:{
          email:'',
          password:'',
      },
      validationSchema,
      onSubmit:handleLogin
  
  })




  return (<>
  <div className='h-screen w-screen bg-gradient-to-r from-green-600 to-green-900 p-2'>
    <div className='flex flex-wrap  m-auto hello mt-24  ' >

    <div className='lg:w-1/2 lg:py-44 md:w-1/2 sm:w-full sm:p-14  p-24  rounded-3xl  bg-emerald-500 text-center text-white flex flex-col justify-center items-center'>
        <h2 className='text-4xl font-bold'>welcome back!
        </h2>
        <p>if you are not joined to us please go to Register first

</p>
<button className='rounded-3xl outline py-4 px-9 bg-inherit hover:bg-white hover:text-emerald-400  ease-in duration-300 mt-5'  > <Link to="Register">Register</Link> </button>
    </div>



    <div className='lg:w-1/2 lg:py-44  md:w-1/2 sm:w-full sm:p-14 py-11 px-2 rounded-3xl h-full   bg-white  text-center flex flex-col justify-center items-center '>
<h2 className='text-4xl text-emerald-500 font-bold'> Login Now</h2>


<div className='flex justify-center items-center my-4'>
<div className='icon w-0.5 h-0.5 p-4 rounded-full border border-emerald-500  relative mx-3 '>
    <i className='fab fa-facebook-f absolute top-2 left-2'></i>
</div>
<div className='icon w-0.5 h-0.5 p-4 rounded-full border border-emerald-500  relative mx-3 '>
    <i className='fab fa-instagram absolute top-2 left-2'></i>
</div>
<div className='icon w-0.5 h-0.5 p-4 rounded-full border border-emerald-500  relative mx-3 '>
    <i className='fab fa-google absolute top-2 left-2'></i>
</div>
</div>
<form className="flex max-w-md flex-col gap-4" onSubmit={formik.handleSubmit}>
      <div>
        <div className="mb-2 block">
          <label htmlFor="email" value="Your email" />
        </div>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" type="email" placeholder="Email" className='rounded-2xl w-80'  />
        {formik.errors.email && formik.touched.email ? (<Alert color="warning">
      <span className="font-medium">{formik.errors.email}</span>
    </Alert>):null} 
      </div>
      <div >
        <div className="mb-2 block">
          <label htmlFor="password" value="Your password" />
        </div>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}  id="password" type="password" placeholder="password" className='rounded-2xl w-full'  />
        {formik.errors.password && formik.touched.password ? (<Alert color="warning">
      <span className="font-medium">{formik.errors.password}</span>
    </Alert>):null}
      </div>
    <button className='w-full bg-white text-emerald-500 hover:text-white hover:bg-emerald-500    outline rounded-3xl duration-300 hover:outline-white py-1'>{Loading?<i className="fa-solid fa-spinner fa-spin"></i> : 'Login' }</button>
    </form>
    </div>
    </div>
  </div>
  </>)}