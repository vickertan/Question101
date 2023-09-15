import {
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
  createRef,
} from "react";
import QuestionCollContext from "./QuestionCollContext";
import { getDocs } from "firebase/firestore";
import TinderCard from "react-tinder-card";
import PlaygroundButton from "./PlaygroundButton";

export default function GeneralPlayground() {
  const questionColl = useContext(QuestionCollContext);

  const [questionList, setQuestionList] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(questionList.length)
        .fill(0)
        .map((i) => createRef()),
    []
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getDocs(questionColl);
        const questions = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setQuestionList(questions);
        setCurrentIndex(questions.length - 1);
        console.log("Questions fetched");
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, []);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < questionList.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < questionList.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="playground">
      <div className="card-area">
        {questionList.map((question, index) => (
          <div className="card-container" key={question.id}>
            <TinderCard
              ref={childRefs[index]}
              className="card"
              onSwipe={(dir) => swiped(dir, question.question, index)}
              onCardLeftScreen={() => outOfFrame(question.question, index)}
            >
              <h2 className="question">{question.question}</h2>
              <p className="category">{question.category}</p>
            </TinderCard>
          </div>
        ))}
      </div>
      <PlaygroundButton swipe={swipe} goBack={goBack} />
    </div>
  );
}
