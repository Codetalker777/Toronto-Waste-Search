import styled from 'styled-components'

/*Styling for components in App.js*/

// Title
export const Header = styled.header`
  background-image: linear-gradient(to right, #1D5A94, #23975E);
  color: white;
  font-size: 40px;
  font-weight: bold;
  min-height: 120px;
  text-align: center;
  vertical-align: middle;
  line-height: 120px;
  font-family: Arial;
`;

//Searchfield
export const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  padding-left: 5px;
`;
//Search Button
export const Button = styled.button`
  margin-left: 10px;
  background-color: #23975E;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  border: 0;
  box-shadow: none;
`;

//Search bar container
export const SearchDiv = styled.div`
  margin: 20px 20px 20px 20px;
  display: flex;
  justify-content: center;
`;

// Favourites Container
export const Favourites = styled.div`
  background-color: #F7FEFA;
  font-family: Arial;
  padding-bottom: 10px;
`;

// Favourites Title
export const FavouritesHeader = styled.div`
  font-family: Arial;
  font-size: 28px;
  color: #23975E;
  font-weight: bold;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
`;

/*Styling for components in SearchResults.js */

//List item container
export const SearchResults = styled.div`
  font-family: Arial;
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 30px;
`;

//Favourites button
export const Star = styled.button`
  margin-left: 10px;
  background-color: transparent;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  border: 0;
  box-shadow: none;
  height: 18px;
`;