import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const MessageBox = styled(Box)(({ theme }) => ({
  padding: "15px 20px",
  marginBottom: "10px",
  borderRadius: "10px",
  backgroundColor: theme.palette.grey[200],
  maxWidth: "80%",
  wordWrap: "break-word",
}));

const UserMessage = styled(MessageBox)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  marginLeft: "auto",
  marginRight: 0,
}));

const BotMessage = styled(MessageBox)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  color: "black",
  marginLeft: 0,
  marginRight: "auto",
}));

// Define the message structure
interface ChatMessage {
  sender: "user" | "bot";
  message: string;
}

const ChatbotPage: React.FC = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedClinic, setSelectedClinic] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [scheduling, setScheduling] = useState(false);

  const clinics = [
    {
      name: "Regina Maria",
      slots: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
    },
    {
      name: "Enayaty",
      slots: ["09:00 AM", "12:00 PM", "01:00 PM", "04:00 PM"],
    },
  ];

  const handleSubmit = async () => {
    if (!userMessage.trim()) {
      return;
    }

    setLoading(true);
    try {
      // If the message contains "schedule appointment", handle separately
      if (userMessage.toLowerCase().includes("schedule appointment")) {
        setScheduling(true);
        return;
      }

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
          { sender: "user", message: userMessage },
          { sender: "bot", message: data.response },
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

  const handleClinicChange = (event: SelectChangeEvent<string>) => {
    setSelectedClinic(event.target.value);
    setSelectedTimeSlot("");
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeSlotChange = (event: SelectChangeEvent<string>) => {
    setSelectedTimeSlot(event.target.value);
  };

  const handleScheduleAppointment = () => {
    if (!selectedClinic || !selectedDate || !selectedTimeSlot) {
      setError("Please select a clinic, date, and time slot.");
    } else {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          sender: "user",
          message: `I want to schedule at ${selectedClinic} on ${selectedDate} at ${selectedTimeSlot}`,
        },
        {
          sender: "bot",
          message: `Your appointment at ${selectedClinic} on ${selectedDate} at ${selectedTimeSlot} has been scheduled!`,
        },
      ]);
      setScheduling(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Chat with the Breast Cancer Support Bot
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          label="Your Message"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ width: "100%" }}
        >
          Send Message
        </Button>
      </Box>

      {loading && (
        <Typography sx={{ mt: 2, textAlign: "center" }}>Sending...</Typography>
      )}

      {error && (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Chat History
        </Typography>
        <Box
          sx={{
            maxHeight: 300,
            overflowY: "scroll",
            padding: "10px",
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
          }}
        >
          {chatHistory.map((message, index) =>
            message.sender === "user" ? (
              <UserMessage key={index}>{message.message}</UserMessage>
            ) : (
              <BotMessage key={index}>{message.message}</BotMessage>
            )
          )}
        </Box>
      </Box>

      {scheduling && (
        <Box
          sx={{
            mt: 4,
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Schedule Your Appointment
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Clinic</InputLabel>
            <Select value={selectedClinic} onChange={handleClinicChange}>
              <MenuItem value="Regina Maria">Regina Maria</MenuItem>
              <MenuItem value="Enayaty">Enayaty</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Select Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={selectedDate}
            onChange={handleDateChange}
            sx={{ mb: 2 }}
          />

          {selectedClinic && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Time Slot</InputLabel>
              <Select value={selectedTimeSlot} onChange={handleTimeSlotChange}>
                {clinics
                  .find((clinic) => clinic.name === selectedClinic)
                  ?.slots.map((slot, index) => (
                    <MenuItem key={index} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleScheduleAppointment}
            sx={{ mt: 2 }}
          >
            Confirm Appointment
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ChatbotPage;
