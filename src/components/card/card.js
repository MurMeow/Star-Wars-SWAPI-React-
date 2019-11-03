import React from 'react';
import './style.scss'

const BASE_PATH = 'https://swapi.co/api/';
const SEARCH_PATH = 'people/';


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      data: {},
    };
  }

  async componentDidMount() {
    const url = this.props.location.pathname;
    let arrayOfStrings = url.split('/');
    const id = arrayOfStrings[arrayOfStrings.length - 1];
    const name = arrayOfStrings[arrayOfStrings.length - 2];
    this.setState({
      name: name
    });
    const result = await fetch(`${BASE_PATH}${SEARCH_PATH}${id}`);

    const informationReceived = await result.json();

    const updatedData = await this.getUpdatedData(informationReceived)

    this.setState({
      data: updatedData
    }, () => {
      this.forceUpdate()
    })
  }

  getUpdatedData = async (informationReceived) => {
    const updatedData = {...informationReceived}
    const informationReceivedKeys = Object.keys(informationReceived)
    for (let key of informationReceivedKeys) {
      if (typeof informationReceived[key] === 'object') {
        for (let value of informationReceived[key]) {
          const arrayOfValue = value.split('/');
          if (arrayOfValue[0] === 'https:') {
            const result = await fetch(value);
            const json = await result.json();
            updatedData[key] = json.name || json.title
          }
        }
      } else if (informationReceived[key].split('/')[0] === 'https:') {
        const result = await fetch(informationReceived[key]);
        const json = await result.json();
        updatedData[key] = json.name || json.title
      }
    }
    return updatedData
  }


  getInfoPerson = () => {
    const personalInfo = Object.keys(this.state.data).map((key, i) => {
      return (
        <div className="flex" key={i}>
          <p className="params">{key}</p>
          <p className="value">{this.state.data[key]}</p>
        </div>
      )
    });
    return personalInfo;
  };

  render() {
    const personalInfo = this.getInfoPerson();
    return (
      <div className="card">
        <h1>{this.state.name}</h1>
        <div>
          {personalInfo}
        </div>
      </div>
    );
  };
}

export default Card;


