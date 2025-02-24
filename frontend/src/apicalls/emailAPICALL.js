import axios from "axios";
export const emailCall = async () => {
    try {
      await axios.post(
        "http://localhost:8080/email",
        {
          flightId: localStorage.getItem("fid"),
          date: localStorage.getItem("date"),
          price: (parseFloat(localStorage.getItem("price")) + parseFloat(localStorage.getItem("FlightPrice"))),
          seatNumber: localStorage.getItem("clickedSeat"),
          seatClass: localStorage.getItem("class"),
        },
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  