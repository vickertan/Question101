import { Link } from "react-router-dom";
import { useRef } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import ModalTemplate from "./ModalTemplate";
import QuestionForm from "./QuestionForm";

export default function MainMenu() {
  const modalRef = useRef(null);

  const openModalTemplate = () => {
    modalRef.current.openModalTemplate();
  };

  // Ref to access QuestionForm's child's state
  const questionFormRef = useRef(null);

  // return if user has input, or return false if user has no input
  const checkQuestionFormInput = () => {
    if (
      questionFormRef.current.getUserCategory() ||
      questionFormRef.current.getUserQuestion()
    ) {
      return true;
    } else {
      return false;
    }
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
        <Button onClick={openModalTemplate}>Create</Button>
      </ButtonGroup>
      <ModalTemplate ref={modalRef} checkInput={checkQuestionFormInput}>
        <QuestionForm ref={questionFormRef} />
      </ModalTemplate>
    </Box>
  );
}
