import { useState, useMemo, useRef, createRef } from "react";
import TinderCard from "react-tinder-card";
import PlaygroundButton from "./PlaygroundButton";

export default function GeneralPlayground({ questionList }) {
  const [currentIndex, setCurrentIndex] = useState(questionList.length - 1);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(questionList.length)
        .fill(0)
        .map((i) => createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < questionList.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (index) => {
    console.log("Swiped index: ", index);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, index) => {
    console.log(
      `${name} at index ${index} left the screen!`,
      "Current index :",
      currentIndexRef.current
    );
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= index && childRefs[index].current.restoreCard();
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
              onSwipe={() => swiped(index)}
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
