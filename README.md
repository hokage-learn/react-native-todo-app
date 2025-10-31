# Must-Do: React Native Todo App

A sophisticated Todo List application built with React Native (Expo), featuring theme switching and real-time backend integration using Convex.

## Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete todos
- 🌓 **Light/Dark Theme** - Smooth theme switching with persistent preferences
- 🔄 **Real-time Updates** - Powered by Convex backend for instant synchronization
- 🔍 **Search & Filter** - Search todos by title/description, filter by status
- 📅 **Due Dates** - Set and track due dates for todos
- 👆 **Drag & Sort** - Reorder todos by dragging
- 🗑️ **Swipe to Delete** - Intuitive swipe gesture to delete todos
- 📱 **Responsive Design** - Works beautifully on all screen sizes
- ♿ **Accessible** - Full accessibility support with screen reader compatibility

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing)
- [Convex account](https://www.convex.dev/) (free tier available)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd must-do
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Convex backend**
   
   Run the following command to initialize your Convex project:
   ```bash
   npx convex dev
   ```
   
   This will:
   - Prompt you to log in or create a Convex account
   - Create a new Convex project (or connect to an existing one)
   - Start the Convex development server
   - Generate your Convex URL

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Convex URL (obtained from step 3):
   ```env
   EXPO_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Run on your device**
   - Scan the QR code with Expo Go (iOS) or Camera app (Android)
   - Or press `a` for Android emulator or `i` for iOS simulator

## Project Structure

```
must-do/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout with providers
│   ├── index.tsx          # Main todo list screen
│   ├── add-todo.tsx       # Add new todo screen
│   └── edit-todo/         # Edit todo screen
├── components/            # Reusable React components
│   ├── TodoItem.tsx       # Individual todo item component
│   ├── TodoForm.tsx       # Form for add/edit todos
│   ├── SearchBar.tsx      # Search input component
│   ├── FilterButtons.tsx  # Filter buttons (All/Active/Completed)
│   ├── EmptyState.tsx     # Empty state component
│   ├── ThemeToggle.tsx    # Theme switcher component
│   └── Toast.tsx          # Toast notification component
├── context/               # React Context providers
│   └── ThemeContext.tsx   # Theme context and provider
├── hooks/                 # Custom React hooks
│   └── useTodos.ts        # Convex hooks for todos
├── convex/                # Convex backend functions
│   ├── schema.ts          # Database schema
│   ├── listTodos.ts       # Query: Get all todos
│   ├── getTodo.ts         # Query: Get single todo
│   ├── createTodo.ts      # Mutation: Create todo
│   ├── updateTodo.ts      # Mutation: Update todo
│   ├── deleteTodo.ts      # Mutation: Delete todo
│   ├── toggleComplete.ts  # Mutation: Toggle completion
│   └── reorderTodos.ts    # Mutation: Reorder todos
├── types/                 # TypeScript type definitions
│   ├── todo.ts            # Todo-related types
│   └── theme.ts            # Theme types
└── utils/                 # Utility functions
    └── convex.ts          # Convex client setup
```

## Development Commands

```bash
# Start Expo development server
npm start

# Start on Android
npm run android

# Start on iOS (requires macOS)
npm run ios

# Start on web
npm run web

# Run Convex development server
npx convex dev
```

## Building for Production

### Android APK

1. **Install EAS CLI** (if not already installed)
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas login
   eas build:configure
   ```

3. **Build APK**
   ```bash
   npm run build:apk
   ```

   Or use EAS directly:
   ```bash
   eas build --platform android --profile production
   ```

4. **Download the APK**
   - The build will complete on EAS servers
   - Download link will be provided in the terminal
   - Or visit [Expo dashboard](https://expo.dev) to download

### iOS Build

```bash
eas build --platform ios
```

## Convex Setup Details

### Initial Setup

1. **Sign up for Convex**
   - Visit [convex.dev](https://www.convex.dev)
   - Create a free account

2. **Initialize Convex in your project**
   ```bash
   npx convex dev
   ```
   This command will:
   - Install Convex CLI if needed
   - Authenticate you with Convex
   - Create a new project
   - Set up the backend schema
   - Start the development server

3. **Get your Convex URL**
   - After running `npx convex dev`, your Convex URL will be displayed
   - Copy this URL to your `.env` file as `EXPO_PUBLIC_CONVEX_URL`

### Database Schema

The app uses a simple schema with a `todos` table:

```typescript
{
  title: string;
  description?: string;
  dueDate?: number;      // timestamp
  completed: boolean;
  createdAt: number;      // timestamp
  order: number;         // for sorting
}
```

### Deploying to Production

1. **Deploy Convex functions**
   ```bash
   npx convex deploy
   ```

2. **Update production environment variables**
   - Set `EXPO_PUBLIC_CONVEX_URL` in your production build environment

## Environment Variables

Create a `.env` file with:

```env
EXPO_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

**Note:** The `.env` file should be in `.gitignore` and not committed to version control.

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform and toolchain
- **Expo Router** - File-based routing
- **Convex** - Real-time backend as a service
- **TypeScript** - Type safety
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Gesture recognition
- **AsyncStorage** - Local storage for theme preferences
- **Zod** - Schema validation
- **React Native Toast Message** - Toast notifications

## Features Implementation

### Theme System
- Automatic detection of system theme preference
- Manual theme toggle with smooth animations
- Persistent theme preference using AsyncStorage
- Theme-aware components throughout the app

### Real-time Synchronization
- All CRUD operations sync in real-time via Convex
- Multiple users see updates instantly
- Optimistic updates for better UX

### Drag and Sort
- Long-press any todo item to enter drag mode
- Drag to reorder todos
- Order persists automatically via Convex

### Swipe to Delete
- Swipe left on any todo item to reveal delete action
- Smooth animation with confirmation

## Troubleshooting

### Convex Connection Issues
- Ensure your `.env` file has the correct `EXPO_PUBLIC_CONVEX_URL`
- Verify Convex dev server is running: `npx convex dev`
- Check Convex dashboard for any errors

### Build Issues
- Clear Expo cache: `expo start -c`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Ensure all environment variables are set correctly

### Theme Not Persisting
- Check AsyncStorage permissions
- Verify theme context is properly wrapped around app

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built for HNG Stage 4
- Design inspiration from Figma template
- Powered by Convex for real-time functionality

## Support

For issues and questions:
- Open an issue on GitHub
- Check the [Convex documentation](https://docs.convex.dev)
- Refer to [Expo documentation](https://docs.expo.dev)

