import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../libraries/animate.css.css';
import AnimationAssistant from '../../plugin/classes/AnimationAssistant/AnimationAssistant';

new AnimationAssistant([document.querySelector('.animation-assistant-development')])
    .setLibrary('animate.css')
    .setMiddleware('start', () => console.log('start'))
    .setMiddleware('beforeAnimation', () => console.log('before animation'))
    .setMiddleware('afterAnimation', () => console.log('after animation'))
    .setMiddleware('end', (elements) => {
        console.log('end');
        elements[0].textContent = 'Welcome to the Animation Assistant plugin development mod! ' +
            'You can change this file at your discretion to ' +
            'test the functionality of the plugin. Good luck and thanks!';
    })
    .setAnimation(0, 'animate__backInLeft', (event) => {
        console.log(event);

        return (element) => {
            console.log(element);
        };
    })
    .play('animate__wobble', 0)
    .play('animate__bounce', 500);
