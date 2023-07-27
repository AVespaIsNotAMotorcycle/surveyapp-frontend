import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

// import Input from '../Input';
import './SurveyMaker.css';

/* eslint react/jsx-props-no-spreading: off */

const questionProps = propTypes.shape({
  name: propTypes.string,
  description: propTypes.string,
  id: propTypes.string,
  type: propTypes.string,
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

function QuestionEditing({
  question,
  updateQuestion,
}) {
  const {
    id,
    type,
    name,
    description,
  } = question;
  return (
    <div>
      {type}
      <br />
      <input
        value={name}
        onChange={({ target }) => {
          updateQuestion(id, 'name', target.value);
        }}
      />
      <br />
      <textarea
        value={description}
        placeholder="Description"
        onChange={({ target }) => {
          updateQuestion(id, 'description', target.value);
        }}
      />
    </div>
  );
}
QuestionEditing.propTypes = {
  question: questionProps.isRequired,
  updateQuestion: propTypes.func.isRequired,
};

function Question({
  question,
  index,
  mode,
  updateQuestion,
}) {
  const {
    id,
    name,
  } = question;
  const contents = mode === 'available'
    ? name
    : (
      <QuestionEditing
        updateQuestion={updateQuestion}
        question={question}
      />
    );
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
  updateQuestion: propTypes.func,
};
Question.defaultProps = { updateQuestion: () => {} };

function QuestionsPanel({
  questions,
  mode,
  updateQuestion,
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
              updateQuestion={updateQuestion}
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
  updateQuestion: propTypes.func,
};
QuestionsPanel.defaultProps = { updateQuestion: () => {} };

const availableQuestions = [
  { id: 'text-field', name: 'Text Field', type: 'text' },
  { id: 'select', name: 'Select', type: 'select' },
];

function SurveyMaker() {
  const [chosenQuestions, setChosenQuestions] = useState([]);

  const updateQuestion = (questionID, field, value) => {
    const question = chosenQuestions
      .find(({ id }) => id === questionID);
    question[field] = value;
    setChosenQuestions([...chosenQuestions]);
  };

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
            updateQuestion={updateQuestion}
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
