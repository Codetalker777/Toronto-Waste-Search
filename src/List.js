import parse from "html-react-parser";
import React, { Component } from "react";
import MdStar from "react-icons/lib/md/star";
import {SearchResults, Star} from "./Styles";

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  //Calls the setFav function from the parent to add/remove this item from favourites
  handleClick = (e) => {
    
    this.props.setFav(this.props.data)
}
  render() {
    const {fav } = this.props.data;
    let { title, body } = this.props.data.data;
    //modifies the syntax of the html body string recieved from the api call in order to be rendered in react
    let description = parse(body);
    //parses the html body string to format the html data recieved
    description = description.replace('<ul', '<ul style="margin: 0"')
    description = description.replace(/<ul>/g, '<ul style="margin: 0">')
    description = description.replace('<li', '<li style="margin-bottom: 10px"')
    description = description.replace(/<li>/g, '<li style="margin-bottom: 10px">')
    description = description.replace(/<p>/g, '<p style="margin: 0">')

    return (
      <SearchResults>
        <div style={{ width: "50%", display: "flex", flexDirection: "row" }}>
        {/*Favourites button adds/removes it from favourites*/}
          <Star onClick={this.handleClick}>
            <MdStar color={fav? "#23995C" : "#AAAAAA"} size={18} />
          </Star>
          {title}
        </div>
        <div style={{ width: "50%", justifyContent: "left" }}>
        {/*The final parse converts the html body string into code that can be rendered by react*/}
          {parse(description)}
        </div>
      </SearchResults>
    );
  }
}
