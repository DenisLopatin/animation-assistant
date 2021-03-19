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

    const AnimationAssistant = require('AnimationAssistant');
    
ESM:

    import AnimationAssistant from 'AnimationAssistant';
    
First you need to get an instance of the class AnimationAssistant by calling the appropriate constructor and passing it the CSS selector of the animated elements. For example:

HTML

    <div class="forAnimation">  </div>
    
JavaScript

    const animation = new AnimationAssistant('forAnimation');
    
setLibrary - Prepares the selected CSS library for use. Mandatory method that sets the library you selected for working with animations by adding the necessary prefix to the animated elements. For example animation.setLibrary('animate.css') adds a prefix to the elements of one of the most famous CSS libraries for working with animations - animate__animated and will allow you to work with this library.

addClasses - Accepts an array with classes. Sometimes we need to add a number of additional classes to the elements. Let's say, following the example above - it can be animation.addClasses(['animate__slower', 'animate__repeat-2']), since we want the animation to be slow and repeat twice. You can see these classes for yourself on the official library page <a href="https://animate.style/">animation.css</a>. Different libraries have their own helper classes or helper classes, you can install them using this method. It is important to understand that they will be installed immediately, without starting from the position on the page, events, and other things.

hideAtStart - Hides the element until the animation starts. Sometimes it will be better to hide the element before the animation starts. For example, using the animation of the appearance of an element on the right, it will be strange to watch how the element is displayed on the page, then as you scroll to it, an event occurs and it disappears to pop up on the side. It is much better to hide it initially leaving an empty space where it was before the event was triggered. animation.hideAtStart() solves this problem.

adaptEnvironment - Adapts the element's environment for the animations to work correctly. When the CSS animation is played in place or appears on the left or top, the user does not experience any inconvenience. As soon as the animation starts to use the lower and right edges of the browser, going there at the end of the action or appearing from there, we may notice the appearance of a horizontal scroll or an increase in the length of the vertical scroll. The reason for this is that the element itself continues to take up space on the page, expanding the latter. For such animations to work correctly, you need to add overflow: hidden to the parent element, which is what this method does. If the parent of the animated element is a tag BODY, then this method creates a special stub for this case as well.

onPhone - Adjusts the screen resolution below which the animation will not be played. For example, an object when the method is called animation.onPhone(600) will not play animations if the user's screen resolution is below 600px. It will also return all the hidden elements by the function hideAtStart if they were active.

setAnimation - Configures the animation to work. The main method for working with animations. Accepts three parameters. offset - a number from 1 to 100 indicating the percentage distance from the animated element to the top edge of the browser window to trigger the animation. name - the name of the animation that the library provides. animationEnd - callback function that will be executed after the animation is completed. Examples are given below.

play - Starts the animation. Unlike setAnimation it starts the animation immediately without waiting for the action of any dibo event, but looking ahead - nothing will prevent you from coming up with such an event. Accepts two parameters. name - the name of the animation that the library provides. timeout - the time after which the next animation should start, with the default value of 2000ms. Note that the specified time in the parameter timeout it does not guarantee that the next animation will start after the time you specified or the default value if it was not set. It guarantees that the next animation will start no earlier than the time you specified. The method returns a promise. Examples are given below.
