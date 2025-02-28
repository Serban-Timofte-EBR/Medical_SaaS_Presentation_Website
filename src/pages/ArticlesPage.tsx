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
      const response = await fetch(
        `http://localhost:3001/articles?${
          category !== "All" ? `category=${category}&` : ""
        }page=${page}`
      );
      const data: Article[] = await response.json();

      console.log("Fetched Data:", data);

      if (!Array.isArray(data)) {
        console.error("Unexpected API response format");
        return;
      }

      setArticles(data);
      setTotalPages(1);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [category, page]);

  useEffect(() => {
    console.log("Fetching articles...");
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    console.log("Articles state updated:", articles);
  }, [articles]);

  const handleCommentChange = () => {
    fetchArticles();
  };

  return (
    <Container sx={{ py: 4 }}>
      <Filters
        selectedCategory={category}
        searchTerm={search}
        onFilterChange={setCategory}
        onSearchChange={setSearch}
      />

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : articles.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No articles found.
        </Typography>
      ) : (
        <Box sx={{ mt: 4 }}>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onCommentChange={handleCommentChange}
            />
          ))}
        </Box>
      )}

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        />
      )}
    </Container>
  );
};

export default ArticlesPage;
