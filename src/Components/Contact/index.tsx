import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import { ContactType } from '../../Services/Api/interfaces';

interface ContactProps {
  item: ContactType;
  handleToggle: (value: number) => void;
  style: any;
  checkedContacts: number[];
}

const Contact: FC<ContactProps> = ({ item, handleToggle, style, checkedContacts }) => {
  return (
    <ListItem dense component={Button} onClick={() => handleToggle(item.id)} style={style}>
      <ListItemIcon>
        <Avatar alt={`${item.first_name + ' ' + item.last_name}`} src={item.avatar} />
      </ListItemIcon>
      <ListItemText id={item.id.toString()} primary={`${item.first_name + ' ' + item.last_name}`} />
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checkedContacts.indexOf(item.id) !== -1}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
    </ListItem>
  );
};

export default Contact;
