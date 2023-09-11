import { useContext, useEffect, useState } from "react";
import QuestionCollContext from "./QuestionCollContext";
import { getDocs } from "firebase/firestore";
import TinderCard from "react-tinder-card";

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
        console.log("Questions fetched");
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="card-container">
      {questionList.map((question) => (
        <TinderCard key={question.id} className="swipe">
          <div className="card">
            <h2 className="question">{question.question}</h2>
            <p className="category">{question.category}</p>
          </div>
        </TinderCard>
      ))}
    </div>
  );
}
