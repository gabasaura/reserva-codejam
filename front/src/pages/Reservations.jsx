import React from 'react'
import { useContext, useEffect } from 'react';
import { Context } from "../store/AppContext";


const Reservations = () => {

    const { store, actions } = useContext(Context);

    useEffect(() => {
		actions.getReservations()
}, [])


  return (
    <div>
      
    </div>
  )
}

export default Reservations
