import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Pagination,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import Filters from "../components/Filters";
import ArticleCard from "../components/ArticleCard";
import { useAuth } from "../context/AuthContext";

interface Article {
  id: string;
  title: string;
  summary: string;
  link: string;
  category: string;
  createdAt: string;
}

const ArticlesPage: React.FC = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [link, setLink] = useState("");
  const [categoryModal, setCategoryModal] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const categoryParam = category === "All" ? "" : `&category=${category}`;
      const response = await fetch(
        `http://localhost:3001/articles?page=${page}${categoryParam}`
      );
      const data = await response.json();

      console.log("Fetched Data:", data);

      if (!data || !Array.isArray(data.articles)) {
        console.error("Invalid API response format!", data);
        return;
      }

      setArticles(data.articles);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [category, page]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Handle the modal opening/closing
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(""); // Reset error on close
  };

  const handleSubmit = async () => {
    if (!title || !summary || !link || !categoryModal) {
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
        body: JSON.stringify({ title, summary, link, category: categoryModal }),
      });

      if (!response.ok) {
        throw new Error("Failed to create article.");
      }

      // Refresh the articles and show the confirmation message
      await fetchArticles();

      // Show success message
      setSnackbarMessage("Article created successfully.");
      setSnackbarOpen(true);

      // Reset form and close modal
      setTitle("");
      setSummary("");
      setLink("");
      setCategoryModal("");
      handleClose();
      setError("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Filter and search components */}
      <Filters
        selectedCategory={category}
        searchTerm={search}
        onFilterChange={setCategory}
        onSearchChange={setSearch}
      />

      {/* Show Create Article button only if the user is admin */}
      {user?.role === "ADMIN" && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Create Article
          </Button>
        </Box>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : articles.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No articles found.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 3,
            mt: 4,
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Box>
      )}

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => {
              console.log("Changing page to:", value);
              setPage(value);
            }}
            sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          />
        </Box>
      )}

      {/* Modal for creating articles */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Article</DialogTitle>
        <DialogContent>
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
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={categoryModal}
              onChange={(e) => setCategoryModal(e.target.value)}
            >
              <MenuItem value="Oncology Research">Oncology Research</MenuItem>
              <MenuItem value="Patient Care">Patient Care</MenuItem>
              <MenuItem value="AI in Medicine">AI in Medicine</MenuItem>
              <MenuItem value="Medical Breakthroughs">
                Medical Breakthroughs
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ArticlesPage;
