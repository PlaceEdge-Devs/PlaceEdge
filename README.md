# PlaceEdge: Placement Flyer & Announcement Automation Agent

![App Preview](placeholder-screenshot.png)
*(Note: Please replace `placeholder-screenshot.png` with an actual screenshot of the live application)*
Link for App : https://poster-spcr.netlify.app
PlaceEdge is a specialized automation tool designed for the Placement Cell / SPCR Office to quickly generate high-quality placement flyers and LinkedIn announcements. It eliminates manual Canva design work and standardizes the process.

## 🚀 Features

- **Live In-Browser Preview**: See the flyer update in real-time as you type, powered by `react-konva`.
- **Automated Layouts**: Dynamically adapts from a single student up to a 5-student grid layout.
- **AI LinkedIn Captions**: Integrates with Google Gemini to automatically generate LinkedIn captions including custom department tags and core team mentions.
- **Privacy First**: All photo cropping and rendering happens entirely client-side. No student photos are ever sent to an external server.
- **Instant PNG Export**: Download high-resolution PNGs instantly with a single click.

## 🏗️ Project Structure

The project is split into a lightweight backend and a robust React frontend.

- `frontend/`: React + Vite + Tailwind CSS + Konva. Handles the UI and the Canvas-based flyer rendering.
- `backend/`: Node.js + Express. A thin server that processes the Gemini API requests for caption generation and serves static configurations.

## ⚙️ Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- Google Gemini API Key

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```
*(The backend runs on port 5000 by default)*

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 📝 How to Use

1. Open your browser and navigate to `http://localhost:5173` (or the port Vite provides).
2. Select the **Layout Type** based on the number of students (1 to 5).
3. Fill in the required details: Student Name, Department, Batch, Role, Company, etc.
4. **Upload Photos**: Upload the student photos and company logo. The app will automatically crop them and format them according to the selected layout.
5. **Live Preview**: Review the live preview on the screen. Any changes to the form will immediately reflect on the flyer.
6. Click **Export PNG** to download the final flyer to your local machine.
7. Click **Generate Caption** to draft a ready-to-use LinkedIn announcement with appropriate tags and HOD credits.
8. Copy the generated caption and post manually on LinkedIn and your WhatsApp Community groups!

## 🛠️ Configuration

You can customize the fixed team members, HOD lists, and hashtags by editing the JSON config files. These are used to generate the AI captions and format the flyer:

- `hod-list.json`: Maps departments to HOD names and LinkedIn profiles.
- `spcr-team.json`: Fixed SPCR team credits.
- `hashtags.json`: Base and dynamic hashtags pool.

## 🔒 Security Note
Do not commit your `.env` file to version control. Keep your API keys secure. All student photos are processed securely within your local browser session and are never uploaded to the cloud.
