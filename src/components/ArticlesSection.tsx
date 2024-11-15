import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const articles = [
  {
    title: "10 Ways to Prevent Cancer",
    description:
      "Explore actionable tips and lifestyle changes that can help reduce your risk of developing cancer.",
    link: "https://www.health.harvard.edu/newsletter_article/the-10-commandments-of-cancer-prevention",
    category: "Cancer Prevention",
  },
  {
    title: "Understanding Breast Cancer",
    description:
      "Learn about the basics of breast cancer, from risk factors to treatment options, and stay informed.",
    link: "https://www.cancer.org/cancer/types/breast-cancer/understanding-a-breast-cancer-diagnosis.html",
    category: "Breast Cancer",
  },
  {
    title: "Living a Healthy Life",
    description:
      "Healthy living can improve your overall well-being. Discover how good habits can support cancer prevention.",
    link: "https://www.cdc.gov/healthy-weight-growth/healthy-eating/?CDC_AAref_Val=https://www.cdc.gov/healthyweight/healthy_eating/index.html",
    category: "Healthy Living",
  },
];

const ArticlesSection: React.FC = () => {
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
                    {article.description}
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
      </Container>
    </Box>
  );
};

export default ArticlesSection;
