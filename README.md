<h1 align='center'>
  React Simple Audio Player
</h1>

<p align='center'>
  <a href='https://www.npmjs.com/package/react-simple-audio-player'>
    <img src='https://img.shields.io/npm/v/react-player.svg' alt='Latest npm version'>
  </a>
  <a href='https://paypal.me/ckpt'>
    <img src='https://img.shields.io/badge/donate-PayPal-blue.svg' alt='Donate'>
  </a>
</p>

<p align='center'>
  A React component with graphics for paying audio files</a>
</p>

### Usage

```bash
npm install react-simple-audio-player --save
```

```js
import React, { Component } from 'react'
import PlayAudio from 'react-simple-audio-player'

class App extends Component {
  render () {
    return <PlayAudio url={this.state.url} width={45} />
  }
}
```

Demo page: [`https://cookpete.com/react-player`](https://cookpete.com/react-player)

The component parses a URL and loads in the appropriate markup and external SDKs to play media from [various sources](#supported-media). [Props](#props) can be passed in to control playback and react to events such as buffering or media ending. See [the demo source](https://github.com/CookPete/react-player/blob/master/src/demo/App.js) for a full example.

For platforms like [Meteor](https://www.meteor.com) without direct use of `npm` modules, a minified version of `ReactPlayer` is located in `dist` after installing. To generate this file yourself, checkout the repo and run `npm run build:dist`.

#### Polyfills

* If you are using `npm` and need to support [browsers without `Promise`](http://caniuse.com/#feat=promises) you will need a [`Promise` polyfill](https://github.com/stefanpenner/es6-promise).
* To support IE11 you will need to use [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill) or a similar ES2015+ polyfill.

### Props

Prop | Description | Default
---- | ----------- | -------
`url` | The url of an audio to play
`width` | Set the width of the player | `60px`
`simpleMode` | Set to `true` disable secons counter | `false`

#### Mobile considerations

Due to various restrictions, `ReactPlayer` is not guaranteed to function properly on mobile devices. The [YouTube player documentation](https://developers.google.com/youtube/iframe_api_reference), for example, explains that [certain mobile browsers require user interaction](https://developers.google.com/youtube/iframe_api_reference#Mobile_considerations) before playing:

> The HTML5 `<video>` element, in certain mobile browsers (such as Chrome and Safari), only allows playback to take place if it’s initiated by a user interaction (such as tapping on the player).
