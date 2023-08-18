import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import CreateModal from "./CreateModal";

export default function MenuSelection() {
  const modalRef = useRef(null);

  const handleOpen = () => {
    modalRef.current.handleOpen();
  };

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
      <CreateModal ref={modalRef} />
    </Box>
  );
}
