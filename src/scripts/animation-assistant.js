import '../index.html';
// import '../css/animation-assistant.css';
import 'animate.css/animate.css';
import AnimationAssistant from './AnimationAssistant';

const animationAssistant = new AnimationAssistant('block-first');
animationAssistant.setLibrary('animate.css');
// animationAssistant
//     .play('animate__swing', 4000)
//     .then((res) => res('animate__shakeX'))
//     .then((res) => res('animate__bounceOut'));
animationAssistant.setAnimation([20, 80], ['animate__swing', 'animate__shakeX']);

const blockLast = new AnimationAssistant('block-last');
blockLast.setLibrary('animate.css');
blockLast.setAnimation([80], ['animate__bounceInRight'], false);
