import React from 'react'
import { useContext, useState } from 'react';
import { Context } from "../store/AppContext";
const MakeReservation = () => {


  const { store, actions } = useContext(Context);

  const [spaceId, setSpaceId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    try {
      const response = await fetch('http://127.0.0.1:3000/reservations/do', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${store.access_token}`
        },
        body: JSON.stringify({
          space_id: spaceId,
          start_time: startTime,
          end_time: endTime
        })
      });

      const data = await response.json(); 

      if (response.ok) {
        setMessage('Reserva creada exitosamente');
      } else {
        setMessage(data.message || 'Error al crear la reserva');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al crear la reserva');
    }
  };

  return (
    <div>
      <h2>Reservar una Sala</h2>
     
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            ID del Espacio:
            <input
              type="number"
              value={spaceId}
              onChange={(e) => setSpaceId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Hora de Inicio (YYYY-MM-DD HH:MM:SS):
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Hora de Fin (YYYY-MM-DD HH:MM:SS):
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <button type="submit">Reservar</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default MakeReservation
