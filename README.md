# Calendar App

## Overview

The Calendar App is a web application that allows users to view and interact with a calendar for the current month. Users can navigate between months, select days, and manage their names within the application. The app is designed to be modern and intuitive, providing a seamless user experience.

## Features

- Display the current month in a grid format.
- Navigate to the previous and next months.
- Select a day to associate with a user name.
- Manage multiple user names, including adding, selecting, and deleting names.
- Store user names and identifiers in a text file and cookies for persistence.
- Responsive and user-friendly design.

## Project Structure

```yml
calendar-app
├── templates
│   ├── calendar.html   # HTML structure for the calendar view
│   └── index.html      # Landing page for user name input
├── static
│   ├── css
│   │   └── style.css    # CSS styles for the application
│   └── js
│       └── script.js     # JavaScript for user interactions
├── main.py              # Main entry point of the application
├── requirements.txt     # List of dependencies
├── data
│   └── names.txt        # File to store user names and identifiers
└── README.md            # Documentation for the project
```

## Setup Instructions

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd calendar-app
   ```

2. Install the required dependencies:

   ```sh
   pip install -r requirements.txt
   ```

3. Run the application:

   ```sh
   python main.py
   ```

4. Open your web browser and navigate to `http://127.0.0.1:5000` to access the app.

## Usage Guidelines

- Upon accessing the application, you will be prompted to enter your name.
- You can navigate between months using the provided buttons.
- Click on a day in the calendar to select it and associate it with your name.
- If a day is already selected by another user, you will be prompted to confirm if you want to select that day.
- You can manage your names through the interface, allowing you to add, select, or delete names as needed.

## License

This project is licensed under the Apache License. See the LICENSE file for more details.
