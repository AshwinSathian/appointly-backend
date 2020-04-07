# Calendly-Clone-App(Appointly) Backend APIs

This Node.js project is the backend for an application that clones the main functionalities of Calendly. The included functionalities are:
- Basic User Authentication(Sign Up and Login)
- Book an Appointment
- Define slots during the day when user is available for appointments
- Perform CRUD operations on the Booked Appointments


## Technologies

The REST APIs that make up this backend application is written in Node.js, using the Express framework. MongoDB, a NoSQL database is used, with Mongoose used to leverage the ODM pattern.


## Endpoints

- POST - `auth/signup`
- POST - `auth/login`
- POST - `booking/book-appointment`
- PUT - `booking/update-appointment/:bookingId`
- GET - `booking/get-hosted-appointments/:hostMail`
- GET - `booking/get-guest-appointments/:guestMail`
- GET - `booking/get-all-appointments/:userMail`
- GET - `booking/booking-details/:userMail`
- DELETE - `booking/delete-appointment/:bookingId`
- GET - `slot/active-slots`
- POST - `slot/update-slots`


## Running the Application

Assuming that Node.js runtime is already setup in the machine, you can run this application locally as follows:
- Clone the Repo
- From within the cloned directory, run `npm install` to sintall all the required packages and dependencies
- After installation completes, run `node server.js`


## Live Application

This application has been deployed at `https://intense-eyrie-15781.herokuapp.com/api/`

