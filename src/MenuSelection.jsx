import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TransitionsModal from "./CreateModal";

export default function MenuSelection() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
      >
        <Button>Playground</Button>
        <Button onClick={handleOpen}>Create</Button>
      </ButtonGroup>
      <TransitionsModal open={open} handleClose={handleClose} />
    </Box>
  );
}
