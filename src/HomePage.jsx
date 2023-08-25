import { Box } from "@mui/material";
import MenuSelection from "./MenuSelection";
import AppBar from "./AppBar";

export default function HomePage() {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <AppBar />
      <h1>Question 101</h1>
      <MenuSelection />
    </Box>
  );
}
