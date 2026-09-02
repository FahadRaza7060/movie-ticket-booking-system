import { useState } from 'react';

// 1. Mock Data: Initializing an 8x8 seating grid layout
const generateInitialSeats = () => {
  
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const totalSeatsPerRow = 8;
  const seatsData = [];

  rows.forEach((row) => {
    for (let i = 1; i <= totalSeatsPerRow; i++) {
      // Randomly marking some seats as already reserved by other users
      const isReserved = Math.random() < 0.25; 
      
      seatsData.push({
        id: `${row}${i}`,
        row: row,
        number: i,
        status: isReserved ? 'reserved' : 'available',
      });
    }
  });

  return seatsData;
};

function SeatSelection() {
  
    const [seats, setSeats] = useState(generateInitialSeats());
    const [selectedSeats, setSelectedSeats] = useState([]);

  // 2. Handle seat clicks
  const handleSeatClick = (seatId) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.id !== seatId) return seat;
        
        // Block action if seat is already taken
        if (seat.status === 'reserved') return seat;

        // Toggle state between available and selected
        const isCurrentlySelected = seat.status === 'selected';
        const newStatus = isCurrentlySelected ? 'available' : 'selected';

        // Update selected list state tracker
        if (isCurrentlySelected) {
          setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
        } else {
          setSelectedSeats((prev) => [...prev, seatId]);
        }

        return { ...seat, status: newStatus };
      })
    );
  };

  // 3. Simple styling helpers for clean design status tracking
  const getSeatColor = (status) => {
    switch (status) {
      case 'selected': return '#4caf50'; // Green
      case 'reserved': return '#f44336'; // Red
      default: return '#e0e0e0';         // Grey (Available)
    }
  };

  return (

    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2>🎬 Choose Your Seats</h2>
      
      {/* Visual Screen Element */}
      <div style={{
        width: '300px', 
        height: '8px', 
        background: '#555', 
        margin: '20px auto 40px',
        borderRadius: '50%',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
      }}>
        {/* <small style={{ display: 'block', marginTop: '20px', color: '#777' }}> SCREEN THIS WAY </small> */}
      </div>

      {/* Grid Layout Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 40px)',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '30px'
      }}>
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleSeatClick(seat.id)}
            disabled={seat.status === 'reserved'}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '6px',
              border: 'none',
              background: getSeatColor(seat.status),
              color: seat.status === 'reserved' ? '#fff' : '#333',
              cursor: seat.status === 'reserved' ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: 'transform 0.1s ease'
            }}
          >
            {seat.id}
          </button>
        ))}
      </div>

      {/* Status Legend Indicator Indicators */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
        <div><span style={{ display: 'inline-block', width: '15px', height: '15px', background: '#e0e0e0', marginRight: '5px', borderRadius: '3px' }}></span>Available</div>
        <div><span style={{ display: 'inline-block', width: '15px', height: '15px', background: '#4caf50', marginRight: '5px', borderRadius: '3px' }}></span>Selected</div>
        <div><span style={{ display: 'inline-block', width: '15px', height: '15px', background: '#f44336', marginRight: '5px', borderRadius: '3px' }}></span>Reserved</div>
      </div>

      {/* Booking Invoice Footer Detail */}
      <div style={{ marginTop: 
        '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <p>Selected Seats: <strong>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</strong></p>
        <p>Total Price: <strong>Rs. {selectedSeats.length * 500}</strong></p>
        <button 
          disabled={selectedSeats.length === 0}
          style={{
            padding: '10px 20px',
            background: selectedSeats.length === 0 ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Proceed to Checkout
        </button>

      </div>
    </div>
  );
}

export default SeatSelection;