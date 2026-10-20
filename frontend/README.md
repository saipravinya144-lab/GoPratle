# GoPratle — Create Your Next Opportunity

GoPratle is a full-stack event creation platform that allows users to submit event details through a multi-step form. Users can select an event category, provide event-specific information, and submit their details to a backend API, where the event information is stored in MongoDB.

## 🔗 Live Links

- **Live Website:** https://go-pratle-ecru.vercel.app
- **Backend API:** https://gopratle-backend-dncq.onrender.com
- **GitHub Repository:** https://github.com/saipravinya144-lab/GoPratle

## ✨ Features

- Multi-step event creation form.
- Event information collection, including name, type, date, location, and venue.
- Three event categories:
  - **Event Planner** — Organise and manage events.
  - **Performer** — Showcase talent.
  - **Crew** — Join an event team.
- Collection of category-specific information.
- Event description, budget, and expected audience details.
- Contact information collection.
- Backend API integration for event submission.
- MongoDB persistence for submitted events.
- Submission confirmation and event summary.

## 🛠️ Technologies Used

### Frontend
- **Next.js** — React-based web framework.
- **React** — Component-based user interface.
- **TypeScript** — Type-safe JavaScript development.
- **Tailwind CSS** — Styling and responsive UI.

### Backend
- **Node.js** — JavaScript runtime.
- **Express.js** — Backend API framework.
- **Mongoose** — MongoDB object data modelling.

### Database
- **MongoDB Atlas** — Cloud-hosted database for storing event information.

### Deployment
- **Vercel** — Frontend hosting.
- **Render** — Backend hosting.
- **GitHub** — Source code management and version control.

## 🏗️ Project Structure

```text
GoPratle/
├── frontend/
│   ├── app/
│   │   └── page.tsx
│   ├── public/
│   ├── package.json
│   └── ...
├── backend/
│   ├── models/
│   │   └── Event.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md
```

## 🔄 How It Works

1. The user opens the GoPratle website.
2. The user enters basic event information.
3. The user selects a category: Event Planner, Performer, or Crew.
4. The form collects the additional information required for the selected category.
5. The frontend sends the event data to the Express backend through an API request.
6. The backend processes the request and uses Mongoose to store the event in MongoDB Atlas.
7. The frontend displays a success message and submission summary.

## 🔌 API

### Base URL

```text
https://gopratle-backend-dncq.onrender.com
```

### Check Backend Status

**Endpoint:** `GET /`

Returns a message confirming that the backend API is running.

Example response:

```json
{
  "message": "GoPratle backend is running!"
}
```

### Create an Event

**Endpoint:** `POST /api/events`

Submits an event to the backend for storage in MongoDB.

The frontend sends the event information in the request body. The backend processes the data and saves the event using the Mongoose model.

**Example request URL:**

```text
https://gopratle-backend-dncq.onrender.com/api/events
```

## 🚀 Run Locally

### Prerequisites

- Node.js and npm
- A MongoDB Atlas account or accessible MongoDB database
- Git

### 1. Clone the repository

```bash
git clone https://github.com/saipravinya144-lab/GoPratle.git
cd GoPratle
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
MONGODB_URI=your_mongodb_connection_string
```

Replace the placeholder with your own MongoDB connection string. **Never commit your actual database credentials to GitHub.**

Start the backend:

```bash
npm run dev
```

The backend runs on the configured local port, which is typically `5000`.

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local frontend at:

```text
http://localhost:3000
```

**Note:** The frontend currently uses the deployed backend URL for API requests. To test the frontend and backend entirely locally, configure the frontend API URL to point to your local backend.

## 🧪 Testing

The deployed application was tested by submitting an event through the live website.

A test event named **GoPratle Test Event** was successfully submitted, and the corresponding document was located in the `gopratle` database's `events` collection in MongoDB Atlas.

The test verified the integration between the deployed frontend, backend API, and database.

## 🔐 Environment Variables

The backend requires the following environment variable:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB connection string |

Keep credentials and secrets in local environment files or deployment environment settings. Do not publish them in source code or repository files.

## 🌐 Deployment

- The frontend is deployed on Vercel.
- The backend is deployed on Render.
- MongoDB Atlas stores the submitted event records.
- The frontend communicates with the deployed backend through its API endpoint.

## 🔮 Future Improvements

- Add user authentication and profile management.
- Improve server-side validation and error handling.
- Add event editing, deletion, and management features.
- Provide event search and filtering.
- Improve accessibility and responsive design.
- Add automated API and frontend tests.

## 👩‍💻 Author

**Saipravinya**

GitHub: https://github.com/saipravinya144-lab

---

*GoPratle — Create your next opportunity.*
