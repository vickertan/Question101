import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import ModalTemplate from "./ModalTemplate";
import QuestionForm from "./QuestionForm";
// import TopicForm from "./TopicForm";

export default function MainMenu({ user }) {
  const navigate = useNavigate();

  const [menuSelection, setMenuSelection] = useState("");

  const modalRef = useRef(null);

  const openModalTemplate = () => {
    modalRef.current.openModalTemplate();
  };

  // Ref to access QuestionForm's child's state
  const questionFormRef = useRef(null);

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

  const checkTopicForm = () => {
    return true;
  };

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
        <Button
          sx={{ border: "solid", height: "10rem", width: "10rem", mb: 2 }}
          onClick={() => navigate("/playground")}
        >
          Card Icon here
        </Button>
        <Button onClick={() => setMenuSelection("comingSoon")}>Topic</Button>
        <Button onClick={() => setMenuSelection("comingSoon")}>Favorite</Button>
        {/* Only show Create menu selection for verified user */}
        {user.uid == "OksZAvSiLtS0AfyzpTxzk8vhyx52" ? (
          <Button onClick={() => setMenuSelection("create")}>Create</Button>
        ) : null}
      </ButtonGroup>

      <ModalTemplate
        ref={menuSelection == "create" ? modalRef : null}
        hasUserInput={checkQuestionForm}
        setMenuSelection={setMenuSelection}
      >
        <QuestionForm ref={questionFormRef} />
      </ModalTemplate>

      {/* <ModalTemplate
        ref={menuSelection == "topic" ? modalRef : null}
        hasUserInput={checkTopicForm}
        setMenuSelection={setMenuSelection}
      >
        <TopicForm ref={topicFormRef} />
      </ModalTemplate> */}

      <ModalTemplate
        ref={menuSelection == "comingSoon" ? modalRef : null}
        hasUserInput={() => {
          return false;
        }}
        setMenuSelection={setMenuSelection}
      >
        <h1 style={{ textAlign: "center" }}>Coming Soon</h1>
      </ModalTemplate>
    </Box>
  );
}
