import React, { createContext, useContext, useReducer, useCallback } from 'react';
import axios from 'axios';

const ChatContext = createContext();

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
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
      const response = await axios.post('https://tr-chatbot-api.icod.ai/api/v1/query', {
        query: message,
        return_scores: true
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 30000
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
  }, []);

  const addUserMessage = useCallback((message) => {
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        role: 'user',
        content: message
      }
    });
  }, []);

  const value = {
    ...state,
    sendMessage,
    addUserMessage,
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