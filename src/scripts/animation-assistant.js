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
animationAssistant.setAnimation(50, 'animate__shakeX');

const blockLast = new AnimationAssistant('block-last');
blockLast.setLibrary('animate.css');
blockLast.hideAtStart();
blockLast.adaptEnvironment();
blockLast.setAnimation(40, 'animate__bounceInRight', (event) => {
    console.log('end');
    console.log(event.target);
});

const blockDelete = new AnimationAssistant('block-delete');
blockDelete.setLibrary('animate.css');
blockDelete.addClasses(['animate__delay-3s', 'animate__slower', 'animate__repeat-2']);
blockDelete.hideAtStart();
blockDelete.adaptEnvironment();
blockDelete.setAnimation(90, 'animate__backInRight');
