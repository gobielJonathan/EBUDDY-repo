"use client"
import { Box, Button, Container, Typography, Paper, Divider, useTheme, useMediaQuery } from "@mui/material"
import { LockOutlined as LockIcon, Home as HomeIcon, Login as LoginIcon } from "@mui/icons-material"
import { useRouter } from "next/navigation"

export default function Unauthorized() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const router = useRouter()

  const handleLogin = () => {
    router.push("/")
  }

  const handleHome = () => {
    router.push("/users")
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: "error.main",
              color: "error.contrastText",
              borderRadius: "50%",
              p: 2,
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LockIcon fontSize={isMobile ? "medium" : "large"} />
          </Box>

          <Typography variant={isMobile ? "h4" : "h3"} component="h1" gutterBottom align="center">
            401 Unauthorized
          </Typography>

          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
            You don't have permission to access this resource. Please log in with appropriate credentials.
          </Typography>

          <Divider sx={{ width: "100%", mb: 3 }} />

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
            If you believe this is an error, please contact the system administrator or try logging in again.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              width: "100%",
              maxWidth: "sm",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              startIcon={<HomeIcon />}
              onClick={handleHome}
              fullWidth={isMobile}
            >
              Back to Home
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              onClick={handleLogin}
              fullWidth={isMobile}
            >
              Log In
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

