import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-virtualized/styles.css';
import faker from 'faker';
import DraggableColumn from './DraggableColumn';

const list = new Array(100).fill(true).map(() => ({
  name: faker.name.findName(),
  description: faker.name.jobTitle(),
  location: faker.address.city()
}));

ReactDOM.render(
  <React.StrictMode>
    <DraggableColumn list={list} />
  </React.StrictMode>,
  document.getElementById('root')
);
