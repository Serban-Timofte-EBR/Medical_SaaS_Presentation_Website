import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

const ChatbotPage: React.FC = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!userMessage.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          user_id: "user1",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          `User: ${userMessage}`,
          `Bot: ${data.response}`,
        ]);
        setUserMessage("");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("An error occurred while sending the message");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/chat/history?user_id=user1"
      );
      const data = await response.json();
      if (response.ok) {
        setChatHistory(data.history || []);
      }
    } catch (err) {
      setError("Error fetching chat history");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">
        Chat with the Breast Cancer Support Bot
      </Typography>

      <Box sx={{ mt: 4 }}>
        <TextField
          label="Your Message"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          Send Message
        </Button>
      </Box>

      {loading && <Typography sx={{ mt: 2 }}>Sending...</Typography>}

      {error && <Typography color="error">{error}</Typography>}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Chat History</Typography>
        <Button variant="outlined" onClick={fetchHistory}>
          Fetch Chat History
        </Button>
        <Box sx={{ mt: 2 }}>
          {chatHistory.map((message, index) => (
            <Typography key={index} sx={{ wordWrap: "break-word" }}>
              {message}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ChatbotPage;
