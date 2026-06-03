<div align="center">

<img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Expo-54-000020?style=for-the-badge&logo=expo&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Build-EAS-4630EB?style=for-the-badge&logo=expo&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

# 📱 WatchLater — Mobile App

**Save links. Get reminded. Watch later.**

Cross-platform mobile client for WatchLater — a personal watch list manager with push notifications, SMS password recovery and automatic thumbnail fetching.

[🖥️ Backend API](https://github.com/GormanProg123/WatchLaterApp-BackEnd) · [📖 API Docs](https://watchlaterapp-backend.onrender.com/api/docs) · [🐛 Report Bug](https://github.com/GormanProg123/WatchLaterApp/issues)

</div>

---

## ✨ Features

- 🔐 **JWT Authentication** — register, login, secure token storage via AsyncStorage
- 🔗 **Link saving** — save any URL with auto-fetched title and thumbnail
- 📋 **Status management** — mark items as watched / pending
- 🗑️ **Trash & Restore** — soft delete with recovery option
- 🔔 **Push Notifications** — scheduled reminders via Expo Notifications
- 📱 **SMS OTP** — password reset via phone number
- 👤 **Profile management** — update phone number and email
- 🌐 **Keepalive** — pings backend every 14 min to prevent cold starts on free tier

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native 0.81 |
| Platform | Expo SDK 54 |
| Language | TypeScript 5.9 |
| Navigation | Expo Router 6 (file-based) |
| HTTP Client | Axios |
| Auth Storage | AsyncStorage |
| Push | expo-notifications |
| Fonts | Inter · DM Sans (Google Fonts) |
| Build | EAS Build |

---

## 📁 Project Structure

```
app/
├── (app)/                      # Protected app screens (requires auth)
├── (auth)/                     # Auth flow screens
│   └── splash-screen           # Entry point → login or home
└── screens/
    ├── _layout.tsx             # Root layout: fonts, notifications, keepalive
    └── index.tsx               # Redirect entry point

components/
├── auth/                       # Auth-related UI components
├── constants/                  # Colors, fonts, spacing tokens
└── features/
    ├── ButtonItem/             # Reusable action button
    ├── ItemAddingForm/         # Add new link form
    ├── ItemLayout/             # Watch item card layout
    └── StatusLists/            # Watched / pending lists

main/
├── accountpage/                # Profile & settings screen
├── homepage/                   # Main watch list screen
└── phonenumberpage/            # Phone number update screen

api/
└── client.ts                   # Axios instance with base URL & interceptors

utils/
├── notifications.ts            # Push token registration & permission handling
└── validators.ts               # Input validation helpers

assets/                         # Icons, splash screen, images
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **Expo Go** app (for development) or an Android device/emulator
- **EAS CLI** (for production builds): `npm install -g eas-cli`

### Installation

```bash
# Clone the repository
git clone https://github.com/GormanProg123/WatchLaterApp.git
cd WatchLaterApp

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=https://watchlaterapp-backend.onrender.com
```

> For local development, point to your local backend instance.

### Running the App

```bash
# Start Expo dev server
npm start

# Run on Android
npm run android

# Start with cleared cache
npm run start:clear
```

---

## 📦 Building with EAS

The project uses **Expo Application Services (EAS)** for cloud builds.

```bash
# Login to Expo
eas login

# Development build (internal distribution)
eas build --profile development --platform android

# Preview APK (internal distribution)
eas build --profile preview --platform android

# Production APK
eas build --profile release-apk --platform android

# Production App Bundle (Google Play)
eas build --profile production --platform android
```

| Profile | Distribution | Output | Use case |
|---------|-------------|--------|----------|
| `development` | Internal | Dev client | Local development |
| `preview` | Internal | `.apk` | QA / testing |
| `release-apk` | Internal | `.apk` | Direct install |
| `production` | Store | `.aab` | Google Play |

---

## 🔔 Push Notifications

The app registers for push notifications on launch using **Expo Notifications**.

- Requests permission on first run
- Sends the Expo push token to the backend for storage
- Handles foreground notifications with sound and banner
- Users can toggle reminders per-item from the watch list

---

## 🔐 Auth Flow

```
Splash Screen
     │
     ├─── No token ──→ Login Screen ──→ Register Screen
     │
     └─── Token found ──→ Home Screen
                               │
                               └──→ Account Page
```

Token is stored in **AsyncStorage** and decoded with `jwt-decode` to check expiry.

---

## ☁️ Backend

This app is powered by the [WatchLater Backend](https://github.com/GormanProg123/WatchLaterApp-BackEnd) — a NestJS REST API deployed on Render.

> **⚠️ Free tier note:** The backend spins down after 15 min of inactivity. The app sends a keepalive ping to `GET /auth/ping` every **14 minutes** to prevent cold starts.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the **MIT License**.

---

<div align="center">

Made with ❤️ using React Native & Expo

⭐ Star this repo if you find it useful!

</div>
