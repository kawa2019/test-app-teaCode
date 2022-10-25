import { ContactType } from '../Api/interfaces';

export const getSortContacts = (list: ContactType[]) => {
  return [...list].sort((a, b) => {
    const textA = a.last_name.toUpperCase();
    const textB = b.last_name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
};

export const getFilteredList = (value: string, list: ContactType[]) => {
  return list.filter(el => {
    const fullName = el.first_name + ' ' + el.last_name;
    return fullName.toUpperCase().indexOf(value) > -1;
  });
};

export const getCheckedContacts = (value: number, checkedContacts: number[]): number[] => {
  const currentIndex = checkedContacts.indexOf(value);
  const newChecked = [...checkedContacts];
  if (currentIndex === -1) {
    newChecked.push(value);
  } else {
    newChecked.splice(currentIndex, 1);
  }

  return newChecked;
};
