import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { ContactType } from '../../Services/Api/interfaces';
import { getContacts } from '../../Services/Api';
import { HomeStyled } from './index.styles';
import ContactList from '../ContactList';
import { getCheckedContacts, getFilteredList, getSortContacts } from '../../Services/Contacts';

const Home: FC = () => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [checkedContacts, setCheckedContacts] = useState<number[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredContacts, setFilteredContacts] = useState<ContactType[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await getContacts();
        const sortResponse = getSortContacts(response);
        setContacts(sortResponse);
      } catch (err: any) {
        alert(err);
      }
    })();
  }, []);

  const handleToggle = useCallback(
    (value: number) => {
      const newChecked = getCheckedContacts(value, checkedContacts);
      setCheckedContacts(newChecked);
    },
    [checkedContacts],
  );

  const filterList = useCallback(
    (value: string) => {
      const filteredData = getFilteredList(value, contacts);
      setFilteredContacts(filteredData);
    },
    [contacts],
  );

  const handleChange = useCallback(
    (e): void => {
      const value = e.target.value;
      const valueToFilter = value.toUpperCase();
      setSearch(value);
      filterList(valueToFilter);
    },
    [filterList],
  );

  const dataToShow = useMemo(() => {
    return search.length ? filteredContacts : contacts;
  }, [contacts, filteredContacts]);

  return (
    <HomeStyled>
      <TextField
        id="filter"
        label="Filter by first and last name"
        value={search}
        onChange={handleChange}
      />
      <ContactList
        handleToggle={handleToggle}
        dataToShow={dataToShow}
        checkedContacts={checkedContacts}
      />
    </HomeStyled>
  );
};
export default Home;
