import React from 'react'

const ReservationCard = ({start, end, space, cancel}) => {
  return (
    <div>
      <div className="card mb-3" style="max-width: 540px;">
        <div className="row g-0">
          <div className="col-md-4">
           
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{space}</h5>
              <p className="card-text">{start}</p>
              <p className="card-text"><small className="text-body-secondary">{end}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationCard
