import { Box } from "@mui/material";
import MainMenu from "./MainMenu";
import AppBar from "./AppBar";

export default function HomePage() {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <h1>Question 101</h1>
      <MainMenu />
    </Box>
  );
}
