import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Pagination,
  Container,
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

  return (
    <Container sx={{ mt: 4 }}>
      <Filters
        selectedCategory={category}
        searchTerm={search}
        onFilterChange={setCategory}
        onSearchChange={setSearch}
      />

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
    </Container>
  );
};

export default ArticlesPage;
