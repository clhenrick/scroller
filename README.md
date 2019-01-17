<h1 align="center">
  @newswire/scroller
</h1>
<p align="center">
  <a href="https://www.npmjs.org/package/@newswire/scroller"><img src="https://badgen.net/npm/v/@newswire/scroller" alt="npm"></a>
  <a href="https://david-dm.org/rdmurphy/scroll"><img src="https://badgen.net/david/dep/rdmurphy/scroll" alt="dependencies"></a>
  <a href="https://unpkg.com/@newswire/scroller/dist/index.umd.js"><img src="https://badgen.net/badgesize/gzip/https://unpkg.com/@newswire/scroller/dist/index.umd.js" alt="gzip size"></a>
  <a href="https://unpkg.com/@newswire/scroller/dist/index.umd.js"><img src="https://badgen.net/badgesize/brotli/https://unpkg.com/@newswire/scroller/dist/index.umd.js" alt="brotli size"></a>
  <a href="https://packagephobia.now.sh/result?p=@newswire/scroller"><img src="https://badgen.net/packagephobia/install/@newswire/scroller" alt="install size"></a>
</p>

`@newswire/scroller` is a super-tiny library for your scrollytelling needs.

## Key features

- 🐜 **Less than 560 bytes** gzipped
- 👀 Uses a highly-performant **[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)** to monitor scrolling changes
- 🙅🏽‍ **No dependencies** (unless you need an [**Intersection Observer** polyfill](#intersection-observer-polyfill) - get it together, Safari!)

## Examples

- [Basic](https://rdmurphy.github.io/scroller/basic)
- [Sticky graphic](https://rdmurphy.github.io/scroller/sticky)

## Installation

`@newswire/scroller` is available via `npm`.

```sh
npm install @newswire/scroller
```

You can also use it directly via [unpkg.com](https://unpkg.com/).

```html
<script src="https://unpkg.com/@newswire/scroller/dist/index.umd.js"></script>
<!-- Now available at `window.Scroller` -->
```

You can also import it as a module via unpkg!

```html
<script type="module">
  import Scroller from 'https://unpkg.com/@newswire/scroller/dist/index.mjs';

  const scroller = new Scroller({ selector: '.scene' });
</script>
```

## Usage

Assume for the following examples that our HTML is as follows:

```html
<div class="container">
  <div class="scene"></div>
  <div class="scene"></div>
  <div class="scene"></div>
  <div class="scene"></div>
  <div class="scene"></div>
</div>
```

To begin tracking the progression of the scenes, we need to set up our `Scroller`.

```js
import Scroller from '@newswire/scroller';

// sets up the scroller instance, pass in the `selector` to find all the scenes
const scroller = new Scroller({ selector: '.scene' });

// Scroller has a tiny event emitter embedded in it!

// the `enter` event is triggered every time a scene crosses the threshold
scroller.on('enter', d => {
  d.element.classList.add('active');
});

// the `exit` event is triggered every time a scene exits the threshold
scroller.on('exit', d => {
  d.element.classList.remove('active');
});

scroller.on('init', () => {
  console.log('Everything is ready to go!');
});

// starts up the IntersectionObserver
scroller.init();
```

## Known quirks

### iOS Safari

Due to how iOS Safari does not support Intersection Observer (yet), its calculation of distance from the top/bottom of the page is a little funky due to the disappearing/reappearing bars as you scroll. Practically this won't matter (it's triggering in a consistent way, just not exactly how you'd expect), but it may drive you mad if you're looking at the examples and are baffled as to why it's not synced up pefectly.

## Intersection Observer polyfill?

To keep the library lean, `@newswire/scroller` intentionally does not attempt to polyfill `IntersectionObserver` and leaves that task up to the user if necessary. Browser support is actually [pretty good](https://caniuse.com/#feat=intersectionobserver)! But our friends using Safari (both desktop and iOS) still need a polyfill for `@newswire/scroller` to work. (Good news! [They're working on it](https://bugs.webkit.org/show_bug.cgi?id=159475).)

There are a few good ways to ensure the polyfill is in place.

### Load it within your bundle

The spec-based Intersection Observer polyfill is [available on `npm`](https://www.npmjs.com/package/intersection-observer).

```sh
npm install intersection-observer
```

Once that is installed, you need to make sure that it is loaded before any code that'd depends on it will run. The polyfill is smart - it won't affect browsers who already have support!

```js
import 'intersection-observer';
// or
require('intersection-observer');

// your awesome code here!
```

### Load it with [`polyfill.io`](https://polyfill.io/v3/)

Before loading your scripts, you can include a link to [`polyfill.io`](https://polyfill.io/v3/). This service uses signals from the browser to determine what polyfills are needed and loads them in the environment. You can set flags on the URL to limit what `polyfill.io` attempts to load.

```html
<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>
<script src="<your-code>"></script>
```

### Load it with [`unpkg.com`](https://unpkg.com)

This is similar to the `polyfill.io` method, but without a service in-between determining whether it is necessary. (Every browser will get the code! But it still checks if the browser supports `IntersectionObserver` before activating.)

```html
<script src="https://unpkg.com/intersection-observer/intersection-observer"></script>
<script src="<your-code>"></script>
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [Scroller](#scroller)
  - [Parameters](#parameters)
  - [Properties](#properties)
  - [Examples](#examples)
  - [on](#on)
    - [Parameters](#parameters-1)
    - [Examples](#examples-1)
  - [off](#off)
    - [Parameters](#parameters-2)
    - [Examples](#examples-2)
  - [init](#init)
    - [Examples](#examples-3)
- [Scroller#enter](#scrollerenter)
  - [Properties](#properties-1)
- [Scroller#exit](#scrollerexit)
  - [Properties](#properties-2)
- [Scroller#init](#scrollerinit)

### Scroller

Uses Intersection Observer to monitor the page location of a series of
elements for scrollytelling.

#### Parameters

- `options` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**
  - `options.offset` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** How far from the top/bottom of the viewable
    area to trigger enters/exits of scenes, represented as a value between
    0 and 1 (optional, default `0.5`)
  - `options.selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The CSS selector to pass to
    querySelectorAll to find all of the scenes

#### Properties

- `observer` **(IntersectionObserver | null)** Once initialized, a reference
  to the Scroller's instance of IntersectionObserver
- `scenes` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Element](https://developer.mozilla.org/docs/Web/API/Element)>** All of the elements found by Scroller after it
  was initialized

#### Examples

```javascript
import Scroller from '@newswire/scroller';

const scroller = new Scroller({ selector: '.scene' });
scroller.init();
```

#### on

Adds a callback to the queue of a given event listener.

##### Parameters

- `type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the event
- `handler` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Callback function added to the listener

##### Examples

```javascript
const scroller = new Scroller({ selector: '.scene' });

const fn = (...) => {...};

// adds callback to listener
scroller.on('enter', fn);
```

Returns **void**

#### off

Removes a callback from the queue of a given event listener.

##### Parameters

- `type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the event
- `handler` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Callback function removed from the listener

##### Examples

```javascript
const scroller = new Scroller({ selector: '.scene' });

const fn = (...) => {...};

// adds callback to listener
scroller.on('enter', fn);

// removes callback from listener
scroller.off('enter', fn);
```

Returns **void**

#### init

Initializes a Scroller's IntersectionObserver on a page and begins sending
any intersection events that occur.

##### Examples

```javascript
const scroller = new Scroller({ selector: '.scene' });

scroller.init();
```

Returns **void**

### Scroller#enter

Enter event. Fires whenever a scene begins intersecting.

Type: [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

- `bounds` **DOMRectReadOnly** The bounds of the active element
- `element` **[Element](https://developer.mozilla.org/docs/Web/API/Element)** The element that intersected
- `index` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The index of the active element
- `isScrollingDown` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether the user triggered this element
  while scrolling down or not

### Scroller#exit

Exit event. Fires whenever a scene has exited.

Type: [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

- `bounds` **DOMRectReadOnly** The bounds of the exiting element
- `element` **[Element](https://developer.mozilla.org/docs/Web/API/Element)** The element that exited
- `index` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The index of the exiting element
- `isScrollingDown` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether the user triggering the exit
  while scrolling down or not

### Scroller#init

Init event. Fires once Scroller has finished setting up.

## License

MIT