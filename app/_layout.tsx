// import { ResizeMode, Video } from 'expo-av';
import { Stack } from "expo-router";
import "./global.css";


export default function RootLayout() {
  
  return (
      <Stack >
        <Stack.Screen  name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />        
        <Stack.Screen name="about" options={{ headerShown: false }} />        
        <Stack.Screen name="accounts" options={{ headerShown: false }} />        
        <Stack.Screen name="delivery" options={{ headerShown: false }} />
      </Stack>
  );
}

