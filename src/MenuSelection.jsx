import { useRef } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
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
        <Button
          sx={{ border: "solid", height: "10rem", width: "10rem", mb: 2 }}
        >
          Card Icon here
        </Button>
        <Button>Topic</Button>
        <Button>Favorite</Button>

        {/* Only show Create menu selection for verified user */}
        <Button onClick={handleOpen}>Create</Button>
      </ButtonGroup>
      <CreateModal ref={modalRef} />
    </Box>
  );
}
