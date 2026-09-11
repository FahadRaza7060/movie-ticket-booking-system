import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Generate 8 x 8 seats
const generateInitialSeats = () => {

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const totalSeatsPerRow = 8;
  const seatsData = [];

  rows.forEach((row) => {
    for (let i = 1; i <= totalSeatsPerRow; i++) {
      const isReserved = Math.random() < 0.25;

      seatsData.push({
        id: `${row}${i}`,
        row: row,
        number: i,
        status: isReserved ? "reserved" : "available",
      });
    }
  });

  return seatsData;
};

function SeatSelection() {
  const navigate = useNavigate();

  const location = useLocation();

  // Get movie information from previous page
  const movie = location.state?.movie || {
    title: "Avengers: Endgame",
    date: "05 September 2026",
    time: "7:30 PM",
    price: 500,
  };

  // Get logged-in user that is stored in local storage
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Dummy User",
    email: "dummy@example.com",
  };

  // Seats
  const [seats, setSeats] = useState(generateInitialSeats());

  // Selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Handle seat selection
  const handleSeatClick = (seatId) => {
    setSeats((prevSeats) => {
      return prevSeats.map((seat) => {
        // Not clicked seat
        if (seat.id !== seatId) {
          return seat;
        }

        // Already reserved
        if (seat.status === "reserved") {
          return seat;
        }

        // Check current status
        const isCurrentlySelected = seat.status === "selected";

        // Toggle status
        const newStatus = isCurrentlySelected ? "available" : "selected";

        return {
          ...seat,
          status: newStatus,
        };
      });
    });

    // Update selected seats
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatId)) {
        return prevSelected.filter((id) => id !== seatId);
      }

      return [...prevSelected, seatId];
    });
  };

  // Get seat color
  const getSeatColor = (status) => {
    switch (status) {
      case "selected":
        return "#4caf50";

      case "reserved":
        return "#f44336";

      default:
        return "#e0e0e0";
    }
  };


  // BOOK TICKET
  const handleBookTicket = () => {
    // Check seat selection
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    // Generate booking ID
    const bookingId = "MOV-" + Date.now();
    // Calculate total
    const totalPrice = selectedSeats.length * movie.price;
    // Create booking object
    const newTicket = {
      bookingId,
      customerName: user.name,
      customerEmail: user.email,
      movieTitle: movie.title,
      date: movie.date,
      time: movie.time,
      seats: selectedSeats,
      ticketCount: selectedSeats.length,
      pricePerTicket: movie.price,
      totalPrice,
      bookingDate: new Date().toISOString(),
      status: "Confirmed",
    };

    // Get previous tickets
    const existingTickets = JSON.parse(localStorage.getItem("myTickets")) || [];
    // Add new ticket
    const updatedTickets = [...existingTickets, newTicket];
    // Save tickets
    localStorage.setItem("myTickets", JSON.stringify(updatedTickets));

    // Navigate to My Tickets
    navigate("/mytickets");
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h2>🎬 Choose Your Seats</h2>

      {/* Movie Information */}

      <h3>{movie.title}</h3>

      <p>
        {movie.date} | {movie.time}
      </p>

      {/* SCREEN */}

      <div
        style={{
          width: "300px",
          height: "8px",
          background: "#555",
          margin: "20px auto 40px",
          borderRadius: "50%",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      />

      <p>SCREEN</p>

      {/* SEAT GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 40px)",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleSeatClick(seat.id)}
            disabled={seat.status === "reserved"}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "6px",
              border: "none",
              background: getSeatColor(seat.status),
              color: seat.status === "reserved" ? "#fff" : "#333",
              cursor: seat.status === "reserved" ? "not-allowed" : "pointer",
              fontWeight: "bold",
              transition: "transform 0.1s ease",
            }}
          >
            {seat.id}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <span>⬜</span> Available
        </div>

        <div>
          <span>🟩</span> Selected
        </div>

        <div>
          <span>🟥</span> Reserved
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          borderTop: "1px solid #eee",
          paddingTop: "20px",
        }}
      >
        <p>
          Selected Seats:
          <strong>
            {selectedSeats.length > 0 ? selectedSeats.join(", ") : " None"}
          </strong>
        </p>

        <p>
          Number of Tickets:
          <strong> {selectedSeats.length}</strong>
        </p>

        <p>
          Total Price:
          <strong> Rs. {selectedSeats.length * movie.price}</strong>
        </p>

        {/* BOOK TICKET */}

        <button
          onClick={handleBookTicket}
          disabled={selectedSeats.length === 0}
          style={{
            padding: "12px 25px",
            background: selectedSeats.length === 0 ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;
