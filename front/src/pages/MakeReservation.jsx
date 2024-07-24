import React from 'react'
import { useContext } from 'react';
import { Context } from "../store/AppContext";
const MakeReservation = () => {


  const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getReservations()
}, [])

  return (
    <div>
      
    </div>
  )
}

export default MakeReservation
