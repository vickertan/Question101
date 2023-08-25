import { Box, Button } from "@mui/material";

export default function ButtonAppBar() {
  return (
    <Box
      sx={{
        backgroundColor: "lightpink",
        display: "flex",
        flex: "1 1 0%",
      }}
    >
      <Button sx={{ ml: "auto" }}>Log In</Button>
    </Box>
  );
}
