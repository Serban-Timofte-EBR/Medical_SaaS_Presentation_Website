import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  Collapse,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CommentIcon from "@mui/icons-material/Comment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { format } from "date-fns";
import CommentsSection from "./CommentsSection"; // ✅ Ensure this is imported

interface Article {
  id: string;
  title: string;
  summary: string;
  link: string;
  category: string;
  createdAt: string;
}

interface Props {
  article: Article;
  onCommentChange?: () => void;
}

const ArticleCard: React.FC<Props> = ({ article, onCommentChange }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <Card
      sx={{
        maxWidth: "100%",
        mb: 3,
        boxShadow: 3,
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent>
        {/* Category Chip */}
        <Chip
          label={article.category}
          color="primary"
          sx={{
            mb: 1,
            fontWeight: "bold",
            backgroundColor: "#e91e63",
            color: "white",
          }}
        />

        {/* Title */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {article.title}
        </Typography>

        {/* Summary */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {article.summary}
        </Typography>

        {/* Created Date */}
        <Box
          sx={{ display: "flex", alignItems: "center", color: "gray", mb: 2 }}
        >
          <AccessTimeIcon sx={{ fontSize: 18, mr: 1 }} />
          <Typography variant="body2">
            {format(new Date(article.createdAt), "MMM dd, yyyy")}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Actions */}
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="primary"
            endIcon={<OpenInNewIcon />}
            href={article.link}
            target="_blank"
            sx={{
              borderRadius: 50,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Read Full Article
          </Button>

          <Button
            variant="contained"
            color="secondary"
            endIcon={<CommentIcon />}
            onClick={() => setShowComments(!showComments)} // ✅ Toggle comments visibility
            sx={{
              borderRadius: 50,
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "#e91e63",
              "&:hover": { backgroundColor: "#d81b60" },
            }}
          >
            {showComments ? "Hide Comments" : "View Comments"}
          </Button>
        </CardActions>

        {/* Comments Section (Visible Only When Clicked) */}
        <Collapse in={showComments}>
          <CommentsSection
            articleId={article.id}
            onCommentChange={onCommentChange}
          />
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
