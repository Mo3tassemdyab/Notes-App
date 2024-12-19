import React from 'react'
import { Navigate } from 'react-router-dom';

export default function Protectedoutes({children}) {

    const token= localStorage.getItem('userToken');

    if (token == null) {
        return <>
        
        <Navigate  to={'/login'} />

  
        
        
        </>
    }
  return <>
  
  {children}
  
  </>
}
