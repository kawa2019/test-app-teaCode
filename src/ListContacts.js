import React, {useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { FixedSizeList as ListRender } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import OneContact from './OneContact'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: '360',
    backgroundColor: 'white',
  },
}));

export default function ListContacts({ handleToggle, filterValue, checked, dataToShow}){
  const classes = useStyles();
  const listRender = useCallback(
    ({ height, width }) => {
      return (
        <ListRender
          className="list-content"
          itemCount={dataToShow.length}
          itemSize={50}
          height={height}
          width={width}
        >
          {listItem}
        </ListRender>
      )
    },
    [checked, filterValue, dataToShow],
  );

  const listItem = useCallback(
    ({ index, style }) => {
      const value = dataToShow[index]
      return (
        <OneContact value={value} handleToggle={handleToggle} style={style} checked={checked}/>
      );
    },
    [checked, filterValue, dataToShow],
  );

  if (!dataToShow.length){
      return 'no data'
  }  
  
  return (
    <>
      <List className={classes.root}>
        <AutoSizer style={{ height: '85vh' }} >
          {listRender}
        </AutoSizer>
      </List>   
    </>
  )
}