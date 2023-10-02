import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import ModalTemplate from "./ModalTemplate";
import QuestionForm from "./QuestionForm";
import TopicForm from "./TopicForm";

export default function MainMenu() {
  const [menuSelection, setMenuSelection] = useState("");

  const modalRef = useRef(null);

  const openModalTemplate = () => {
    modalRef.current.openModalTemplate();
  };

  // Ref to access QuestionForm's child's state
  const questionFormRef = useRef(null);
  const topicFormRef = useRef(null);

  // return true if user has input, or return false if user has no input
  const checkQuestionForm = () => {
    if (
      questionFormRef.current.getUserCategory() ||
      questionFormRef.current.getUserQuestion()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkTopicForm = () => {};

  useEffect(() => {
    if (menuSelection) {
      openModalTemplate();
    }
  }, [menuSelection]);

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
        <Button onClick={() => setMenuSelection("topic")}>Topic</Button>
        <Button>Favorite</Button>
        {/* Only show Create menu selection for verified user */}
        <Button onClick={() => setMenuSelection("create")}>Create</Button>
      </ButtonGroup>

      <ModalTemplate
        ref={menuSelection == "create" ? modalRef : null}
        checkInput={checkQuestionForm}
        setMenuSelection={setMenuSelection}
      >
        <QuestionForm ref={questionFormRef} />
      </ModalTemplate>

      <ModalTemplate
        ref={menuSelection == "topic" ? modalRef : null}
        checkInput={checkTopicForm}
        setMenuSelection={setMenuSelection}
      >
        <TopicForm ref={topicFormRef} />
      </ModalTemplate>
    </Box>
  );
}
