import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Button,
  Box,
  Container,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { supabase } from "../config/supabase";
import { useAuth } from "../hooks/Auth";

function SingUpPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const inputHandler = (e) => {
    e.target.name === "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: import.meta.env.VITE_SUPABASE_URL,
        },
      });
      if (error) throw error;
      setEmail("");
      setPassword("");
      enqueueSnackbar("Check your mail inbox for verification", {
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
    } catch (error) {
      enqueueSnackbar(error.error_description || error.message, {
        autoHideDuration: 2000,
        preventDuplicate: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return user ? (
    <Navigate replace to="/" />
  ) : (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Button
        variant="contained"
        startIcon={<GitHub />}
        fullWidth
        href="#"
        sx={{
          mb: 4,
          backgroundColor: "#212121",
          "&:hover": {
            backgroundColor: "#424242",
          },
        }}
        disabled={loading ? true : false}
      >
        Signup with Github
      </Button>
      <Box
        sx={{
          height: "1px",
          width: "100%",
          bgcolor: "gray",
        }}
      ></Box>
      <Box component="form" sx={{ mt: 3 }} onSubmit={submitHandler}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          size="small"
          value={email}
          onChange={inputHandler}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          size="small"
          value={password}
          onChange={inputHandler}
        />
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{
            mt: 3,
            mb: 2,
            color: "#212121",
            border: "solid 1px #212121",
            "&:hover": {
              color: "white",
              border: "solid 1px #212121",
              backgroundColor: "#212121",
            },
          }}
          disabled={loading ? true : false}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to={"/signin"} variant="body2">
              {"Already have account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SingUpPage;
