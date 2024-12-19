import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Protectedoutes from './Components/ProtectedRoutes/Protectedoutes';
import { RecoilRoot } from 'recoil';

export default function App() {

  let routes =  createBrowserRouter([
       {path:'' ,element:<LayOut/>, children:[
        {index:true, element:<Register/>},
        {path:'register', element:<Register/>},
        {path:'login', element:<Login/>},
        {path:'home', element:<Protectedoutes> <Home/> </Protectedoutes>},
       ]} 
    ])



  return <>
  
<RecoilRoot>
<RouterProvider router={routes}>

</RouterProvider>
</RecoilRoot>
  
  </>
}
