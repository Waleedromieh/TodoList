import React, { useEffect } from 'react'
import { Alert, Carousel } from "flowbite-react";
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useFormik } from 'formik';
import axios from 'axios';
import Note from '../Note/Note';
import { useRecoilState } from 'recoil';
import { NoteAtom } from '../../Atoms/NoteAtom';


export default function Home() {
  const [notes, setnotes] = useState([])
  const [openModal, setOpenModal] = useState(false);
 let [notesLength,setnotesLength] = useRecoilState(NoteAtom)
 const [NoteError, setNoteError] = useState()

async function getNote(){
  setNoteError(null)
  await axios.get('https://note-sigma-black.vercel.app/api/v1/notes',{
    headers:{ 
      token: `3b8ny__${localStorage.getItem('userToken')}`,
    }
  })
  .then((res)=>{
    setnotes(res?.data?.notes)
    setnotesLength(res?.data?.notes.length)

  }).catch((err)=>{
setNoteError(err?.response?.data?.msg);
setnotesLength(0)



  });
}


  async function addNote(values){
  await axios.post('https://note-sigma-black.vercel.app/api/v1/notes',values,{
    headers:{ 
      token: `3b8ny__${localStorage.getItem('userToken')}`,
    }
  })
  .then((res)=>{
    if(res.data.msg =='done'){
      setOpenModal(false)
      values.title=''
      values.content=''
      getNote()
    }
  })
  .catch((err)=>{
    
  })
   
        
    }

async function deleteNote(noteId){
 
  await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,{
    headers:{ 
      token: `3b8ny__${localStorage.getItem('userToken')}`,
    }
  })
  .then((res)=>{
    getNote()
    
  }).catch((err)=>{
  })
}

    let validationSchema=Yup.object().shape({
      title:Yup.string().required('title is Required'),
      content:Yup.string().required('password is required'),
  })

    let formik=useFormik({
      initialValues:{
          title:'',
          content:'',
      },
      validationSchema,
      onSubmit:addNote
  
  })


  function logout(){
    localStorage.removeItem('userToken')
  }

useEffect(()=>{
  getNote()
},[])


  return (<>
<div className='h-screen w-screen  bg-emerald-500 pt-1 flex flex-col  '>

  <div className=" w-full flex flex-wrap justify-between ">
<button className='rounded-2xl outline bg-blue-600 hover:bg-white text-white hover:text-blue-500 p-3 m-2 duration-300'onClick={() => setOpenModal(true)}>Add note <i className='fas fa-folder-plus'></i></button>

<button className='outline bg-white text-red-700  rounded-2xl hover:bg-red-800 hover:text-white duration-300  p-3 m-2  '  onClick={logout}><Link to={'/'}>LogOut</Link> </button>

  </div>


  {NoteError?<p className='text-2xl text-red-700 font-bold'>{NoteError}</p>:<> <h2 className='text-4xl font-bold text-white'>Notes</h2>
    <div className='flex flex-wrap'>
      
{notes?.map((note)=>{return(<Note key={note._id} note_id={note._id} note={note} deleteFn={deleteNote} getFn={getNote} />) }
)}



    </div></>}
    <h5 className='text-white font-bold text-xl'>Notes Counter <span>{notesLength}</span></h5>

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

</div>



  </>)
}
