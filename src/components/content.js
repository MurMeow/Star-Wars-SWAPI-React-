import React, {Fragment} from 'react';
import './content_style.scss';
import ListPeople from './listPeople/listPeople'


const BASE_PATH = 'https://swapi.co/api/';
const SEARCH_PATH = 'people';
const SEARCH_PARAM = '/?page=';


class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCard: false,
      searchQuery: '',
      count: null,
      next: '',
      previous: '',
      people: []
    };
  }


  async componentDidMount() {
    const {searchQuery} = this.state;
    // fetch(`${BASE_PATH}${SEARCH_PATH}${SEARCH_PARAM}${searchQuery}`)
    fetch(`${BASE_PATH}${SEARCH_PATH}${SEARCH_PARAM}${searchQuery}`)
      .then(res => res.json())
      .then(result => this.setNews(result))
      .catch(error => error);
  }

  setNews = result => {
    this.setState({
      // result
      count: result.count,
      next: result.next,
      previous: result.previous,
      people: result.results
    })
    console.log(this.state)
  }


  onChange = () => {
    console.log("onChange")
  }





  getCurrentPage = (stringToSplitNext,stringToSplitPrevious, separator) =>{
      if(stringToSplitPrevious ==='' &&  stringToSplitNext === ''){
        return 1
      }
      else{
        if (stringToSplitPrevious === null ) {
          return 1
        }
        else if(stringToSplitNext === null ) {
          let arrayOfStrings = stringToSplitPrevious.split(separator);
          const thisPage = +arrayOfStrings[arrayOfStrings.length - 1] + 1;
          return thisPage
        }
        else {
          let arrayOfStrings = stringToSplitNext.split(separator);
            const thisPage = arrayOfStrings[arrayOfStrings.length - 1] - 1;
            return thisPage
        }
      }
  }

  switchPrevious = () => {
    const {previous} = this.state;
    if(previous !== null){
      fetch(previous)
        .then(res => res.json())
        .then(result => this.setNews(result))
        .catch(error => error);
    }
  }

  switchNext = () => {
    const {next} = this.state;
    if(next !== null){
      fetch(next)
        .then(res => res.json())
        .then(result => this.setNews(result))
        .catch(error => error);
    }
  }

  paginationCheck = (count, stringToSplitNext, stringToSplitPrevious, separator) => {
    if(count > 10){
      return (
        <div className="pagination">
          <ul>
            <li onClick={this.switchPrevious}> previous </li>
            <li>{
              this.getCurrentPage(stringToSplitNext,stringToSplitPrevious, separator)
            }</li>
            <li>/ { this.countPage(count) }</li>
            <li onClick={this.switchNext}> next </li>
          </ul>
        </div>
      )
    }
  }

  countPage = (count) => {
    return (parseInt(count/10) + (count % 10 === 0 ? 0 : 1))
  }

  render() {

    const {people = []} = this.state;

    return (
      <div className="content__container">
        <p>People</p>

        {people.map((item, i) =>
          <ListPeople key={i}
                      name={item.name}
                      films={item.films}
                      gender={item.gender}
                      hair_color={item.hair_color}
                      height={item.height}
                      url={item.url}
          />
        )}
        {this.paginationCheck(this.state.count, this.state.next, this.state.previous, "=")}
      </div>
    );
  };
};



export default Content


