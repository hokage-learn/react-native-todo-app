import { ConvexProvider, ConvexReactClient } from "convex/react";

// For development, this will be set when running `npx convex dev`
// In production, this should be in your environment variables
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL || "";

if (!convexUrl) {
  console.warn(
    "EXPO_PUBLIC_CONVEX_URL is not set. Please set it in your .env file or environment variables."
  );
}

export const convexClient = new ConvexReactClient(convexUrl);

export { ConvexProvider };

