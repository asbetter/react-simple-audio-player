import React, { Component } from 'react'
import ReactPlayer from 'react-player'

const radius = 300

const initProgress = {
  loaded: 0,
  loadedSeconds: 0,
  played: 0,
  playedSeconds: 0
}

const centerWidth = 0.75
const border = 0.1 * radius

export default class PlayAudio extends Component {
  constructor (props) {
    super(props)

    this.state = {
      playProgressAngle: 0,
      seekSearchArcAngle: 0,
      playing: false,
      progress: initProgress,
      simpleMode: this.props.simpleMode ? this.props.simpleMode : this.props.width < 45,
      width: this.props.width ? this.props.width : 60,
      showPauseOnHover: false
    }

    this.player = React.createRef()

    this.handlePauseOnClick = this.handlePauseOnClick.bind(this)
    this.handleOnProgress = this.handleOnProgress.bind(this)
    this.handleOnEnded = this.handleOnEnded.bind(this)
    this.handleOnSeekChange = this.handleOnSeekChange.bind(this)
    this.handleOnSeekSearch = this.handleOnSeekSearch.bind(this)
    this.handleRemoveSeekSearch = this.handleRemoveSeekSearch.bind(this)
    this.handleShowPauseButton = this.handleShowPauseButton.bind(this)
    this.handleHidePauseButton = this.handleHidePauseButton.bind(this)

    this.colorScale = this.props.colorScale ? this.props.colorScale
      : [
        '#980000',
        '#fa0000',
        '#ffc7c7',
        '#ffe1e1',
        '#ffffff'
      ]
  }

  handleOnProgress (data) {
    this.setState({playProgressAngle: data.played * 360, progress: data})
  }

  handlePauseOnClick () {
    this.setState((prevState) => {
      return {playing: !prevState.playing}
    })
  }

  handleOnEnded () {
    this.setState({progress: initProgress, playProgressAngle: 0, playing: false})
  }

  handleOnSeekSearch (data) {
    var angle = this.getSeekAngel(data)
    this.setState({seekSearchArcAngle: angle})
  }

  getSeekAngel (data) {
    var elemCord = data.target.getBoundingClientRect()
    var center = this.state.width / 2
    var svgX = data.clientX - elemCord.x - center
    var svgY = center - data.clientY + elemCord.y
    var r = Math.sqrt(Math.pow(svgX, 2) + Math.pow(svgY, 2))

    var angle = svgY < 0
      ? radiansToDegrees(Math.acos(svgX / r)) + 90
      : svgX < 0
        ? radiansToDegrees(Math.asin(svgY / r)) + 270
        : radiansToDegrees(Math.asin(svgX / r))

    return angle

    function radiansToDegrees (angleInRadians) {
      return angleInRadians * 180 / Math.PI
    }
  }

  handleRemoveSeekSearch () {
    this.setState({seekSearchArcAngle: 0})
  }

  handleOnSeekChange (data) {
    var angle = this.getSeekAngel(data)
    this.player.current.seekTo(angle / 360)
    this.setState({playProgressAngle: angle})
  }

  polarToCartesian (centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    }
  }

  handleShowPauseButton () {
    this.setState({showPauseOnHover: true})
  }

  handleHidePauseButton () {
    this.setState({showPauseOnHover: false})
  }

  getPlaySection (position, width) {
    return (
      <svg x={position.x} y={position.y} width={width} viewBox={'0 0 ' + radius * 2 + ' ' + radius * 2}
        xmlns='http://www.w3.org/2000/svg'>
        <g>
          <polygon style={{display: this.state.playing ? 'none' : true}} points={((size) => {
            var cord1 = this.polarToCartesian(radius, radius, size, 90)
            var cord2 = this.polarToCartesian(radius, radius, size, 210)
            var cord3 = this.polarToCartesian(radius, radius, size, 330)

            return [
              cord1.x, cord1.y,
              cord2.x, cord2.y,
              cord3.x, cord3.y
            ].join(' ')
          })(radius * 3 / 5)} fill={this.colorScale[0]} />
        </g>
      </svg>)
  }

  getPauseSection (position, width) {
    var elemHeight = radius
    var elemWidth = Math.floor(radius / 4)
    var space = Math.floor(radius / 8)
    return (
      <svg x={position.x} y={position.y} width={width} viewBox={'0 0 ' + radius * 2 + ' ' + radius * 2}
        xmlns='http://www.w3.org/2000/svg'>
        <g>
          {this.getRectangle(radius - elemWidth - space, elemHeight / 2, elemWidth, elemHeight, this.colorScale[0])}
          {this.getRectangle(radius + space, elemHeight / 2, elemWidth, elemHeight, this.colorScale[0])}
        </g>
      </svg>)
  }

  getRectangle (x, y, width, height, color) {
    return <polygon points={[
      x, y,
      x + width, y,
      x + width, y + height,
      x, y + height
    ].join(' ')} fill={color} />
  }

  getProgressSection (position, width) {
    return (
      <svg x={position.x} y={position.y} width={width} viewBox={'0 0 ' + radius * 2 + ' ' + radius * 2}
        xmlns='http://www.w3.org/2000/svg'>
        <g>
          <text style={{display: this.state.playing ? true : 'none'}} y={radius * 1.20}
            transform={'translate(' + radius + ')'}>
            <tspan fill={this.colorScale[0]}
              style={{fontSize: radius / 2, lineHeight: radius / 2, fontFamily: 'Verdana'}} x='0'
              textAnchor='middle'>{this.formatTime(this.state.progress.playedSeconds)}</tspan>
          </text>
        </g>
      </svg>)
  }

  formatTime (timeInSeconds) {
    var m = Math.floor(timeInSeconds / 60)
    var s = Math.floor(timeInSeconds % 60)
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    return m + ':' + s
  }

  getCircle (x, y, r, color) {
    return (<circle r={r} cy={x} cx={y} fill={color} />)
  }

  getProgressArc (x, y, r, color, startAngle, endAngle) {
    var startCord = this.polarToCartesian(x, y, r, startAngle)
    var endCord = this.polarToCartesian(x, y, r, endAngle)
    var playProgressArcFlag = endAngle < 180 ? 0 : 1

    return (<path fill={color} d={[
      'M', endCord.x, endCord.y,
      'A', r, r, 0, playProgressArcFlag, 0, startCord.x, startCord.y,
      'L', x, y,
      'Z'
    ].join(' ')} />)
  }

  render () {
    return (<div>
      <svg width={this.state.width} height={this.state.width}
        style={{textAlign: 'center', verticalAlign: 'center', cursor: 'pointer'}}
        viewBox={'0 0 ' + radius * 2 + ' ' + radius * 2}
        xmlns='http://www.w3.org/2000/svg'>
        <g>
          {this.getCircle(radius, radius, radius, this.colorScale[1])}
          {(this.state.progress.played === 0) ? null
            : this.getProgressArc(radius, radius, radius, this.colorScale[0], 0, this.state.playProgressAngle)
          }
        </g>
        <g fillOpacity='0' onClick={this.handleOnSeekChange} onMouseLeave={this.handleRemoveSeekSearch}
          onMouseMove={this.handleOnSeekSearch}>
          {this.getCircle(radius, radius, radius, null)}
        </g>
        <g>
          {this.getCircle(radius, radius, radius * centerWidth, this.colorScale[4])}
        </g>
        <g fillOpacity='0.5'>
          {this.getProgressArc(radius, radius, radius * centerWidth, this.colorScale[0], 0, this.state.seekSearchArcAngle)}
        </g>
        <g onClick={this.handlePauseOnClick} onMouseOver={this.handleShowPauseButton}
          onMouseLeave={this.handleHidePauseButton}>
          {this.getCircle(radius, radius, radius * centerWidth - border, this.colorScale[3])}
          {this.getProgressArc(radius, radius, radius * centerWidth - border, this.colorScale[2], 90, 270)}
          {this.state.playing
            ? (this.state.simpleMode || (this.state.showPauseOnHover) || (this.state.progress.played === 0))
              ? this.getPauseSection({
                x: (radius - radius * centerWidth) + border,
                y: 0
              }, (radius * centerWidth - border) * 2)
              : this.getProgressSection({
                x: (radius - radius * centerWidth) + border,
                y: 0
              }, (radius * centerWidth - border) * 2)
            : this.getPlaySection({
              x: (radius - radius * centerWidth) + border,
              y: 0
            }, (radius * centerWidth - border) * 2)
          }
        </g>
      </svg>
      <ReactPlayer
        ref={this.player}
        style={{display: 'none'}}
        progressInterval={1000}
        onProgress={this.handleOnProgress}
        url={this.props.url}
        playing={this.state.playing}
        onEnded={this.handleOnEnded}
      />
    </div>
    )
  }
}
