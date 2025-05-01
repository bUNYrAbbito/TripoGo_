# Tripogo

Tripogo is a full-stack web application designed to help users manage travel listings. Users can create, view, edit, and delete travel destinations, as well as leave reviews for listings. The application is built with Node.js, Express.js, MongoDB, and EJS, providing a robust and user-friendly platform for travel enthusiasts.

---

## Features

### Listings Management
- Add, view, edit, and delete travel listings.
- Listings include details such as title, description, price, location, country, and images.

### Reviews
- Users can leave reviews and ratings for listings.
- Reviews include a comment, rating (1-5 stars), and the reviewer's username.

### Authentication
- User authentication is implemented using `passport-local` and `passport-local-mongoose`.
- Features include user signup, login, and logout functionality.

### Flash Messages
- Flash messages provide user-friendly notifications for actions like creating or deleting listings and reviews.

### Responsive Design
- The application is optimized for both desktop and mobile devices using Bootstrap.

### Error Handling
- Centralized error handling ensures a smooth user experience with meaningful error messages.

---

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs and handling routing.

### Database
- **MongoDB**: NoSQL database for storing listings, reviews, and user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.

### Frontend
- **EJS**: Embedded JavaScript templating for rendering dynamic HTML.
- **Bootstrap**: CSS framework for responsive design.

### Authentication
- **Passport.js**: Middleware for user authentication.
- **passport-local**: Strategy for local authentication.
- **passport-local-mongoose**: Simplifies user authentication with Mongoose.

### Validation
- **Joi**: Schema-based validation for request data.

### Utilities
- **connect-flash**: Flash messaging middleware for Express.
- **method-override**: Enables HTTP methods like PUT and DELETE.
- **express-session**: Session management middleware.

---

## Installation

### Prerequisites
- Node.js (v23.7.0 or higher)
- MongoDB (local or Atlas cluster)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tripogo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory with the following content:
     ```
     CLOUD_NAME=<your-cloudinary-cloud-name>
     API_KEY=<your-cloudinary-api-key>
     API_SECRET=<your-cloudinary-api-secret>
     ATLAS_URL=<your-mongodb-atlas-url>
     ```

4. Start MongoDB:
   - If using a local MongoDB instance, ensure it is running on `mongodb://127.0.0.1:27017`.

5. Initialize the database (optional):
   - Populate the database with sample data:
     ```bash
     node init/index.js
     ```

6. Start the application:
   ```bash
   npm start
   ```

7. Open your browser and navigate to:
   ```
   http://localhost:8081/listing
   ```

---

## Project Structure

- **`app.js`**: Main application file for setting up middleware, routes, and error handling.
- **`routes/`**: Contains route handlers for listings, reviews, and user authentication.
- **`models/`**: Mongoose schemas for `Listing`, `Review`, and `User`.
- **`views/`**: EJS templates for rendering the frontend.
- **`public/`**: Static assets like CSS, JavaScript, and images.
- **`init/`**: Scripts for initializing the database with sample data.
- **`utils/`**: Utility functions like `catchAsync` for error handling.
- **`Error/`**: Custom error handling classes.
- **`controller/`**: Contains controller logic for listings and reviews.

---

## Scripts

- **Start the server**:
   ```bash
   npm start
   ```

- **Run tests**:
   ```bash
   npm test
   ```

---

## Dependencies

Key dependencies used in this project:
- `express`: Web framework for Node.js.
- `mongoose`: MongoDB ODM for object modeling.
- `ejs`: Embedded JavaScript templating.
- `joi`: Object schema validation.
- `connect-flash`: Flash messaging middleware for Express.
- `express-session`: Session management middleware.
- `method-override`: Middleware for HTTP method support (PUT, DELETE).
- `passport`: Authentication middleware for Node.js.
- `passport-local`: Passport strategy for local authentication.
- `passport-local-mongoose`: Mongoose plugin for simplifying user authentication.
- `multer`: Middleware for handling file uploads.
- `cloudinary`: Cloud-based image storage and management.

To install all dependencies, run:
```bash
npm install
```

---

## License

This project is licensed under the ISC License.

---

## Screenshots (Optional)
Include screenshots of the application to showcase its features and design.

---

## Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request.

---

Let me know if you need further modifications or additional sections!