import React from 'react';

import Form from './Form';

const questions = [
  {
    id: 'name',
    label: 'Survey Name',
    type: 'text',
  },
];

function SurveyMaker() {
  return (
    <div>
      <Form questions={questions} onSubmit={() => {}} />
    </div>
  );
}

export default SurveyMaker;
