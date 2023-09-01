import { Box, TextField, MenuItem, Button } from "@mui/material";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext,
  useEffect,
} from "react";
import { addDoc } from "firebase/firestore";
import QuestionCollContext from "./QuestionCollContext";

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
        label="Category"
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
  const questionColl = useContext(QuestionCollContext);

  const categoryInputRef = useRef(null);
  const questionInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getUserCategory: () => {
      categoryInputRef.current.getUserCategory();
    },
    getUserQuestion: () => {
      questionInputRef.current.getUserQuestion();
    },
  }));

  const submitQuestion = async () => {
    try {
      await addDoc(questionColl, {
        category: categoryInputRef.current.getUserCategory(),
        question: questionInputRef.current.getUserQuestion(),
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
          // Bug: categoryInput.current.getUserCategory & questionInputRef.current.getUserQuestion will always return null
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
