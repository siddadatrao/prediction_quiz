import React from 'react'
import { quizinfo } from './quizinfo';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

//thing 1, thing 2, thing 3, thing 4

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: null,
      currrentQuestion: 0,
      options: [],
      question: '',
      outcomes_array: [0, 0, 0, 0],
      outcomes: ["friends", "shameless", "game of thrones", "nba"],
      final_outcome: ""
    }


    this.handleNextButton = this.handleNextButton.bind(this);
    this.optionClicked = this.optionClicked.bind(this);
  }


  componentDidMount() {

    this.setState(() => {
      return {
        currrentQuestion: 0,
        question: quizinfo[this.state.currrentQuestion].question,
        options: quizinfo[this.state.currrentQuestion].options
      }
    })
  }

  findOutcome() {
    console.log("Final Choice:" + this.state.outcomes_array.indexOf(Math.max(...this.state.outcomes_array)))
    this.setState({
      final_outcome: this.state.outcomes[this.state.outcomes_array.indexOf(Math.max(...this.state.outcomes_array))]
    })
  }

  handleNextButton() {
    if (this.state.currrentQuestion < quizinfo.length - 1) {
      this.setState({
        currrentQuestion: this.state.currrentQuestion + 1,
        question: quizinfo[this.state.currrentQuestion + 1].question,
        options: quizinfo[this.state.currrentQuestion + 1].options
      });
      //console.log(this.state.currrentQuestion)
    } else {
      this.findOutcome()
    }
  }

  optionClicked(event) {
    //console.log(event)

    var value = this.state.outcomes_array



    for (var i = 0; i < event.length; i ++) {
      value[parseInt(event[i])] += 1
    }


    // value[event] = value[event] + 1

    this.setState({
      outcomes_array: value
    })

    console.log(this.state.outcomes_array)

    this.handleNextButton()
  }


  replacer(key, value) {
    const unquoted = value.replace(/"([^"]+)":/g, '$1:');
    return unquoted
  }


  
  render() {
    return (

        <h2>{this.state.question}</h2>


        <div style={{ overflow: 'auto'}}>
          <ListGroup>
            {this.state.options.map((option, id) => (
              <ListGroupItem style= {{width: 200 }} key={id} action onClick={(id) => this.optionClicked(option.option_result)}>
                <h2>{JSON.stringify(option.option_display, this.replacer)}</h2>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>



        <button style= {{width: 200}}onClick={this.handleNextButton}>
          <h3>Next</h3>
        </button>

        <h1>{this.state.final_outcome}</h1>



    )
  }
}

export default Quiz