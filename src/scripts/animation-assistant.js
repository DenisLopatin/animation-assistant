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
animationCssExampleAddClasses.setAnimation(20, 'animate__backInRight', function () {
    console.log(this);
});
