# Animation-Assistant

#### Plugin for managing animation on the site

### Installation

Install plugin:

    npm install animation-assistant --save

Usage npm:

    import AnimationAssisatant from 'animation-assistant'

Usage CommonJS:

    const AnimationAssisatant = require('animation-assistant');

### Getting start

Create an instance of the AnimationAssistant class:

    const animationAssistant = new AnimationAssistant([document.querySelector('selector')]);

The first argument should be `NodeListOf<HTMLElement> | HTMLElement[]`.
After that set a library:

    animationAssistant.setLibrary(library name);

Where «library name» - this is some kind of library that provides animation.
For example, at a minimum, you can count on the following libraries:

    animate.css
    animation.io 
    vivify
    magic.css 
    repaintless-css
    tuesday-css
    tachyons-animate
    woah.css

But this is not a complete list, the plugin can work with a huge number 
of animation libraries, even with your own, you just need to be aware 
of the pitfalls when working with the latest within the plugin.

After that, call the `setAnimation` method and pass the offset 
and the name of the animation:

    animationAssistant.setAnimation(0, 'animate__backInLeft');

This means that the animation will be displayed when moving from the 
top edge of the element to the visible screen by x percent. In this 
case, the animation will be played as soon as the element becomes 
visible, but you can set any value from 0 to 100.

Example for `animate.css` library:

    new AnimationAssistant([document.querySelector('.animation-assistant-block')])
        .setLibrary('animate.css')
        .setAnimation(0, 'animate__backInLeft')
        .catch(); // catch some error

### Advanced usage

You can pass the callback function to the setAnimation method which
will be called after the animation is played:

    new AnimationAssistant([document.querySelector('.animation-assistant-block')])
        .setLibrary('animate.css')
        .setAnimation(0, 'animate__backInLeft', (event) => {
            console.log(event);
        })
        .catch();

The function accepts an event object of the lost animation inside which
you can access the following information:

    isTrusted: bool
    animationName: string
    bubbles: bool
    cancelBubble: bool
    cancelable: bool
    composed: bool
    currentTarget: HTMLElement|null
    defaultPrevented: bool
    elapsedTime: bool
    eventPhase: int
    pseudoElement: string
    returnValue: bool
    srcElement: HTMLElement
    target: HTMLElement
    timeStamp: float
    type: string

This may be a good place to send a network request after playing the 
animation, for example:

    new AnimationAssistant([document.querySelector('.animation-assistant-block')])
        .setLibrary('animate.css')
        .setAnimation(0, 'animate__backInLeft', async() => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            console.log(data);
        })
        .catch();

You can also return a callback function from here, which will be 
called at the very end. The function takes as the only parameter 
the element on which the animation was played:

    new AnimationAssistant([document.querySelector('.animation-assistant-block')])
    .setLibrary('animate.css')
    .setAnimation(0, 'animate__backInLeft', () => {
        // some operations...

        return (element) => {
            console.log(element);
        }
    })
    .catch();

This can be useful in cases where you need to perform any manipulations
with an element after the animation or business logic in the first 
callback function has completed its work.

Note that you will not be able to return this function for a subsequent
call if you are working with an asynchronous function, as in the 
previous example, when we received users.

For convenience, you can put such functions in separate variables:

    const callback = () => {};
    
    new AnimationAssistant([document.querySelector('.animation-assistant-block')])
        .setLibrary('animate.css')
        .setAnimation(0, 'animate__backInLeft', callback)
        .catch();

Use `playback` to play the animation after playing the main animation:

    new AnimationAssistant([document.querySelector('.animation-assistant-block')])
        .setLibrary('animate.css')
        .setAnimation(0, 'animate__backInLeft', (event) => { // 1. the target animation will be performed first
            console.log(event);
            // 3. then we'll be here
            return (element) => console.log(element); // 4. and this will be done at the very end
        }, [['animate__wobble', 0], ['animate__bounce', 1500]]) // 2. then all the animations described in the parameter playback
        .catch();

`Playback` is an array where the first element is the name of the 
animation, the second element is the timer after which the 
animation should be performed:

    [['animate__wobble', 0], ['animate__bounce', 1500]]

The number of animations that playback can reproduce is limited 
only by common sense. They will always be executed sequentially 
without a race mechanism, so you can be sure that your element 
will be in a consistent state.

The setAnimation method will return a promise with an instance of 
the Playback object. You can use top level await and call them in 
a different way:

    const playback = await new AnimationAssistant([document.querySelector('.animation-assistant-block')])
        .setLibrary('animate.css')
        .setAnimation(0, 'animate__backInLeft');
    
    playback
        .play('animate__wobble', 1000)
        .play('animate__bounce', 1000)

Don't forget to remove the call `.catch();` in this case, so that the 
typing can work, and you get a hint.

You can also do this by calling the `then` method of the `promise` object:

    new AnimationAssistant([document.querySelector('.animation-assistant-block')])
        .setLibrary('animate.css')
        .setAnimation(0, 'animate__backInLeft')
        .then((playback) => {
            playback.play('animate__wobble', 1000);
            playback.play('animate__bounce', 1000);
        });

### Working with middleware

If you need to do any actions during the life cycle of the plugin, then
you can hook up to the four hooks and pass there the middleware 
function that will be performed at the start, before the main 
animation of the setAnimation method, after the main animation 
is performed, or after performing all the other functionality 
of the plugin.

For example, the following function passed to the `setMiddleware` method
will be executed at the very beginning:

    new AnimationAssistant([document.querySelector('.animation-assistant-block')])
    .setLibrary('animate.css')
    .setMiddleware('start', (elements) => {
        // elements - this is a list of all the elements that the current instance of the plugin works with
        console.log(elements);
        // this function will be called before any other actions
    })
    .setAnimation(0, 'animate__backInLeft')
    .catch();

There are 4 hooks in total:

    start - will be executed during initialization
    beforeAnimation - will be executed before the animation passed to the setAnimation method is triggered
    afterAnimation - will be executed after the animation passed to the setAnimation method is triggered
    end - it will be executed after all animations are triggered, but before the callback function passed to the setAnimation method is triggered

As a result, the entire life cycle will look like this:

    new AnimationAssistant([document.querySelector('.animation-assistant-block')])
        .setLibrary('animate.css')
        .setMiddleware('start', (elements) => {
            // 1. This function will be executed first
            console.log('start', elements);
        })
        .setMiddleware('beforeAnimation', (elements) => {
            // 2. Then this
            console.log('before animation', elements);
        })
        .setMiddleware('afterAnimation', (elements) => {
            // 4. Then this
            console.log('after animation', elements);
        })
        .setMiddleware('end', (elements) => {
            // 6. Then this
            console.log('end', elements);
        })
        // 3. Then the main animation will be played
        .setAnimation(0, 'animate__backInLeft', (event) => {
            // 7. Then the callback function will be executed
            console.log(event);
    
            return (element) => {
                // 8. This will be done at the very end
                console.log(element);
            };
        // 5. Then an additional animation will be played
        }, [['animate__wobble', 0], ['animate__bounce', 1500]])
        .catch();

In this example, synchronous functions are used as middleware, but you
can also use asynchronous calls. In this case, their order will not 
change and if one asynchronous operation lasts for a very long time,
other stages of the lifecycle will wait for its completion before 
starting to launch their functionality.

For example:

    new AnimationAssistant([document.querySelector('.animation-assistant-block')])
        .setLibrary('animate.css')
        .setMiddleware('start', async() => {
            // 1. let's assume it will last 20 seconds...
            const data = await (await fetch('https://jsonplaceholder.typicode.com/photos')).json();
            console.log(data);
        })
        .setMiddleware('afterAnimation', () => {
            // 3. if there is an asynchronous call, the playback will have to wait for its completion before starting the rest of the animations.
        })
        // 2. in this case, it will wait until the middleware from the start hook completes its work.
        .setAnimation(0, 'animate__backInLeft', () => {
            // 5. in the end
        }, [['animate__wobble', 0], ['animate__bounce', 1500]]) // 4. wait for afterAnimation
        .catch();

### Pitfalls

The plugin works with a huge number of animation libraries, but not all
of them are specified, so don't worry if you get a typing error trying
to pass to method `setLibrary` a library that is not specified there.

The main task of this method is to add the main class from the css 
animation library to the passed elements. For example, for 
animate.css, it will be the animate__animate class, which 
has the following styles for the element:

    animation-duration: 1s;
    animation-duration: var(--animate-duration);
    animation-fill-mode: both;

As you can see, only the basic styles are configured here. If you want
to try another animation library, you can find the main class from it 
and add it to the elements manually. In 99% of cases, the further work
of the plugin will be correct, since all it does is add a class to the
event. And it doesn't matter where you get this class from.

Exactly on the same principle, you can work with your animations.

But you may encounter two nuances:

1) Some css animation libraries use animations that work with a group 
of elements, that is, they break blocks by letters and animate each 
letter separately, which results in a wave effect. For example - `animation.io`.
At the moment there is no built-in functionality for implementing 
such animation through a plugin, but you can figure out how to 
implement it by hooking on hooks or simply organizing your 
structure in such a way that it becomes possible.
2) Be careful with endless animations, the `playback` mechanism uses 
the `animationend` event, and it won't work if the animation never ends.

Initially, the block is visible on the page, which means that with a 
slow connection, you will first see the block itself, then it will 
disappear and return with a certain animation. Or scrolling through 
the page, you will notice how the block was on it at first, and then
disappeared as the animation started working. To avoid this, hide 
the blocks when loading the page if necessary.

Animated blocks can extend beyond the screen, so you need to take care
of creating a container that would not allow horizontal or vertical 
scrolling to appear.
