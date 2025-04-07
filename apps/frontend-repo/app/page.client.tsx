"use client";

import type React from "react";

import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  NavigationOffIcon as VisibilityOff,
  ViewIcon as Visibility,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loginRequest, registerRequest } from "@/store/actions";
import { useToast } from "@/components/toaster";
import { useRouter } from "next/navigation";

export default function Client() {
  const { showToast } = useToast();
  const router = useRouter();

  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const selector = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      loginRequest({
        email: loginEmail,
        password: loginPassword,
      })
    )
      .unwrap()
      .then(() => {
        router.push("/users");
      })
      .catch((error: string) => {
        showToast(error, "error");
      });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      registerRequest({
        email: registerEmail,
        password: registerPassword,
      })
    )
      .unwrap()
      .then(() => {
        showToast("Registration successful", "success");
        setTabValue(0);
      })
      .catch((error: string) => {
        showToast(error, "error");
      });
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%" }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Typography
            component={motion.h1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variant="h4"
            align="center"
            gutterBottom
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Welcome
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              TabIndicatorProps={{
                sx: {
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                },
              }}
            >
              <Tab
                label={
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.div>
                }
                id="login-tab"
              />
              <Tab
                label={
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.div>
                }
                id="register-tab"
              />
            </Tabs>
          </Box>

          {/* Login Tab */}
          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleLoginSubmit}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="login-email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff size={20} />
                          ) : (
                            <Visibility size={20} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={selector.isLoading}
                  sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
                >
                  Sign In
                </Button>
              </motion.div>
            </form>
          </TabPanel>

          {/* Register Tab */}
          <TabPanel value={tabValue} index={1}>
            <form onSubmit={handleRegisterSubmit}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="register-email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="register-password"
                  autoComplete="new-password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff size={20} />
                          ) : (
                            <Visibility size={20} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
                >
                  Create Account
                </Button>
              </motion.div>
            </form>
          </TabPanel>
        </Paper>
      </motion.div>
    </Container>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ paddingTop: 16 }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
