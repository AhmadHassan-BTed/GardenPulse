import { Redirect } from "expo-router";

// SCR-15 Progress Reels Gallery is shared between Profile and Garden tabs
// Actual implementation is at /garden/reels
export default function ProfileReelsRedirect() {
  return <Redirect href="/garden/reels" />;
}