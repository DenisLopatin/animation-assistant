import '../index.html';
// import '../css/animation-assistant.css';
import 'animate.css/animate.css';
import AnimationAssistant from './AnimationAssistant';

const animationAssistant = new AnimationAssistant('block-first');
animationAssistant
    .setAnimation(['animate__animated', 'animate__swing'], 20)
    .then((res) => res(['animate__shakeX', 'animate__swing']))
    .then((res) => res(['animate__bounceOut', 'animate__shakeX']));
