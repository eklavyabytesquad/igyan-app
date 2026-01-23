# iGyan Educational App 📚

A React Native mobile application for the **iGyan** educational platform built with Expo.

## 📁 Project Structure

```
igyan-app/
├── app/                    # Expo Router screens
│   ├── _layout.js          # Root layout
│   ├── login.js            # Login modal
│   ├── signup.js           # Signup modal
│   ├── settings.js         # Settings screen
│   ├── (tabs)/             # Tab navigation
│   │   ├── _layout.js      # Tab layout
│   │   ├── home.js         # Home tab
│   │   ├── courses.js      # Courses tab
│   │   ├── explore.js      # Explore tab
│   │   └── profile.js      # Profile tab
│   ├── course/             # Course screens
│   │   └── [id].js         # Course detail
│   └── lesson/             # Lesson screens
│       └── [id].js         # Lesson player
├── pages/                  # Page components
│   ├── home/
│   │   └── HomePage.js
│   ├── courses/
│   │   └── CoursesPage.js
│   ├── explore/
│   │   └── ExplorePage.js
│   └── profile/
│       └── ProfilePage.js
├── styles/                 # Style files
│   ├── globalStyles.js     # Global/common styles
│   └── pages/              # Page-specific styles
│       ├── homeStyles.js
│       ├── coursesStyles.js
│       ├── exploreStyles.js
│       └── profileStyles.js
├── components/             # Reusable components
│   ├── ThemedText.js
│   ├── ThemedView.js
│   ├── IconSymbol.js
│   └── HapticTab.js
├── hooks/                  # Custom hooks
│   ├── useColorScheme.js
│   └── useThemeColor.js
├── navigation/             # Navigation config
│   └── config.js
├── constants/              # App constants
│   └── theme.js            # Colors, fonts, spacing
└── assets/                 # Images, fonts, etc.
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on device)

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Run on specific platform:

   ```bash
   npm run android    # Android
   npm run ios        # iOS
   npm run web        # Web
   ```

## 📱 Features

- **Home Screen**: Welcome section, featured courses, learning stats
- **Courses**: Browse, search, and filter courses by category
- **Explore**: Discover trending courses, categories, and instructors
- **Profile**: User profile, achievements, and settings
- **Course Detail**: Full course information with lessons list
- **Lesson Player**: Video player with navigation controls
- **Authentication**: Login and signup screens

## 🎨 Theme

The app uses iGyan brand colors:
- **Primary**: #1E88E5 (Blue - knowledge & trust)
- **Secondary**: #43A047 (Green - growth & learning)
- **Accent**: #FF9800 (Orange - energy & enthusiasm)

Supports both light and dark modes automatically.

## 📦 Key Dependencies

- `expo` - Expo SDK
- `expo-router` - File-based routing
- `react-native` - React Native framework
- `@react-navigation/native` - Navigation
- `expo-haptics` - Haptic feedback

## 📄 License

Copyright © 2026 iGyan Educational Company

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
