import React, {useEffect, useState, useRef} from 'react';
import ListContacts from './ListContacts'
import TextField from '@material-ui/core/TextField';

export default function Home(){
  const [dataContacts, setDataContacts] = useState([]);
  const [checked, setChecked] = useState([0]);
  const [filterValue, setFilterValue] = useState('')
  const dataToShow = useRef(dataContacts)  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json')
        const data = await response.json()
        data.sort((a, b)=> {
          const textA = a.last_name.toUpperCase();
          const textB = b.last_name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        setDataContacts(data)
      } catch (err) {
        alert(err)
       }
    };
    fetchData()
  },[])
 
  useEffect(()=>{
    dataToShow.current = dataContacts
  }, [dataContacts])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked)
    setChecked(newChecked);
  };

  const handleChange =(e)=>{
    filterListFn(e.target.value.toUpperCase())
    setFilterValue(e.target.value);
  }

  const filterListFn = (value)=>{
    const filterData = dataContacts.filter(el=> el.first_name.toUpperCase().indexOf(value)>-1 || el.last_name.toUpperCase().indexOf(value)>-1)
    dataToShow.current = filterData
  }
  const stylesHome = {
    width: '360px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <div className='home' style={stylesHome}>
      <TextField id="standard-name" label="Filter by first and last name" value={filterValue} onChange={handleChange}/>
      <ListContacts data = {dataContacts} handleToggle= {handleToggle} dataToShow={dataToShow}
        checked={checked} filterValue={filterValue} 
      />
    </div>  
  )
}