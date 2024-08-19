import './App.css'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './Components/Register/Register'
import { RecoilRoot } from 'recoil'

function App() {
  let x= createBrowserRouter([
    {path:'',element:<Login/>},
    {path:'Register',element:<Register/>},
    {path:'Home',element:<Home/>},
  ])

  return (
    <>

<RecoilRoot>
<RouterProvider router={x}></RouterProvider>
</RecoilRoot>
     



    </>
  )
}

export default App
