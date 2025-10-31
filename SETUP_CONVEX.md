# Quick Convex Setup Guide

Follow these steps to set up Convex for your Todo app:

## Step 1: Initialize Convex

Run this command in your terminal:

```bash
npx convex dev
```

This will:
- Ask you to log in to Convex (create an account if you don't have one)
- Create a new Convex project
- Generate a Convex URL
- Create the `convex/_generated` folder with TypeScript types

## Step 2: Copy Your Convex URL

After running `npx convex dev`, you'll see output like:

```
Your deployment URL is: https://your-project-name.convex.cloud
```

**Copy this URL!**

## Step 3: Add URL to .env File

1. Open the `.env` file in the root of your project
2. Replace the empty value with your Convex URL:

```env
EXPO_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
```

## Step 4: Restart Your App

1. Stop your Expo dev server (Ctrl+C)
2. Start it again:

```bash
npm start
```

## Step 5: Keep Convex Running

While developing, keep `npx convex dev` running in a separate terminal. It will:
- Watch for changes in your `convex/` folder
- Sync your backend functions
- Provide real-time updates

## Troubleshooting

### "EXPO_PUBLIC_CONVEX_URL is not set"
- Make sure you've created a `.env` file
- Make sure the variable name is exactly `EXPO_PUBLIC_CONVEX_URL`
- Restart your Expo dev server after creating/modifying `.env`

### "Cannot find module 'convex/_generated/api'"
- Run `npx convex dev` first to generate the types
- Make sure Convex is initialized in your project

### Still seeing loading screen?
- Check that `npx convex dev` is running
- Verify your `.env` file has the correct URL
- Make sure you restarted Expo after adding the URL

## Alternative: Manual Setup

If you prefer to set up Convex manually:

1. Visit [convex.dev](https://www.convex.dev)
2. Sign up and create a new project
3. Get your deployment URL from the dashboard
4. Add it to `.env` as shown above

