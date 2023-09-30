import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../libraries/animate.css.css';
import AnimationAssistant from '../../plugin/classes/AnimationAssistant/AnimationAssistant';

new AnimationAssistant([document.querySelector('.animation-assistant-development')])
    .setLibrary('animate.css')
    .setMiddleware('start', () => console.log('start'))
    .setMiddleware('beforeAnimation', () => console.log('before animation'))
    .setMiddleware('afterAnimation', () => console.log('after animation'))
    .setMiddleware('end', (element) => {
        console.log('end');
        element.textContent = 'Welcome to the Animation Assistant plugin development mod! ' +
            'You can change this file at your discretion to ' +
            'test the functionality of the plugin. Good luck and thanks!';
    })
    .setAnimation(0, 'animate__backInLeft', (event) => {
        console.log(event);

        return (element) => {
            console.log(element);
        };
    }, [['animate__wobble', 0], ['animate__bounce', 1500]])
    .catch();
