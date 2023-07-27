import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

import './SurveyMaker.css';

/* eslint react/jsx-props-no-spreading: off */

const questionProps = propTypes.shape({
  name: propTypes.string,
  id: propTypes.string,
});

function DropComponent({
  droppableId,
  children,
}) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(frame);
      setEnabled(false);
    };
  }, []);

  if (!enabled) return null;
  return (
    <Droppable droppableId={droppableId}>
      {children}
    </Droppable>
  );
}
DropComponent.propTypes = {
  droppableId: propTypes.string.isRequired,
  children: propTypes.func.isRequired,
};

function Question({
  question,
  index,
  mode,
}) {
  const {
    id,
    name,
  } = question;
  const contents = mode === 'available'
    ? name
    : `${id} ${name}`;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="question"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {contents}
        </div>
      )}
    </Draggable>
  );
}
Question.propTypes = {
  question: questionProps.isRequired,
  index: propTypes.number.isRequired,
  mode: propTypes.oneOf(['available', 'chosen']).isRequired,
};

function QuestionsPanel({
  questions,
  mode,
}) {
  return (
    <DropComponent
      droppableId={`${mode}-questions`}
    >
      {(provided, snapshot) => (
        <div
          className={`${mode}-questions`}
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver
              ? 'blue'
              : 'transparent',
          }}
        >
          {questions.map((question, index) => (
            <Question
              key={question.id}
              question={question}
              index={index}
              mode={mode}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </DropComponent>
  );
}
QuestionsPanel.propTypes = {
  questions: propTypes.arrayOf(
    questionProps,
  ).isRequired,
  mode: propTypes.oneOf(['available', 'chosen']).isRequired,
};

const availableQuestions = [
  { id: 'text-field', name: 'Text Field' },
  { id: 'select', name: 'Select' },
];

function SurveyMaker() {
  const [chosenQuestions, setChosenQuestions] = useState([]);
  const onDragEnd = ({ source, destination }) => {
    if (destination.droppableId === 'available-questions') return;

    const internalMove = source.droppableId === 'chosen-questions';
    const fromIndex = source.index;
    const toIndex = destination.index;

    const getQuestion = () => {
      if (internalMove) return chosenQuestions[fromIndex];

      const newQuestion = { ...availableQuestions[fromIndex] };
      newQuestion.id = String(Date.now());
      return newQuestion;
    };
    const filterQuestions = () => {
      if (!internalMove) return chosenQuestions;

      return chosenQuestions.slice(0, fromIndex)
        .concat(chosenQuestions.slice(fromIndex + 1));
    };

    const movedQuestion = getQuestion();
    const filteredQuestions = filterQuestions();
    const before = filteredQuestions.slice(0, toIndex);
    const after = filteredQuestions.slice(toIndex);
    setChosenQuestions([
      ...before,
      movedQuestion,
      ...after,
    ]);
  };
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="survey-maker">
          <QuestionsPanel
            questions={chosenQuestions}
            mode="chosen"
          />
          <QuestionsPanel
            questions={availableQuestions}
            mode="available"
          />
        </div>
      </DragDropContext>
    </div>
  );
}

export default SurveyMaker;
