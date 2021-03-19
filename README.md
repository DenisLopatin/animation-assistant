# Animation Assistant

It is better to read the full documentation on the site:

EN:

<a href="https://denislopatin.github.io/Animation-Assistant-documentation/en-index.html">EN Documentation</a>

RU:

<a href="https://denislopatin.github.io/Animation-Assistant-documentation/ru-index.html">RU Documentation</a>

## Introduction

Plugin animation-assistant plugin is designed to help you manage animations on your site. It works with many well-known CSS animation libraries:

Pay attention to the versions of the libraries listed below, if you are working with an outdated version of the library, then this plugin may not work correctly or stop working at all.

* animate.css 4.0.0^
* cssanimation 1.0.0^
* hover.css 2.0.0^
* CSShake 1.5.0^
* magic.css 1.1.0^
* tuesday 1.2.0^
* repaintless 1.3.0^
* Perhaps your favorite CSS animation library

The plugin helps to integrate them into the site by providing ready made JavaScript functions to work with them.

## Getting started

Install the plugin in your project using NPM

    npm install --save animation-assistant
    
Connect it in a convenient way:

CommonJS:

    const AnimationAssistant = require('animation-assistant').default;
    
ESM:

    import AnimationAssistant from 'animation-assistant';
    
First you need to get an instance of the class AnimationAssistant by calling the appropriate constructor and passing it the CSS selector of the animated elements. For example:

HTML

    <div class="forAnimation">  </div>
    
JavaScript

    const animation = new AnimationAssistant('forAnimation');
    
setLibrary - Prepares the selected CSS library for use. Mandatory method that sets the library you selected for working with animations by adding the necessary prefix to the animated elements.

addClasses - Accepts an array with classes. Different libraries have their own helper classes or helper classes, you can install them using this method. It is important to understand that they will be installed immediately, without starting from the position on the page, events, and other things.

hideAtStart - Hides the element until the animation starts.

adaptEnvironment - Adapts the element's environment for the animations to work correctly.

setAnimation - Configures the animation to work. The main method for working with animations. Accepts three parameters. offset - a number from 1 to 100 indicating the percentage distance from the animated element to the top edge of the browser window to trigger the animation. name - the name of the animation that the library provides. animationEnd - callback function that will be executed after the animation is completed. Examples are given below.

play - Starts the animation. Unlike setAnimation it starts the animation immediately without waiting for the action of any dibo event, but looking ahead - nothing will prevent you from coming up with such an event. Accepts two parameters. name - the name of the animation that the library provides. timeout - the time after which the next animation should start, with the default value of 2000ms. Note that the time specified in the timeout parameter does not guarantee that the next animation will start after the time you specified, or the default value if it was not set. This ensures that the next animation doesn't start until the time you specify. The method returns a promise. Examples are given below.
