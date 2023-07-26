import React, { useContext, useState } from 'react';

import UserContext from '../UserContext';

function Surveys() {
  const { token } = useContext(UserContext);
  const [surveys] = useState([]);
  return (
    <div>
      {token}
      {surveys}
    </div>
  );
}

export default Surveys;
