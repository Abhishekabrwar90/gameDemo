# GamesShow App

A React Native mobile application for tracking upcoming and in-progress games, making predictions, and viewing user profiles.

## Features

-   **Games Dashboard:** Displays a list of games, filterable by status (Upcoming, Live, Completed).
-   **Game Detail Screen:** Detailed view of selected games, including team info, odds, and a simple prediction interface.
-   **User Profile:** Shows prediction history, win/loss record, and virtual balance.
-   **Mock Backend:** A simple Node.js Express server to simulate game data and prediction processing with persistence.
-   **Persistent Data:** User predictions and balance are saved locally on the mock backend.

## Technical Stack

-   **Frontend:** React Native (CLI Project)
-   **Navigation:** React Navigation (Stack and Bottom Tabs)
-   **State Management:** React Context API
-   **Local Persistence (Backend):** File System (JSON file)
-   **Backend (Mock API):** Node.js, Express, CORS
-   **UI Components:** Custom components for GameCard, PredictionForm.
-   **Icons:** React Native Vector Icons (using custom images for tabs).

## Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (comes with Node.js)
*   React Native CLI ([Installation Guide](https://reactnative.dev/docs/environment-setup))
*   Xcode (for iOS development on macOS)
*   iOS Simulator or a physical iOS device

### 1. Clone the Repository

```bash
git clone https://github.com/Abhishekabrwar90/gameDemo.git
cd GamesShow
```

### 2. Install Frontend Dependencies

Navigate to the project root and install JavaScript dependencies:

```bash
npm install
```

### 3. Install iOS Pods

Navigate to the `ios` directory and install CocoaPods dependencies:

```bash
cd ios
pod install
cd .. # Go back to the project root
```

### 4. Setup and Run the Mock Backend Server

Navigate to the `api` directory, install its dependencies, and start the server:

```bash
cd api
npm install express cors # Install backend specific dependencies
node server.js
```
The mock API will run on `http://localhost:4000`. Keep this terminal window open.

### 5. Run the React Native App

Open a **new** terminal window, navigate to the project root (`cd GamesShow` if you are not already there), and start the Metro bundler with a clean cache:

```bash
npm start --reset-cache
```
Keep this terminal window open.

### 6. Launch the iOS App

Open yet another terminal window (or use the one from step 2), navigate to the project root, and run the app on an iOS simulator:

```bash
npx react-native run-ios
```

## Troubleshooting

*   **"No script URL provided" / Metro Bundler issues:** Ensure `npm start --reset-cache` is running in a separate terminal.
*   **CocoaPods errors:** Try `cd ios && rm -rf Pods Podfile.lock && pod install --repo-update && cd ..`
*   **"Element type is invalid" / Module not found:** Check your `import` and `export` statements for custom components. Ensure `npm install` and `pod install` have been run successfully.
*   **Backend "ENOENT" error:** Make sure `sample-games-simplified.json` is in the `api` directory.
*   **Custom icons not showing:** Perform a full clean (`watchman watch-del-all`, `npm cache clean --force`, `rm -rf node_modules`, `npm install`, `cd ios && rm -rf Pods Podfile.lock && pod install --repo-update && cd ..`, then `npm start --reset-cache` and `npx react-native run-ios`).

---

## **2. Brief Demo (2-3 minutes)**

### **A. Screen Recording**
*   Use QuickTime Player on macOS (File > New Screen Recording).
*   On iOS simulator, use the built-in screen recording feature (Control Center).
*   Demonstrate:
    *   Loading the app (show dashboard).
    *   Filtering games by status (Upcoming, Live, Completed).
    *   Navigating to a **Game Detail Screen**.
    *   Making a **prediction** on an upcoming game.
    *   Navigating to the **User Profile** screen to show prediction history and balance.
    *   *Optional:* Show how game scores update on the dashboard over time (due to backend simulation) and how predictions are resolved on the profile.

### **B. Brief Explanation of Technical Approach**
*   You can verbally explain this during the screen recording, or provide a separate short text/audio/video file.
*   Key points to cover:
    *   **React Native CLI:** How the project is set up without Expo.
    *   **React Navigation:** How stack and bottom tab navigators are used.
    *   **React Context:** Why it's used for global state management (games, user, loading, errors) and how it centralizes data logic.
    *   **Mock Backend (Node.js/Express):** How it simulates game data and prediction processing, including persistence to a JSON file.
    *   **Reusable Components:** Briefly mention `GameCard` and `PredictionForm`.
    *   **Data Flow:** Explain how the frontend talks to the mock backend via `mockApi.js` and how data updates are handled (including polling for game/user data).

---

Let me know if you have any questions about these steps or if you'd like me to provide more detail on any specific part!