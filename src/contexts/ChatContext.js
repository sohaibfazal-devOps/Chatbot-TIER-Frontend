import React, { createContext, useContext, useReducer, useCallback } from 'react';
import axios from 'axios';

const ChatContext = createContext();

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
  activeExpert: 'treaty', // 'treaty' or 'claims'
};

// Define endpoints for different experts
const EXPERT_ENDPOINTS = {
  treaty: 'http://tr-assistant-api.mammoth-ai.dev//api/v1/query', // Treaty Submission Expert
  claims: 'http://tr-assistant-api.mammoth-ai.dev//api/v1/chatbot-v4', // Claims Expert (you can change this endpoint)
};

function chatReducer(state, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_ACTIVE_EXPERT':
      return {
        ...state,
        activeExpert: action.payload,
        messages: [], // Clear messages when switching experts
        error: null,
      };
    default:
      return state;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const sendMessage = useCallback(async (message) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const endpoint = EXPERT_ENDPOINTS[state.activeExpert];
      const response = await axios.post(endpoint, {
        query: message,
        return_scores: true
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data && response.data.answer) {
        dispatch({
          type: 'ADD_MESSAGE',
          payload: {
            role: 'assistant',
            content: response.data.answer,
            source: response.data.sources ? response.data.sources[0] : null
          }
        });
      } else {
        throw new Error('Invalid response format: missing answer field');
      }
    } catch (error) {
      let errorMessage = 'Sorry, I encountered an error. ';
      
      if (error.response) {
        errorMessage += `Server responded with status ${error.response.status}. `;
        if (error.response.data && error.response.data.detail) {
          errorMessage += error.response.data.detail;
        }
      } else if (error.request) {
        errorMessage += 'No response from server. Please check if the API is running.';
      } else if (error.message) {
        errorMessage += error.message;
      }

      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.activeExpert]);

  const addUserMessage = useCallback((message) => {
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        role: 'user',
        content: message
      }
    });
  }, []);

  const setActiveExpert = useCallback((expert) => {
    dispatch({ type: 'SET_ACTIVE_EXPERT', payload: expert });
  }, []);

  const value = {
    ...state,
    sendMessage,
    addUserMessage,
    setActiveExpert,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 