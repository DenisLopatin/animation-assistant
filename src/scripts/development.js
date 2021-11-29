import '../index.html';
import 'animate.css/animate.min.css';
import 'hover.css/css/hover-min.css';
import 'csshake/dist/csshake.min.css';
import 'magic.css/dist/magic.min.css';
import 'repaintless/repaintless-css/repaintless.min.css';
import AnimationAssistant from './AnimationAssistant';

// animate.css
const animationCssExamplePlay = new AnimationAssistant('animation-css-example-play');
animationCssExamplePlay.setLibrary('animate.css');

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
animationCssExampleSetAnimation.setAnimation(40, 'animate__backInRight');

const animationCssExampleSetAnimation2 = new AnimationAssistant(
    'animation-css-example-set-animation2',
);
animationCssExampleSetAnimation2.setLibrary('animate.css');
animationCssExampleSetAnimation2.adaptEnvironment();
animationCssExampleSetAnimation2.hiddenLaunch();
animationCssExampleSetAnimation2.setAnimation(40, 'animate__backInRight');

new AnimationAssistant('animation-css-example-add-classes')
    .setLibrary('animate.css')
    .addClasses(['animate__slow'])
    .adaptEnvironment()
    .hiddenLaunch()
    .setAnimation(30, 'animate__bounceInLeft', () => {
        // ваш код, который будет выполнен после завершения анимации 'animate__bounceInLe'
        // выполнится единожды, даже если задано повторение анимации
        // например при помощи класса animate__repeat-2 библиотеки animate.css
        // помните, что если анимация находится в бесконечном режиме (infinity),
        // то этот код не выполнится никогда
        return () => {
            // этот код будет выполнен самым последним после выполнения всего кода
            // включая метод 'play' и все его 'then'
        };
    })
    .play('animate__bounce', 1500)
    .then((res) => res('animate__jello', 2500))
    .then((res) => res('animate__flipOutX'));

// // cssanimation
// const cssAnimationExample = new AnimationAssistant('cssanimation-example');
// cssAnimationExample.setLibrary('css-animation');
// cssAnimationExample.hideAtStart();
// cssAnimationExample.setAnimation(20, 'swingInBottom');
//
// const cssAnimationExampleInfinity = new AnimationAssistant('cssanimation-example-infinity');
// cssAnimationExampleInfinity.setLibrary('css-animation');
// cssAnimationExampleInfinity.setAnimation(20, 'hu__hu__', () => {
//     // something
// });
//
// const cssAnimationExampleBreak = new AnimationAssistant('cssanimation-example-break');
// cssAnimationExampleBreak.setLibrary('css-animation');
// cssAnimationExampleBreak.setAnimation(20, 'leFadeInLeft');
//
// const cssAnimationExampleSequence = new AnimationAssistant('cssanimation-example-sequence');
// cssAnimationExampleSequence.setLibrary('css-animation');
// cssAnimationExampleSequence.setAnimation(20, 'leFadeInLeft');
//
// // hover.css
// const hoverCss = new AnimationAssistant('hover-css');
// hoverCss.play('hvr-bounce-in', 0).catch((err) => {
//     throw new Error(err);
// });
//
// const hoverCssToLeft = new AnimationAssistant('hover-css-to-left');
// hoverCssToLeft.play('hvr-bounce-to-left', 0).catch((err) => {
//     throw new Error(err);
// });
//
// const hoverCssCurlTopRight = new AnimationAssistant('hover-css-curl-top-right');
// hoverCssCurlTopRight.play('hvr-curl-top-right', 0).catch((err) => {
//     throw new Error(err);
// });
//
// const hoverCssSetAnimation = new AnimationAssistant('hover-css-set-animation');
// hoverCssSetAnimation.setAnimation(100, 'hvr-wobble-top', () => {
//     // something
// });
//
// // CSShake
// const cssShake = new AnimationAssistant('css-shake');
// cssShake.setLibrary('css-shake');
// cssShake.play('shake-slow', 0).catch((err) => {
//     throw new Error(err);
// });
//
// const cssShakeChunk = new AnimationAssistant('css-shake-chunk');
// cssShakeChunk.addClasses(['shake-constant']);
// cssShakeChunk.setAnimation(20, 'shake-chunk', () => {
//     // этот код не выполнится никогда
//     // так как анимация никогда не закончится
// });
//
// // magic.css
// const magicCss = new AnimationAssistant('magic-css');
// magicCss.setLibrary('magic.css');
// magicCss.hideAtStart();
// magicCss.setAnimation(20, 'slideDownReturn');
//
// // repaintless-css
// const repaintlessCss = new AnimationAssistant('repaintless-css');
// repaintlessCss.setLibrary('repaintless-css');
// repaintlessCss.hideAtStart();
// repaintlessCss.setAnimation(20, 'slide-from-top');
//
// // tuesday
// const tuesdayCss = new AnimationAssistant('tuesday-css');
// tuesdayCss.setLibrary('tuesday-css');
// tuesdayCss.hideAtStart();
// tuesdayCss.setAnimation(20, 'tdPlopIn');
