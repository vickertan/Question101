import { Box, TextField, MenuItem, Button } from "@mui/material";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const categories = ["Deep Thought", "Romance", "Food", "Fun", "This or That"];

const CategoryInput = forwardRef(function CategoryInput(props, ref) {
  const [userCategory, setUserCategory] = useState("");

  useImperativeHandle(ref, () => ({
    getUserCategory: () => {
      return userCategory;
    },
    reset: () => {
      setUserCategory("");
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <CategoryRoundedIcon sx={{ color: "action.active", mr: 2, my: "auto" }} />
      <TextField
        sx={{ width: 200 }}
        select
        label="Topic"
        onChange={(e) => setUserCategory(e.target.value)}
        value={userCategory}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
});

const QuestionInput = forwardRef(function QuestionInput(props, ref) {
  const [userQuestion, setUserQuestion] = useState("");

  useImperativeHandle(ref, () => ({
    getUserQuestion: () => {
      return userQuestion;
    },
    reset: () => {
      setUserQuestion("");
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        my: 1,
        width: 1,
      }}
    >
      <QuestionAnswerRoundedIcon
        sx={{ color: "action.active", mr: 2.5, my: 0.5 }}
      />
      <TextField
        autoComplete="off"
        id="user-question"
        label="Your question here..."
        variant="standard"
        value={userQuestion}
        onChange={(e) => setUserQuestion(e.target.value)}
      />
    </Box>
  );
});

const QuestionForm = forwardRef((props, ref) => {
  const categoryInputRef = useRef(null);
  const questionInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getUserCategory: () => {
      return categoryInputRef.current.getUserCategory();
    },
    getUserQuestion: () => {
      return questionInputRef.current.getUserQuestion();
    },
  }));

  const submitQuestion = async () => {
    const question = questionInputRef.current.getUserQuestion();

    try {
      await setDoc(doc(db, "questions", question), {
        category: categoryInputRef.current.getUserCategory(),
        favoritedBy: [],
      });
      console.log("Data submitted");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <h1>Question Creating</h1>
      <CategoryInput ref={categoryInputRef} />
      <QuestionInput ref={questionInputRef} />
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        endIcon={<UploadRoundedIcon />}
        onClick={() => {
          if (
            categoryInputRef.current.getUserCategory() &&
            questionInputRef.current.getUserQuestion()
          ) {
            submitQuestion();
            categoryInputRef.current.reset();
            questionInputRef.current.reset();
          } else {
            console.log("Input error");
          }
        }}
      >
        Upload
      </Button>
    </Box>
  );
});

export default QuestionForm;
