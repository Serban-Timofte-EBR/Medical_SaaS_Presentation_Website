import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2e2e2e",
        color: "#fff",
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Section: Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              E-OncoHub
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Empowering oncologists with AI-driven insights to deliver the best
              patient care. E-OncoHub is your trusted partner in modern oncology
              solutions.
            </Typography>
          </Grid>

          {/* Center Section: Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" sx={{ display: "block", mb: 1 }}>
              Home
            </Link>
            <Link href="#features" color="inherit" sx={{ display: "block", mb: 1 }}>
              Features
            </Link>
            <Link href="#contact" color="inherit" sx={{ display: "block", mb: 1 }}>
              Contact Us
            </Link>
          </Grid>

          {/* Right Section: Social Media */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="inherit" href="https://www.linkedin.com/company/e-oncohub/">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} E-OncoHub. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
