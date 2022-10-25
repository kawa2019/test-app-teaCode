import React, { FC, useCallback } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Contact from '../Contact';
import { Box } from '@material-ui/core';

interface ContactListProps {
  handleToggle: (value: number) => void;
  checkedContacts: number[];
  dataToShow: any;
}

const ContactList: FC<ContactListProps> = ({ handleToggle, checkedContacts, dataToShow }) => {
  const renderRow = useCallback(
    (props: ListChildComponentProps) => {
      const { index, style } = props;
      const item = dataToShow[index];
      return (
        <Contact
          key={item.id}
          item={item}
          handleToggle={handleToggle}
          style={style}
          checkedContacts={checkedContacts}
        />
      );
    },
    [dataToShow, handleToggle, checkedContacts],
  );

  if (!dataToShow.length) {
    return <>no data</>;
  }

  return (
    <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={dataToShow.length}
        overscanCount={5}>
        {renderRow}
      </FixedSizeList>
    </Box>
  );
};

export default ContactList;
