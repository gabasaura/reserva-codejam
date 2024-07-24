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
    <div className="d-flex flex-column min-vh-100 align-items-center">
            <div className="flex-grow-1 w-75 mx-auto py-5 ">
      <h1>Reservar una Sala</h1>

      <div>
      <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Video Juegos</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Mesas Ludoteca</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Sillones de Descando</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Cabinas Telefónicas</td>
                </tr>
            </tbody>
        </table>
      </div>
      <div className="mt-5 card p-0 border border-2 border-black p-5">
      <form onSubmit={handleSubmit}>
        <div className='p-1'>
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
        <div className='p-1'> 
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
        <div className='p-1'>
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
          <button className="btn btn-outline-info" type="submit">Reservar</button>
        </div>
      </form>
      </div>
      {message && <p>{message}</p>}
    </div>
    </div>

  )
}

export default MakeReservation
