import '../index.html';
import 'animate.css/animate.css';
import AnimationAssistant from './AnimationAssistant';

// animate.css
const animationCssExamplePlay = new AnimationAssistant('animation-css-example-play');
animationCssExamplePlay.setLibrary('animate.css');
animationCssExamplePlay
    .play('animate__headShake', 2200)
    .then((res) => res('animate__rubberBand', 4000))
    .then((res) => res('animate__tada'));

const button = document.querySelector('button');
button.addEventListener(
    'click',
    () => {
        animationCssExamplePlay
            .play('animate__headShake', 2200)
            .then((res) => res('animate__rubberBand', 4000))
            .then((res) => res('animate__tada'));
    },
    { once: true },
);

const animationCssExampleSetAnimation = new AnimationAssistant(
    'animation-css-example-set-animation',
);
animationCssExampleSetAnimation.setLibrary('animate.css');
animationCssExampleSetAnimation.setAnimation(20, 'animate__backInRight');

const animationCssExampleSetAnimation2 = new AnimationAssistant(
    'animation-css-example-set-animation2',
);
animationCssExampleSetAnimation2.setLibrary('animate.css');
animationCssExampleSetAnimation2.adaptEnvironment();
animationCssExampleSetAnimation2.hideAtStart();
animationCssExampleSetAnimation2.setAnimation(20, 'animate__backInRight');

const animationCssExampleAddClasses = new AnimationAssistant('animation-css-example-add-classes');
animationCssExampleAddClasses.setLibrary('animate.css');
animationCssExampleAddClasses.addClasses(['animate__slower', 'animate__repeat-2']);
animationCssExampleAddClasses.adaptEnvironment();
animationCssExampleAddClasses.hideAtStart();
animationCssExampleAddClasses.setAnimation(20, 'animate__backInRight', () => {
    // something
});

// cssanimation
const cssAnimationExample = new AnimationAssistant('cssanimation-example');
cssAnimationExample.setLibrary('cssanimation');
cssAnimationExample.hideAtStart();
cssAnimationExample.setAnimation(80, 'swingInBottom');

const cssAnimationExampleInfinity = new AnimationAssistant('cssanimation-example-infinity');
cssAnimationExampleInfinity.setLibrary('cssanimation');
cssAnimationExampleInfinity.setAnimation(30, 'hu__hu__', () => {
    // something
});

const cssAnimationExampleBreak = new AnimationAssistant('cssanimation-example-break');
cssAnimationExampleBreak.setLibrary('cssanimation');
cssAnimationExampleBreak.setAnimation(30, 'leFadeInLeft');

const cssAnimationExampleSequence = new AnimationAssistant('cssanimation-example-sequence');
cssAnimationExampleSequence.setLibrary('cssanimation');
cssAnimationExampleSequence.setAnimation(30, 'leFadeInLeft');
