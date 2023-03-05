import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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

function SignInPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      enqueueSnackbar("You have been logged in", {
        autoHideDuration: 2500,
        preventDuplicate: true,
      });
      navigate("/");
    } catch (error) {
      enqueueSnackbar(error.error_description || error.message, {
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
      >
        Signin with Github
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
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to={"/signup"} variant="body2">
              {"Don't have account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignInPage;
