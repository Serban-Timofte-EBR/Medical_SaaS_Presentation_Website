import React from "react";
import { Box, Container, Typography } from "@mui/material";

const TypeformEmbed = () => {
  return (
    <section id="contact">
      <Box sx={{ py: 10, backgroundColor: "#f9f9f9" }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", mb: 6 }}
          >
            Get Started with E-OncoHub
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 4, color: "#777", maxWidth: "600px", margin: "auto" }}
          >
            Please fill out the form below to register your hospital or clinic,
            and one of our representatives will contact you soon to offer you
            more details.
          </Typography>

          {/* Embed the Typeform using an iframe */}
          <Box sx={{ width: "100%", height: "700px", mt: 4 }}>
            <iframe
              src="https://7lw5h0kp3x2.typeform.com/to/d2e6OqZS"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Registration Form"
              allow="camera; microphone; autoplay; encrypted-media;"
            ></iframe>
          </Box>
        </Container>
      </Box>
    </section>
  );
};

export default TypeformEmbed;
