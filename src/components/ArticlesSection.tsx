import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const ArticlesSection: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3001/articles?page=1&limit=3"
        );
        const data = await response.json();

        if (Array.isArray(data.articles)) {
          setArticles(data.articles); // Set articles from the first page
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleViewAll = () => {
    navigate("/blog"); // Redirect to the /blog page
  };

  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 6 }}>
          Explore Health & Wellness Resources
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {articles.map((article, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    position: "relative",
                    borderRadius: "15px",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    padding: "20px",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#e91e63",
                        mb: 1,
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555", mb: 3 }}>
                      {article.summary}
                    </Typography>

                    <Button
                      variant="outlined"
                      color="primary"
                      href={article.link}
                      target="_blank"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        mt: 2,
                        padding: "10px 20px",
                        borderRadius: "20px",
                        "&:hover": {
                          backgroundColor: "#e91e63",
                          color: "#fff",
                        },
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewAll}
            sx={{
              padding: "10px 20px",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#e91e63",
              },
            }}
          >
            View All Articles
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ArticlesSection;
