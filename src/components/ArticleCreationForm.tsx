import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const ArticleCreationForm: React.FC = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title || !summary || !link || !category) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, summary, link, category }),
      });

      if (!response.ok) {
        throw new Error("Failed to create article.");
      }

      const data = await response.json();
      alert("Article created successfully");
      setTitle("");
      setSummary("");
      setLink("");
      setCategory("");
      setError("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  if (user?.role !== "ADMIN") {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography>You need admin privileges to create articles.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Create a New Article
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Summary"
        fullWidth
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Link"
        fullWidth
        value={link}
        onChange={(e) => setLink(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Category"
        fullWidth
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create Article
      </Button>
    </Box>
  );
};

export default ArticleCreationForm;
