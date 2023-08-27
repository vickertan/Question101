import { Box, Button } from "@mui/material";
import { auth, googleProvider } from "../firebase";
import { signInWithRedirect } from "firebase/auth";

export default function ButtonAppBar() {
  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "lightpink",
        display: "flex",
      }}
    >
      {auth.currentUser ? (
        <Button sx={{ ml: "auto" }}>Icon here</Button>
      ) : (
        <Button sx={{ ml: "auto" }} onClick={signInWithGoogle}>
          Log In
        </Button>
      )}
    </Box>
  );
}
