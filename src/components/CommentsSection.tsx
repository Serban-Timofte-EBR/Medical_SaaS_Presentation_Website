import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useAuth } from "../context/AuthContext"; // ✅ Make sure you have the auth context

interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

interface Props {
  articleId: string;
  onCommentChange?: () => void;
}

const CommentsSection: React.FC<Props> = ({ articleId, onCommentChange }) => {
  const { user } = useAuth(); // ✅ Get logged-in user info
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  // ✅ Fetch comments
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/comments/${articleId}`
      );
      const data = await response.json();
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add Comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ articleId, content: newComment }),
      });

      if (response.ok) {
        setNewComment("");
        fetchComments(); // ✅ Refresh comments
        onCommentChange?.();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // ✅ Edit Comment
  const handleEditComment = async (commentId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content: editContent }),
        }
      );

      if (response.ok) {
        setEditingCommentId(null);
        fetchComments();
        onCommentChange?.();
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // ✅ Delete Comment
  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        fetchComments(); // ✅ Refresh after delete
        onCommentChange?.();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: "#f9f9f9" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Comments
      </Typography>

      {/* Loading Spinner */}
      {loading ? (
        <CircularProgress />
      ) : (
        comments.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              position: "relative",
            }}
          >
            {/* ✅ If editing, show input box */}
            {editingCommentId === comment.id ? (
              <>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={() => handleEditComment(comment.id)}
                  sx={{ mt: 1 }}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body1">{comment.content}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Posted on {new Date(comment.createdAt).toLocaleDateString()}
                </Typography>
              </>
            )}

            {/* ✅ Show "Edit" & "Delete" only for the comment owner or admin */}
            {user && (user.id === comment.userId || user.role === "ADMIN") && (
              <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                {editingCommentId === comment.id ? null : (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditContent(comment.content);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </Box>
            )}
          </Box>
        ))
      )}

      {/* ✅ Only show comment box if user is logged in */}
      {user && (
        <>
          <TextField
            fullWidth
            variant="outlined"
            label="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAddComment}
          >
            Submit
          </Button>
        </>
      )}
    </Box>
  );
};

export default CommentsSection;
