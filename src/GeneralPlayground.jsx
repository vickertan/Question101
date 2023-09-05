import { useContext, useEffect, useState } from "react";
import QuestionCollContext from "./QuestionCollContext";
import { getDocs } from "firebase/firestore";
import { Box, MenuItem } from "@mui/material";

export default function GeneralPlayground() {
  const questionColl = useContext(QuestionCollContext);

  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getDocs(questionColl);
        const questions = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setQuestionList(questions);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <Box>
      {questionList.map((question) => (
        <MenuItem key={question.id}>
          <h2>{question.question}</h2>
          <h2>{question.category}</h2>
        </MenuItem>
      ))}
    </Box>
  );
}
