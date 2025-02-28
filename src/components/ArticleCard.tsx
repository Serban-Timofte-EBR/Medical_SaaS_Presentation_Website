import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Collapse,
} from "@mui/material";
import CommentsSection from "./CommentsSection";
import { useAuth } from "../context/AuthContext";

interface Article {
  id: string;
  title: string;
  summary: string;
  link: string;
  category: string;
  createdAt: string;
}

interface ArticleCardProps {
  article: Article;
  onCommentChange: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onCommentChange,
}) => {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5">{article.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {article.summary}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1 }}>
          Category: {article.category}
        </Typography>
        <Typography variant="body2" color="gray">
          Published: {new Date(article.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" href={article.link} target="_blank">
          Read More
        </Button>
        {user && (
          <Button size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide Comments" : "Show Comments"}
          </Button>
        )}
      </CardActions>

      {user && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CommentsSection
            articleId={article.id}
            onCommentChange={onCommentChange}
          />
        </Collapse>
      )}
    </Card>
  );
};

export default ArticleCard;
