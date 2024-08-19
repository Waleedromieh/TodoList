import axios from 'axios'
import { Alert } from 'flowbite-react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {
let navigate=useNavigate();
const [Apierror, setApierror] = useState('')
const [Loading, setLoading] = useState(false)

   async function handleRegister(values){
    setLoading(true)
       await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',values)
        .then((res)=>{
        if(res.data.msg =='done'){
            navigate('/')
        }    
        })
           .catch((err)=>{
            setApierror(err.response.data.msg);
            setLoading(false)
           }) 
        
    }

    let validationSchema=Yup.object().shape({
        name:Yup.string().min(3,'min lenght is 3').max(10,'max lenght is 10 ').required('name is required'),
        email:Yup.string().email('invalid email').required('email is required'),
        phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'invaid phone number').required('phone is required'),
        password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,'password should be between 6 to 10').required('password is required'),
    })



let formik=useFormik({
    initialValues:{
        name:'',
        email:'',
        password:'',
        age:'',
        phone:'',
    },
    validationSchema,
    onSubmit:handleRegister

})







  return (<>
    <div className=' w-screen bg-gradient-to-r h-full from-green-600 to-green-900 p-1'>
      <div className='flex flex-wrap  m-auto hello mt-24  ' >
  
      <div className='lg:w-1/2 lg:py-44 md:w-1/2 sm:w-full sm:py-14 p-24 rounded-3xl  bg-emerald-500 text-center text-white flex flex-col justify-center items-center'>
          <h2 className='text-4xl font-bold'>welcome back!
          </h2>
          <p>to keep conected with us please login with your personal information
  
  </p>
  <button className='rounded-3xl outline py-4 px-9 bg-inherit hover:bg-white hover:text-emerald-400  ease-in duration-300 mt-5'  > <Link to="/">Login</Link> </button>
      </div>
  
  
  
      <div className='lg:w-1/2   md:w-1/2 py-11 px-3  rounded-3xl   bg-white  text-center flex flex-col justify-center items-center '>
  <h2 className='text-4xl text-emerald-500 font-bold'> create account</h2>
  
    {/* =================================================================== */}

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

  {/* =================================================================== */}

{Apierror ?<h2 className='bg-red-600 p-2 rounded-2xl '>{Apierror}</h2>:null }


  <form className="flex max-w-md flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div>
          <div className="mb-2 block">
            <label htmlFor="name" value="Your email" />
          </div>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id="name" type="text" placeholder="name" name='name' className='rounded-2xl w-80'  />
          {formik.errors.name && formik.touched.name ? (<Alert color="warning">
      <span className="font-medium">{formik.errors.name}</span>
    </Alert>):null} 
          
        </div>
        
        <div>
          <div className="mb-2 block">
            <label htmlFor="email" value="Your email" />
          </div>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" type="email" placeholder="Email" name='email' className='rounded-2xl w-80'  />
          {formik.errors.email && formik.touched.email ? (<Alert color="warning">
      <span className="font-medium">{formik.errors.email}</span>
    </Alert>):null} 
        </div>
        
        <div>
          <div className="mb-2 block">
            <label htmlFor="password" value="Your password" />
          </div>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id="password" type="password" placeholder="password" name='password' className='rounded-2xl w-80'  />
            {formik.errors.password && formik.touched.password ? (<Alert color="warning">
        <span className="font-medium">{formik.errors.password}</span>
        </Alert>):null} 
        </div>

        <div>
          <div className="mb-2 block">
            <label htmlFor="age" value="Your age" />
          </div>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.age} id="age" type="number" placeholder="Age" name='age' className='rounded-2xl w-80'  />
          {formik.errors.age && formik.touched.age ? (<Alert color="warning">
      <span className="font-medium">{formik.errors.age}</span>
    </Alert>):null} 
        </div>

        <div>
          <div className="mb-2 block">
            <label htmlFor="phone" value="Your phone" />
          </div>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id="phone" type="tel" placeholder="phone num" name='phone' className='rounded-2xl w-80'  />
          {formik.errors.phone && formik.touched.phone ? (<Alert color="warning">
      <span className="font-medium">{formik.errors.phone}</span>
    </Alert>):null} 
        </div>

      <button type='submit' className='w-full bg-white text-emerald-500 hover:text-white hover:bg-emerald-500    outline rounded-3xl duration-300 hover:outline-white py-1'>{Loading?<i className="fa-solid fa-spinner fa-spin"></i> : 'Register' }</button>  
      </form>
      </div>
      </div>
    </div>
    
    
    </>
 
  )
}
