import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAIResponse = createAsyncThunk(
  "chat/fetchAIResponse",
  async (messages, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://gen-ai-assistant.vercel.app/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages }),
        }
      );

      const data = await response.json();
      return data.reply; // { role: "assistant", content: "..." }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    activeChatId: null,
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setChatId: (state, action) => {
      state.activeChatId = action.payload;
    },
    resetChat: (state) => {
      state.messages = [];
      state.loading = false;
      state.error = null;
      // Don't touch activeChatId here ❌
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAIResponse.fulfilled, (state, action) => {
        state.messages.push(action.payload); // { role: "assistant", content: "..." }
        state.loading = false;
      })
      .addCase(fetchAIResponse.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setMessages, addMessage, setChatId, resetChat } =
  chatSlice.actions;
export default chatSlice.reducer;
