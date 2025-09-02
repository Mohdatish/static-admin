"use client";

import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

export default function Dashboard() {
  // Mock summary data
  const summary = {
    totalLoans: 250,
    activeLoans: 180,
    topUpsPending: 10,
    disbursementFailures: 5,
    restructuringRequests: 8,
    defaulters: 12,
  };

  return (
    <Box p={1}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(summary).map(([key, value]) => (
          <Grid size={{ xs: 6, md: 3 }} key={key}>
            <Card sx={{boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px'}}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Typography>
                <Typography variant="h6">{value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
