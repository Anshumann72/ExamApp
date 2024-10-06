
# ExamApp

A simple full-screen exam-taking platform created using React. This application features a reverse countdown timer, exit restriction with warnings, and an automatic exam submission after multiple exit attempts. Recommended to use Chrome browser for the best experience.

## Features
- Full-screen mode for exam-taking
- Reverse countdown timer
- Exit restriction with violation warning
- Auto-termination after multiple exit attempts
- Quiz component with 5 questions

## Prerequisites
- Node.js and npm installed on your local machine

## Installation & Setup
To download and run this application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Anshumann72/ExamApp.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ExamApp
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and go to the local server, typically [http://localhost:3000](http://localhost:3000).

## Usage
1. Click on the **Start Exam** button to begin the exam. The screen will automatically enter full-screen mode, and a countdown timer will start.
2. Press the `ESC` key to test the exit restriction functionality. The first attempt will show a warning and re-enter full-screen mode automatically.
3. Press `ESC` again to trigger a violation and terminate the exam.
4. Alternatively, you can press `F11` to manually re-enter full-screen mode.
5. Answer the questions using the provided quiz interface. Once all questions are answered, press the **Submit Exam** button to submit and see your results.
   
> **Note:** This app is recommended for use in the Chrome browser to ensure full functionality.

---
