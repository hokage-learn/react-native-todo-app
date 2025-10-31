import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "@env";

// For development, this will be set when running `npx convex dev`
// In production, this should be in your environment variables
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL || "";

export const convexClient = new ConvexReactClient(convexUrl);

export { ConvexProvider };

