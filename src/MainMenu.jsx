import { Link } from "react-router-dom";
import { useRef } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import CreateWindow from "./CreateWindow";

export default function MainMenu() {
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
        <Link to="/playground">
          <Button
            sx={{ border: "solid", height: "10rem", width: "10rem", mb: 2 }}
          >
            Card Icon here
          </Button>
        </Link>
        <Button>Topic</Button>
        <Button>Favorite</Button>

        {/* Only show Create menu selection for verified user */}
        <Button onClick={handleOpen}>Create</Button>
      </ButtonGroup>
      <CreateWindow ref={modalRef} />
    </Box>
  );
}
