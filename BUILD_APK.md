# Quick Guide: Building APK for Submission

## Step-by-Step APK Build Instructions

### Prerequisites
- Expo account (free) - [Sign up here](https://expo.dev/signup)
- Your Convex URL ready

### Quick Build Steps

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Update eas.json with your Convex URL**
   
   Open `eas.json` and replace `YOUR_CONVEX_URL_HERE` in the production profile with your actual Convex URL:
   ```json
   "production": {
     "android": {
       "buildType": "apk"
     },
     "env": {
       "EXPO_PUBLIC_CONVEX_URL": "https://your-actual-project.convex.cloud"
     }
   }
   ```

4. **Build the APK**
   ```bash
   eas build --platform android --profile production
   ```

5. **Wait for Build** (10-20 minutes first time)
   - Monitor at: https://expo.dev/builds
   - You'll get an email when done

6. **Download APK**
   - Visit https://expo.dev/builds
   - Click on your completed build
   - Click "Download" button
   - Save the APK file

### Alternative: Using EAS Secrets (Recommended)

Instead of hardcoding in eas.json:

1. **Set the secret:**
   ```bash
   eas secret:create --scope project --name EXPO_PUBLIC_CONVEX_URL --value https://your-project.convex.cloud
   ```

2. **Remove env from eas.json** production profile (or leave it, secrets take precedence)

3. **Build:**
   ```bash
   eas build --platform android --profile production
   ```

### Troubleshooting

**Build fails with "Convex URL not found"**
- Make sure you've updated eas.json OR set the EAS secret
- Verify your Convex URL is correct (run `npx convex dev` to see it)

**Build is stuck**
- Check https://expo.dev/builds for status
- Sometimes builds queue - wait a bit longer
- Try cancelling and rebuilding

**Want faster build for testing?**
```bash
eas build --platform android --profile preview
```

This builds a preview APK (same functionality, just not production profile).

### After Building

1. Download the APK from Expo dashboard
2. Upload to Google Drive or your preferred cloud storage
3. Share the link in your submission
4. Don't forget to include your demo video!

