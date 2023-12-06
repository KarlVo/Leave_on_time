import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function SearchResultsView(props) {
    console.log("villgåpåtoa")



  function handleAPICall(){
    props.stationTable();
  }

  function textChange(event){
    props.textEntry(event.target.value);
  }

  function openAddRoute(){
    props.openAddRoute();
  }

  return (
    <div>
        <span>"hej"</span>
        <span>{props.searchResults}</span>
    </div>
  );
}

export default SearchResultsView;
