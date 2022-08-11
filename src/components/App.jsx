import React from 'react';
import {FeedbackOptions} from 'components/Feedback/Feedback'
import {Section} from 'components/Section/Section';
import { Statistics } from 'components/Statistics/Statistics';
import {Notification} from 'components/Notification/Notification'
import PropTypes from 'prop-types';
import {Box} from '../App.styled'

export class App extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };


  onLeaveFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

      
countTotalFeedback = () =>{
  const { good, neutral, bad } = this.state;

  return good + neutral + bad;  
}

countPositiveFeedbackPercentage = () => {
  
  const { good, neutral, bad } = this.state;

  return Math.round((good / (good + neutral + bad)) * 100);
  
  
}

  render() {
    const { good, neutral, bad } = this.state;
    const keys = Object.keys(this.state);
  
    
  return (
    <Box>     
        
      <Section title = "Please leave feedback"/>
        <FeedbackOptions
            options={keys}
            onLeaveFeedback={this.onLeaveFeedback}
          />
            {this.countTotalFeedback() > 0 ? (
          
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback}
              positivePercentage={this.countPositiveFeedbackPercentage}
            />
          
        ):
        
          <Notification message="No feedback given" />
        }

        
    </Box>
  );
}
}

App.protoType = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
}