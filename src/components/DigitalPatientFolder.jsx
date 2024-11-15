import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { pink, green, red, grey, blueGrey } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";

const consultations = [
  {
    date: "2024-10-14",
    kpi: { ER: "Positive", PR: "Negative", HER2: "Positive", Ki67: "30%" },
    histology: "Invasive Ductal Carcinoma, Grade 2",
    treatment: `
      Chemotherapy: Session 3 of 6.
      Patient is receiving doxorubicin (Adriamycin) and cyclophosphamide (AC) therapy.
      Plan to administer taxane-based therapy (Paclitaxel) after completion of the current cycle.
      Regular hydration and anti-nausea medications prescribed to manage side effects.
      Blood work reviewed—slight drop in white blood cell count (WBC), but within tolerable range for chemotherapy continuation.
    `,
    notes: `
      Patient is responding well to treatment with notable tumor reduction on imaging, approximately 30% decrease in tumor size.
      Side effects include moderate fatigue, occasional nausea, and alopecia (hair loss).
      Physical exam reveals no signs of significant edema or infection. Blood pressure and heart rate stable.
      Recommend continuation of chemotherapy regimen with close monitoring of blood cell counts. Next imaging scan scheduled after the fourth session to reassess tumor progression.
      Psychological support recommended as the patient is showing signs of anxiety about the side effects and long-term prognosis. Referral made to the oncology counselor.
    `,
    documents: [{ name: "MRI Report.pdf", url: "#" }],
  },
  {
    date: "2024-07-10",
    kpi: { ER: "Positive", PR: "Positive", HER2: "Negative", Ki67: "25%" },
    histology: "Lobular Carcinoma, Grade 1",
    treatment: `
      Hormonal Therapy: Ongoing with Tamoxifen 20 mg daily.
      Treatment plan to continue for 5 years due to positive ER/PR status.
      Annual mammograms and semi-annual ultrasounds scheduled for monitoring.
      Calcium and vitamin D supplements prescribed to support bone health, considering long-term hormone therapy.
      Consider switching to aromatase inhibitor (Letrozole) after 2 years depending on tolerance and efficacy.
    `,
    notes: `
      Patient remains in stable condition, with no significant changes since the last visit.
      Blood tests within normal ranges, including liver function tests (LFT) and kidney function (eGFR).
      Physical exam reveals no palpable masses in the breast or axillary region. Mammogram results from June 2024 show no new lesions.
      The patient reports minimal side effects, primarily mild hot flashes and some joint stiffness, likely related to Tamoxifen.
      Plan to continue current therapy with regular monitoring. Reassurance provided regarding the excellent prognosis given the early-stage diagnosis and good response to therapy.
    `,
    documents: [{ name: "Blood Test.pdf", url: "#" }],
  },
  {
    date: "2024-04-22",
    kpi: { ER: "Negative", PR: "Negative", HER2: "Positive", Ki67: "40%" },
    histology: "Triple-Negative Breast Cancer, Grade 3",
    treatment: `
      Chemotherapy: Initial diagnosis, starting neoadjuvant chemotherapy.
      Patient to receive carboplatin and paclitaxel on a weekly schedule for 12 weeks, followed by assessment for surgical options.
      Potential mastectomy post-chemotherapy depending on response. Breast-conserving surgery is unlikely due to tumor size and aggressive nature of the cancer.
      Patient offered participation in a clinical trial involving immunotherapy (PD-L1 inhibitor) in combination with chemotherapy. Decision pending.
      Discussed fertility preservation options prior to the start of chemotherapy, as patient is premenopausal.
    `,
    notes: `
      Initial diagnosis of Triple-Negative Breast Cancer confirmed via biopsy. The tumor measures 3.5 cm in diameter and is highly aggressive, with a Ki67 index of 40%.
      The patient is understandably anxious but remains determined to proceed with treatment.
      Genetic testing for BRCA1/BRCA2 has been ordered due to the aggressive nature of the cancer and family history.
      Discussed the importance of early intervention and the potential role of immunotherapy in future treatment plans.
      Patient was given educational materials about chemotherapy side effects, including hair loss, nausea, and increased infection risk. Follow-up scheduled after the first round of chemotherapy to assess tolerance and early response.
    `,
    documents: [{ name: "Biopsy Report.pdf", url: "#" }],
  },
];

const DigitalPatientFolder = () => {
  const [expanded, setExpanded] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleDownloadClick = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const renderKPIRow = (label, value) => {
    const isNumeric = !isNaN(Number(value));
    const isCritical =
      value === "Positive" || (isNumeric && parseInt(value) > 30);
    return (
      <TableRow>
        <TableCell>{label}</TableCell>
        <TableCell sx={{ color: isCritical ? red[500] : green[500] }}>
          {value}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <section id="medical-records">
      <Box sx={{ py: 8, backgroundColor: "#f3f3f3" }}>
        <Container>
          <Typography
            variant="h4"
            sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
          >
            Digital Patient Folder
          </Typography>

          <Grid container spacing={4}>
            {consultations.map((consult, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    borderRadius: "16px",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    },
                    backgroundColor: "#fff",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: `4px solid ${pink[500]}`,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {/* Sidebar Accent */}
                      <Box
                        sx={{
                          width: "5px",
                          height: "100%",
                          backgroundColor: pink[500],
                          mr: 2,
                        }}
                      />
                      <Box>
                        {/* Consultation Title */}
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            color: grey[900],
                          }}
                        >
                          Consultation {index + 1}
                        </Typography>
                        {/* Date */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: blueGrey[600],
                            fontStyle: "italic",
                            mt: 1,
                          }}
                        >
                          Date: {consult.date}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>

                  <CardContent
                    sx={{
                      padding: "16px",
                      backgroundColor: blueGrey[50],
                    }}
                  >
                    {/* Histology */}
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color: grey[800],
                        fontSize: "1.1rem",
                      }}
                    >
                      {consult.histology}
                    </Typography>
                  </CardContent>

                  <CardActions disableSpacing>
                    <IconButton
                      onClick={() => handleExpandClick(index)}
                      aria-expanded={expanded === index}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>

                  <Collapse
                    in={expanded === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Key Biomarkers
                      </Typography>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableBody>
                            {renderKPIRow("ER", consult.kpi.ER)}
                            {renderKPIRow("PR", consult.kpi.PR)}
                            {renderKPIRow("HER2", consult.kpi.HER2)}
                            {renderKPIRow("Ki67", consult.kpi.Ki67)}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Typography variant="h6" sx={{ mt: 4 }}>
                        Treatment Plan
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ mb: 2, color: grey[800] }}
                      >
                        {consult.treatment}
                      </Typography>

                      <Typography variant="h6" sx={{ mt: 4 }}>
                        Doctor's Notes
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ mb: 2, color: grey[800] }}
                      >
                        {consult.notes}
                      </Typography>

                      <Typography variant="h6" sx={{ mt: 4 }}>
                        Documents
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {consult.documents.map((doc, idx) => (
                          <Button
                            key={idx}
                            startIcon={<DownloadIcon />}
                            sx={{
                              textAlign: "left",
                              justifyContent: "flex-start",
                              mb: 1,
                              color: pink[500],
                            }}
                            onClick={handleDownloadClick}
                          >
                            {doc.name}
                          </Button>
                        ))}
                      </Box>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Snackbar for mock download message */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="info"
              sx={{ width: "100%" }}
            >
              This is a mock design, the document will not be downloaded.
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </section>
  );
};

export default DigitalPatientFolder;
