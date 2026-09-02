import { useEffect, useState } from 'react';

function MyTickets() {

  const [tickets, setTickets] =
    useState([]);


  useEffect(() => {

    const savedTickets =
      JSON.parse(
        localStorage.getItem(
          'myTickets'
        )
      ) || [];

    setTickets(savedTickets);

  }, []);


  return (

    <div
      style={{
        minHeight: '100vh',
        padding: '40px 20px',
        background: '#f5f5f5'
      }}
    >

      <h1
        style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}
      >
        🎟️ My Bookings
      </h1>


      {tickets.length === 0 ? (

        <div
          style={{
            textAlign: 'center'
          }}
        >

          <h3>
            No bookings found.
          </h3>

          <p>
            You haven't booked any
            movie tickets yet.
          </p>

        </div>

      ) : (

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            alignItems: 'center'
          }}
        >

          {tickets.map((ticket) => (

            <div
              key={ticket.bookingId}

              style={{
                width: '100%',
                maxWidth: '550px',
                background: '#fff',
                borderRadius: '12px',
                padding: '25px',
                boxShadow:
                  '0 5px 20px rgba(0,0,0,0.1)',
                border:
                  '2px dashed #333'
              }}
            >

              {/* Ticket Header */}

              <div
                style={{
                  textAlign: 'center',
                  borderBottom:
                    '1px solid #ddd',
                  paddingBottom: '15px',
                  marginBottom: '15px'
                }}
              >

                <h2>
                  🎬 MovieBox
                </h2>

                <h3>
                  🎟️ Booking Confirmed
                </h3>

                <p>
                  <strong>
                    Booking ID:
                  </strong>{' '}
                  {ticket.bookingId}
                </p>

              </div>


              {/* Customer */}

              <div>

                <p>
                  <strong>
                    Customer:
                  </strong>{' '}
                  {ticket.customerName}
                </p>

                <p>
                  <strong>
                    Email:
                  </strong>{' '}
                  {ticket.customerEmail}
                </p>

              </div>


              {/* Movie */}

              <div>

                <p>
                  <strong>
                    Movie:
                  </strong>{' '}
                  {ticket.movieTitle}
                </p>

                <p>
                  <strong>
                    Date:
                  </strong>{' '}
                  {ticket.date}
                </p>

                <p>
                  <strong>
                    Time:
                  </strong>{' '}
                  {ticket.time}
                </p>

              </div>


              {/* Seats */}

              <div>

                <p>
                  <strong>
                    Seats:
                  </strong>
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}
                >

                  {ticket.seats.map(
                    (seat) => (

                      <span
                        key={seat}
                        style={{
                          padding:
                            '8px 12px',
                          background:
                            '#4caf50',
                          color: '#fff',
                          borderRadius:
                            '5px',
                          fontWeight:
                            'bold'
                        }}
                      >
                        {seat}
                      </span>

                    )
                  )}

                </div>

              </div>


              <hr />


              {/* Price */}

              <p>

                <strong>
                  Tickets:
                </strong>{' '}

                {ticket.ticketCount}

              </p>


              <p>

                <strong>
                  Price per Ticket:
                </strong>{' '}

                Rs. {ticket.pricePerTicket}

              </p>


              <h2
                style={{
                  textAlign: 'right'
                }}
              >

                Total: Rs.{' '}
                {ticket.totalPrice}

              </h2>


              {/* Status */}

              <div
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  background: '#e8f5e9',
                  color: '#2e7d32',
                  borderRadius: '5px',
                  fontWeight: 'bold'
                }}
              >

                ✅ {ticket.status}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default MyTickets;