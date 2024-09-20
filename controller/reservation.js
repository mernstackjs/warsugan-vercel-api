const Reservation = require("../model/reservation");
const { sendMail } = require("../utility/sendMail");

exports.createReservation = async (req, res) => {
  try {
    const {
      name,
      email,
      pin,
      phoneNumber,
      reservationDate,
      numberOfPeople,
      specialRequests,
    } = req.body;

    if (
      !name ||
      !email ||
      !phoneNumber ||
      !reservationDate ||
      !reservationDate.start ||
      !reservationDate.end
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: name, email, pin, phoneNumber, reservationDate (start and end)",
      });
    }
    const generatePin = (length = 4) => {
      let pin = "";
      for (let i = 0; i < length; i++) {
        pin += Math.floor(Math.random() * 10);
      }
      return pin;
    };

    // Create a new reservation object
    const newReservation = new Reservation({
      name,
      email,
      pin: generatePin(4),
      phoneNumber,
      reservationDate,
      numberOfPeople,
      specialRequests,
    });

    await newReservation.save();

    //send mail for reservation

    const trackingUrl = `https://warsugan-client-vercel.vercel.app/my-reservation/${newReservation._id}/${newReservation.email}`;

    // Create the HTML for the email body
    const dataHtml = `
     <div>
       <h2>Hi ${name}, welcome! You have made a reservation.</h2>
       <p>Your reservation details:</p>
       <ul>
         <li><strong>Email:</strong> ${email}</li>
         <li><strong>PIN:</strong> ${newReservation.pin}</li>
       </ul>
       <p>To check and track your reservation, click <a href="${trackingUrl}">here</a>.</p>
     </div>
   `;

    const optinMail = {
      to: email,
      subject: `Reservation for you, ${name}`,
      html: dataHtml,
    };

    // Send the email
    const info = await sendMail(
      optinMail.to,
      optinMail.subject,
      optinMail.html
    );
    // Send a success response
    res.status(201).json({
      message: "Reservation created successfully",
      reservation: newReservation,
      emailInfo: info,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
};

exports.ReservationTrack = async (req, res) => {
  try {
    // Extract parameters from request
    const { pin } = req.body;
    const { id, email } = req.params;

    // Validate presence of required fields
    if (!pin) {
      return res.status(400).json({
        message: "Missing required field: pin",
      });
    }

    if (!id || !email) {
      return res.status(400).json({
        message: "Missing required parameters: id and email",
      });
    }

    // Decode the email from URL encoding
    const decodedEmail = decodeURIComponent(email);

    // Find reservation by ID and email
    const reservation = await Reservation.findOne({
      _id: id,
      email: decodedEmail,
    }).select("+pin");

    // Check if reservation exists
    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found or email does not match",
      });
    }

    // Validate the provided PIN
    if (reservation.pin !== pin) {
      return res.status(401).json({
        message: "Invalid PIN",
      });
    }

    // Successfully return the reservation details
    res.status(200).json({
      message: "Reservation found",
      reservation,
    });
  } catch (error) {
    console.error("Error tracking reservation:", error);
    res.status(500).json({
      message: "Internal server error while tracking reservation",
      error: error.message,
    });
  }
};
