'use client';

import { useEffect, useRef } from 'react';
import '@n8n/chat/style.css';

export default function ChatBot() {
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React Strict Mode
    if (isInitialized.current) return;
    
    isInitialized.current = true;

    // Dynamically import the createChat function
    import('@n8n/chat').then(({ createChat }) => {
      createChat({
        // Replace with your actual webhook URL from n8n
        webhookUrl: 'https://avion-n8n-chatbot.onrender.com/webhook/85c66462-4128-49d3-a1bb-9a51955eadf8/chat',

        // webhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
        
        // Chat will appear as a floating button
        mode: 'window',
        
        // Show welcome message
        showWelcomeScreen: true,
        
        // Initial messages when chat opens
        initialMessages: [
          'Hi! 👋',
          'Welcome to our store! How can I help you today?'
        ],
        
        // Customize colors (optional)
        theme: {
          primaryColor: '#3b82f6', // blue color
        },
        
        // Allow file uploads (optional)
        allowFileUploads: false,
        
        // Load previous conversation (optional)
        loadPreviousSession: false,
      });
    });
  }, []); // Empty dependency array means this runs once

  return null; // No need to render anything, chat mounts itself
}