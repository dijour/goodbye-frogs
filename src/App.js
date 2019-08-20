import React, { Component } from 'react';
import styles from './App.css';
import Vertical from './components/Vertical';
import Horizontal from './components/Horizontal';
import Answer from './components/Answer';
import CSSModules from 'react-css-modules';
import { isMobile } from 'react-device-detect';
import { cpus } from 'os';

const QUESTIONS = [
  "What's happening?",
  "Where are you going?",
  "Why are you leaving?",
  "But seriously, why?",
  "Are you sad to leave frog?",
  "Are you moving?",
  "What will you miss the most about frog?",
  "Who will you miss the most?",
  "When is your last day?",
  "Can I use this website for my next deliverable that needs some $izzle?"
];

const ANSWERS = [
  "I (Dean Dijour) am leaving frog, and I STOLE a website from Jeff Ong to tell you about it",
  'Going to finish undergrad at Carnegie Mellon University — please visit me in Pittsburgh, as the weather is bleak and the boredom is insufferable ',
  'To make my parents proud and graduate with degrees in Information Systems and Human Computer Interaction',
  'I\'ve been encouraged by my superiors not to drop out of college, otherwise I\'ll be "unhirable"',
  'Extremely',
  'Sort of, I\'ll be in and out of the area, so please still invite me to your parties, bat / bar mitzvahs, weddings, trap houses, etc',
  '1. You\n2. The tech team camraderie\n3. Coffee Time\n4. Francois Ngyuen\n5. Andy Zimmerman, #1 President',
  'Andy Zimmerman',
  'Friday, August 23rd',
  'paypal'
];

class App extends Component {
  constructor(props){
    super(props);

    this.answerRef = React.createRef();
    this.state = { index: 0, x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  _onTouchStart(e){
    // console.log(e.touches);
    if (isMobile){
      this.setState({
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      });
    }
  }

  _onMouseMove(e){
    if (!isMobile){
      this.setState({
        x: e.pageX,
        y: e.pageY
      });
    }
  }

  prev = (e) => {
    this.state.index > 0 ? this.setState({index: this.state.index - 1}) : this.setState({index: ANSWERS.length - 1});
  }

  next = (e) => {
    this.state.index === ANSWERS.length - 1 ? this.setState({index: 0}) : this.setState({index: this.state.index + 1});
  }


  handleOrientation = (event) => {
    console.log("hello")
    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;
    console.log(absolute, alpha, beta, gamma)
  
    // Do stuff with the new orientation data
  }

  keyListener = (e) => {
    if (e.key === 'ArrowRight') {
      this.next();
    }
    else if (e.key === 'ArrowLeft') {
      this.prev();
    }
  }
  

  componentDidMount = () => {
    console.log(window.orientation)
    if (window.Accelerometer) {
      console.log("we got one")
    }
    window.addEventListener("devicemotion", this.handleOrientation, true);
    return window.addEventListener( 'keydown', this.keyListener, false );
  }
  
  render() {
    const { x, y, index } = this.state;
    return (
      <div styleName="App" onTouchStart={this._onTouchStart.bind(this)} onMouseMove={this._onMouseMove.bind(this)}>
        <Vertical x={x} />
        <Horizontal y={y} />
        <Answer length={ANSWERS.length} q={QUESTIONS[this.state.index]} a={ANSWERS[this.state.index]} x={x} y={y} index={index} ref={this.answerRef}/>
        <div onClick={this.prev} styleName="previous">Previous</div>
        <div onClick={this.next} styleName="next">Next</div>
      </div>
    );
  }
}

export default CSSModules(App, styles);
