import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../context/AuthContext";

interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
}

interface CommentsSectionProps {
  articleId: string;
  onCommentChange: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  articleId,
  onCommentChange,
}) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/comments/${articleId}`
      );
      const data: Comment[] = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ articleId, content: newComment }),
      });

      setNewComment("");
      onCommentChange(); // ✅ Update comments in real time
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/comments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      onCommentChange();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async () => {
    if (!editingContent.trim() || !editingId) return;
    try {
      await fetch(`http://localhost:3001/comments/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: editingContent }),
      });

      setEditingId(null);
      setEditingContent("");
      onCommentChange();
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        comments.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              mb: 2,
              p: 2,
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            {editingId === comment.id ? (
              <>
                <TextField
                  fullWidth
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <Button onClick={handleEditComment} sx={{ mt: 1 }}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography>{comment.content}</Typography>
                <Typography variant="caption" color="gray">
                  {new Date(comment.createdAt).toLocaleString()}
                </Typography>

                {user && user.id === comment.userId && (
                  <>
                    <IconButton
                      onClick={() => {
                        setEditingId(comment.id);
                        setEditingContent(comment.content);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteComment(comment.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </>
            )}
          </Box>
        ))
      )}

      {user && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleAddComment} sx={{ mt: 1 }}>
            Post Comment
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CommentsSection;
