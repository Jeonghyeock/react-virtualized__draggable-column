import React, { useState } from 'react';
import {
  Column,
  Table,
  TableHeaderProps,
} from 'react-virtualized';
import Draggable from 'react-draggable';

const TOTAL_WIDTH = 500;

enum DataKey {
  name = 'name',
  location = 'location',
  description = 'description',
}

type Props = {
  list: {
    name: string;
    description: string;
    location: string;
  }[];
}

const DraggableColumn = ({
  list,
}: Props) => {
  const [widths, setWidths] = useState<{ [key: string]: number }>({
    [DataKey.name]: 0.33,
    [DataKey.location]: 0.33,
    [DataKey.description]: 0.33,
  });

  const resizeRow = ({ dataKey, deltaX }: { dataKey: string; deltaX: number }) => {
    setWidths(prevState => {
      const percentDelta = deltaX / TOTAL_WIDTH;
      
      // This is me being lazy :)
      const nextDataKey = dataKey === 'name' ? 'location' : 'description';
      
      return {
        ...prevState,
        [dataKey]: prevState[dataKey] + percentDelta,
        [nextDataKey]: prevState[nextDataKey] - percentDelta,
      };
    });
  };
  
  const headerRenderer = ({
    columnData,
    dataKey,
    disableSort,
    label,
    sortBy,
    sortDirection,
  }: TableHeaderProps) => {
    return (
      <React.Fragment key={dataKey}>
        <div className='ReactVirtualized__Table__headerTruncatedText'>
          {label}
        </div>
        <Draggable
          axis='x'
          defaultClassName='DragHandle'
          defaultClassNameDragging='DragHandleActive'
          onDrag={(event, { deltaX }) => resizeRow({ dataKey, deltaX })}
          position={{ x: 0, y: 0 }}
        >
          <span className='DragHandleIcon'>⋮</span>
        </Draggable>
      </React.Fragment>
    );
  };
  
  return (
    <Table
      width={TOTAL_WIDTH}
      height={300}
      headerHeight={20}
      rowHeight={30}
      rowCount={list.length}
      rowGetter={({ index }) => list[index]}
    >
      <Column
        headerRenderer={headerRenderer}
        dataKey={DataKey.name}
        label='Name'
        width={widths.name * TOTAL_WIDTH}
      />
      <Column
        headerRenderer={headerRenderer}
        dataKey={DataKey.location}
        label='Location'
        width={widths.location * TOTAL_WIDTH}
      />
      <Column
        dataKey={DataKey.description}
        label='Description'
        width={widths.description * TOTAL_WIDTH}
      />
    </Table>
  );
}

export default DraggableColumn;
