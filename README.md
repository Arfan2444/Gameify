Gameify
Gameify is a web application that allows users to manage their game collection. Users can add, update, and delete games, and the application fetches game images using the RAWG API. The project is built using Next.js, Firebase (Firestore and Authentication), Tailwind CSS, and the RAWG API.

Features
User Authentication:

Sign up and log in using email/password or Google.

Logout functionality.

Game Management:

Add new games with details like title, rating, and whether it's a "Game of the Year."

Fetch game images automatically using the RAWG API.

Update and delete games.

Responsive UI:

Built with Tailwind CSS for a modern and responsive design.

Dark and Purple Theme:

A visually appealing dark theme with purple accents and gradient backgrounds.

Technologies Used
Frontend:

Next.js - React framework for server-side rendering and static site generation.

Tailwind CSS - Utility-first CSS framework for styling.

Backend:

Firebase - For authentication and Firestore database.

APIs:

RAWG API - For fetching game images and details.




How It Works
1. Authentication:

Users can sign up or log in using their email/password or Google account.

Firebase Authentication handles user management.

2. Game Management:

Users can add a new game by providing the title, rating, and whether it's a "Game of the Year."

The application fetches the game image from the RAWG API using the game title.

Games are stored in Firestore, and users can update or delete them.

3. Image Fetching:

The RAWG API is used to fetch game images based on the game title.

If no image is found, a placeholder image is displayed.

4. UI:

The UI is built with Tailwind CSS, featuring a dark and purple theme with gradient backgrounds and glow effects.
