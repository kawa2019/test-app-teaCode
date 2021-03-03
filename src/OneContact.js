import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export default function OneContact({value, handleToggle, style, checked}){
  return (
    <ListItem key={value.id} role={undefined} dense button onClick={handleToggle(value.id)} style={style}>
      <ListItemIcon>
        <Avatar alt={`${value.first_name + ' ' + value.last_name}`} src={value.avatar} />
      </ListItemIcon>
      <ListItemText id={value.id} primary={`${value.first_name + ' ' +value.last_name}`} />
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked.indexOf(value.id) !== -1}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': value.id }}
        />
      </ListItemIcon>
    </ListItem>
  )
}