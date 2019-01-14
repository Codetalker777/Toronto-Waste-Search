import React, { Component } from "react";
import SearchIcon from "react-icons/lib/md/search";
import SearchItem from "./List";
import {
  Header,
  Input,
  Button,
  SearchDiv,
  Favourites,
  FavouritesHeader
} from "./Styles";

class App extends Component {
  constructor(props) {
    super(props);

    this.updateFav = this.updateFav.bind(this);
    this.searchTextUpdate = this.searchTextUpdate.bind(this);
    this.searchJSON = this.searchJSON.bind(this);
    // State variable declarations
    this.state = { data: [], searchText: "", fav: [], results: [] };
  }

  componentDidMount() {
    // Fetches the data
    if (this.state.data.length === 0) {
      fetch(
        "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000"
      )
        .then(response => response.json())
        .then(response => {
          /*processes the data recieved placing it into an array object for easier access
          when searching and updating lists*/
          let array = [];
          for (let i = 0; i < response.length; i++) {
            array.push({ id: i, data: response[i], fav: false });
          }
          this.setState({ data: array });
        });
    }
  }

  /*If enter key is pressed */
  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.searchJSON();
    }
  };

  //Searches the data for potential matches based on the keywords provided
  searchJSON() {
    const { searchText, data } = this.state;
    let array = [];
    const lowerSearchText = searchText.toLowerCase();

    /*if take is entered it will still match takeout or take-out 
    searches for the subset within keywords */
    for (let i = 0; i < data.length; i++) {
      if (data[i].data.keywords.includes(lowerSearchText)) {
        array.push(data[i]);
      }
    }
    this.setState({
      results: array
    });
  }

  //updates the searchText field
  searchTextUpdate(input) {
    //resets the search results if the search field is cleared
    if (input === "") {
      this.setState({
        results: []
      });
    }
    this.setState({
      searchText: input
    });
  }

  //adds or removes favourites from fav
  updateFav(input) {
    let favlist = this.state.fav;

    //if the field is currently not in your favourites add it
    if (input.fav === false) {
      favlist.push(input);
    }
    // remove it from your favourites
    else if (input.fav === true) {
      for (let i = 0; i < favlist.length; i++) {
        console.log("here");
        if (input.id === favlist[i].id) {
          favlist.splice(i, 1);
        }
      }
    }

    let array = this.state.data;
    array[input.id].fav = !array[input.id].fav;

    this.setState({
      data: array,
      fav: favlist
    });
  }

  //renders the lists
  renderData(data) {
    let array = [];

    for (let i = 0; i < data.length; i++) {
      array.push(
        <SearchItem data={data[i]} setFav={this.updateFav} key={data[i].id} />
      );
    }
    return array;
  }

  render() {
    return (
      <div>
        {/*Title*/}
        <Header>Toronto Waste Lookup</Header>
        {/*Search Bar*/}
        <SearchDiv>
          {/*Search Field updated everytime you type/remove a key and searches on enter*/}
          <Input
            type="text"
            value={this.state.searchText}
            onChange={e => this.searchTextUpdate(e.target.value)}
            onKeyPress={this._handleKeyPress}
          />
          {/*Search button*/}
          <Button onClick={this.searchJSON}>
            <SearchIcon
              size={40}
              color="white"
              style={{ transform: "rotate(90deg)" }}
            />
          </Button>
        </SearchDiv>
        {/*Renders search results*/}
        {this.renderData(this.state.results)}
        {/*Renders Favourites when you have more than 1 in the list*/}
        {this.state.fav.length > 1 ? (
          <Favourites>
            <FavouritesHeader>Favourites</FavouritesHeader>
            {this.renderData(this.state.fav)}
          </Favourites>
        ) : null}
      </div>
    );
  }
}

export default App;
