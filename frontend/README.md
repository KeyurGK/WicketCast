WicketCast 🎟️🌦️
WicketCast is a web application designed to help cricket enthusiasts make informed decisions about attending live matches based on weather predictability. By combining cricket match schedules and weather forecasts, WicketCast suggests the best days for an exciting, uninterrupted cricket experience.

Features 📋
Match Schedules: Fetches international cricket match schedules via the Cricbuzz API.
Weather Forecasts: Provides weather forecasts for specific match dates and locations using the Visual Crossing API.
Booking Recommendations: Color-coded recommendations (green, yellow, red) based on weather conditions, indicating the likelihood of favorable weather.
Google Authentication: Secure Google login for users.
Click Limit for Recommendations: Limits the number of views per user session to prevent excessive API calls.
Tech Stack 🛠️
Frontend: React, Vite, Tailwind CSS

## APIs:
Cricbuzz API via RapidAPI for match schedules
Visual Crossing API for weather forecasts
User Authentication: Google OAuth 2.0
Deployment: Vercel
Installation ⚙️
Clone the Repository

bash
Copy code
git clone https://github.com/your-username/wicketcast.git
cd wicketcast
Install Dependencies

bash
Copy code
npm install
Set Up Environment Variables

Create a .env file in the root of the project with the following variables:

plaintext
Copy code
## VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_VISUALCROSSING_API_KEY=your_visualcrossing_api_key
VITE_CRICBUZZ_API_KEY=your_cricbuzz_api_key
Run the Application

bash
Copy code
npm run dev
Access the App: Open your browser and go to http://localhost:5173.

## Usage 🚀
Sign In: Use Google authentication to sign in to WicketCast.
Browse Matches: View upcoming cricket matches.
Check Weather Probability: Click on the "View" button next to a match to get weather-based recommendations.
Green: Favorable weather conditions.
Yellow: Possible weather interruptions.
Red: High chance of weather issues.
Usage Limit: Only two views are allowed per session.
Contributing 👥
WicketCast is open for contributions! Here’s how you can get involved:

Fork the Repository: Click the "Fork" button in GitHub to create a personal copy of this project.
Create a New Branch: Make your changes in a new branch.
bash
Copy code
git checkout -b feature/YourFeatureName
Commit and Push: Commit your changes, and push the branch to your forked repository.
bash
Copy code
git commit -m "Add YourFeatureName"
git push origin feature/YourFeatureName
Submit a Pull Request: Open a pull request to merge your changes into the main project repository.
Project Structure 📂
plaintext
Copy code
## ├── src
## │   ├── components          # Reusable components
## │   ├── context             # Context API for state management
## │   ├── modals              # Modal components (e.g., Weather details)
## │   ├── pages               # Main application pages
## │   ├── App.jsx             # Main application component
## │   └── index.jsx           # Entry point
## ├── public                  # Static assets
## ├── .env                    # Environment variables
## └── README.md               # Project documentation
# License 📜
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments 🙏
Visual Crossing for the weather API.
Cricbuzz API for match schedule data.
Google OAuth for secure user authentication.