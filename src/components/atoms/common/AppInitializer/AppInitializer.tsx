"use client";

import { useAppInitializer } from "@/hooks/useAppInitializer";

// This component has no UI, it just runs the initialization hook
export const AppInitializer = () => {
  useAppInitializer();
  return null;
};
