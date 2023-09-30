import { Link } from "react-router-dom";
import { useRef } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import CreateWindow from "./CreateWindow";
import TopicWindow from "./TopicWindow";

export default function MainMenu() {
  const createRef = useRef(null);
  const topicRef = useRef(null);

  const openCreateWindow = () => {
    createRef.current.openCreateWindow();
  };

  const openTopicWindow = () => {
    topicRef.current.openTopicWindow();
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
        <Button onClick={openTopicWindow}>Topic</Button>
        <Button>Favorite</Button>
        {/* Only show Create menu selection for verified user */}
        <Button onClick={openCreateWindow}>Create</Button>
      </ButtonGroup>
      <CreateWindow ref={createRef} />
      <TopicWindow ref={topicRef} />
    </Box>
  );
}
