import React, { useEffect } from 'react'
import { Alert, Carousel } from "flowbite-react";
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useFormik } from 'formik';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { NoteAtom } from '../../Atoms/NoteAtom';



export default function Note({note,deleteFn,note_id,getFn}) {
  const [openModal, setOpenModal] = useState(false);

async function updateNote(values){
  await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note_id}`,values,{
    headers:{
      token:`3b8ny__${localStorage.getItem('userToken')}`,
    }
  }).then((res)=>{
    getFn()
  })
  .catch((err)=>{
    
  })


    setOpenModal(false)
    
  }


  let validationSchema=Yup.object().shape({
    title:Yup.string().required('title is Required'),
    content:Yup.string().required('content is required'),
})

  let formik=useFormik({
    initialValues:{
        title:'',
        content:'',
    },
    validationSchema,
    onSubmit:updateNote

})

  
  return (<>


<Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>ADD NOTE</Modal.Header>
        <Modal.Body>
         <form onSubmit={formik.handleSubmit}>
          <div className='flex flex-col'>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title} type="text" name='title' id='title' className='rounded-2xl' placeholder='Note title'/>
          {formik.errors.title && formik.touched.title ? (<Alert color="warning">
      <span className="font-medium">{formik.errors.title}</span>
    </Alert>):null} 
          <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.content}  name="content" id="content" className='rounded-2xl mt-3' placeholder='Note content'></textarea>
          {formik.errors.content && formik.touched.content ? (<Alert color="warning">
      <span className="font-medium">{formik.errors.content}</span>
    </Alert>):null} 
          </div>
          
         </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={formik.handleSubmit}>ADD</Button>
          
        </Modal.Footer>
      </Modal>




  <div className=' p-2 lg:w-1/4 md:w-1/3 sm:w-1/2'>
  <div className=' bg-white rounded-2xl p-2' >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       {note.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
{note.content}      </p>
    <i className='fas fa-trash p-2 bg-red-800 rounded-full me-1 cursor-pointer' onClick={()=>{
      deleteFn(note._id)
    }}></i>
    
    <i className='fas fa-wrench p-2 bg-green-800 rounded-full cursor-pointer'onClick={() => setOpenModal(true)
    }></i>
    </div>
  </div>
  
  </>

  )
}
