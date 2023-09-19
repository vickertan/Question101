import { useEffect, useState, useMemo, useRef, createRef } from "react";
import { doc, runTransaction } from "firebase/firestore";
import { db, auth } from "../firebase";
import TinderCard from "react-tinder-card";
import PlaygroundButton from "./PlaygroundButton";

export default function GeneralPlayground({ questionList }) {
  const [currentIndex, setCurrentIndex] = useState(questionList.length - 1);

  // keep currentQuestion state to access current question's data in firestore
  const [currentQuestion, setCurrentQuestion] = useState(
    questionList[currentIndex]
  );

  useEffect(() => {
    setCurrentQuestion(questionList[currentIndex]);
  }, [currentIndex]);

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

  // logic to set favorite for question
  const setFavorite = async () => {
    const curCollRef = doc(db, "questions", currentQuestion.id);
    const curUsername = auth.currentUser.displayName;
    const curUid = auth.currentUser.uid;

    try {
      await runTransaction(db, async (transaction) => {
        const curDoc = await transaction.get(curCollRef);
        if (!curDoc.exists()) {
          throw "Document does not exist!";
        }

        // prevent uploading existing user data on favoritedBy field
        const data = { ...curDoc.data().favoritedBy };
        if (!data[curUsername]) {
          data[curUsername] = curUid;
          transaction.update(curCollRef, { favoritedBy: data });
          console.log(
            `${curUsername} added ${currentQuestion.id} to their favorite list`
          );

          // show some sign to user when they succeeded add currentQuestion.id to their favorite list
        } else {
          console.log(`You set ${currentQuestion.id} as favorite already`);

          // show some sign to user when they already added currentQuestion.id to their favorite
        }
      });
    } catch (err) {
      console.error("Transaction failed: ", err);
    }
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
              onCardLeftScreen={() => outOfFrame(question.id, index)}
            >
              <h2 className="question">{question.id}</h2>
              <p className="category">{question.category}</p>
            </TinderCard>
          </div>
        ))}
      </div>
      <PlaygroundButton
        swipe={swipe}
        goBack={goBack}
        setFavorite={setFavorite}
      />
    </div>
  );
}
