import React, { Component } from "react";
import ReactPlayer from 'react-player';

const opts = {
    cx: 30,
    cy: 30,
    radius: 30,
    start_angle: 0,
};

const colorScale =
    [
        '#980000',
        '#fa0000',
        '#ffacac',
        '#ffe1e1',
        '#ffffff',
    ];

const initProgress = {
    loaded:0,
    loadedSeconds:0,
    played:0,
    playedSeconds:0
};

const progrssWidth = 0.3;

class PlayAudio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.polarToCartesian(opts.cx, opts.cy, opts.radius, 0),
            end: this.polarToCartesian(opts.cx, opts.cy, opts.radius, opts.start_angle),
            largeArcFlag: 0,
            playing: false,
            duration: 0,
            started: false,
            progress: initProgress,
            simpleMode: this.props.simpleMode?this.props.simpleMode:this.props.width<45?true:false,
            width: this.props.width?this.props.width:60,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleOnProgress = this.handleOnProgress.bind(this);
        this.handleOnDuration = this.handleOnDuration.bind(this);
        this.handleOnEnded = this.handleOnEnded.bind(this);
    }

    handleOnDuration(data){
        this.setState({ duration: data })
    }

    handleOnProgress(data){
        var newStart = this.polarToCartesian(opts.cx, opts.cy, opts.radius, data.played*360);
        var newLargeArcFlag = data.played*360 - opts.start_angle <= 180 ? "0" : "1";

        this.setState((prevState,props)=>{
            if(prevState.progress.played < data.played && prevState.started == true)
                return {progress:data, start:newStart, largeArcFlag:newLargeArcFlag};
        });
    }

    handleClick(){
        var playing = this.state.playing;
        this.setState({ playing: !playing, started: true })
    }

    handleOnEnded(){
        var newStart = this.polarToCartesian(opts.cx, opts.cy, opts.radius, 0);
        this.setState({progress:initProgress, start:newStart, largeArcFlag:0, playing: false, started: false })
    }

    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    getPlaySection(position, width, colors){
        return(
            <svg x={position.x} y={position.y} width={width} viewBox={"0 0 " + opts.radius*2 +" " + opts.radius*2}  xmlns="http://www.w3.org/2000/svg" >
                <g >
                    <polygon style={{display:this.state.playing?'none':true}} points={((x, y, size)=>{
                        var cord1 = this.polarToCartesian(x, y, size, 90);
                        var cord2 = this.polarToCartesian(x, y, size, 210);
                        var cord3 = this.polarToCartesian(x, y, size, 330);

                        return [
                            cord1.x,cord1.y,
                            cord2.x,cord2.y,
                            cord3.x,cord3.y
                    ].join(" ");
                    })(opts.radius, opts.radius, 18)} fill={colors[1]} />
                </g>
            </svg>);
    }

    getPauseSection(position, width, colors){
        return(
            <svg x={position.x} y={position.y} width={width} viewBox={"0 0 " + opts.radius*2 +" " + opts.radius*2}  xmlns="http://www.w3.org/2000/svg" >
                <g >
                    {this.getRectangle(19,15,7,30, colors[1])}
                    {this.getRectangle(34,15,7,30, colors[1])}
                </g>
            </svg>);
    }

    getRectangle(x, y, width, height, color) {
        return <polygon points={[
            x,y,
            x+width,y,
            x+width,y+height,
            x,y+height
        ].join(" ")} fill={color} />;
    }

    getProgressSection(position, width, colors){
        return(
            <svg x={position.x} y={position.y} width={width} viewBox={"0 0 " + opts.radius*2 +" " + opts.radius*2}  xmlns="http://www.w3.org/2000/svg" >
                <g >
                    <text style={{display:this.state.playing?true:'none' }} y={opts.radius + 4} transform="translate(30)">
                        <tspan fill={colorScale[0]} style={{fontSize:"12pt", fontFamily:"Verdana"}} x="0" textAnchor="middle">{this.formatTime(this.state.progress.playedSeconds)}</tspan>
                    </text>
                </g>
            </svg>);
    }

    formatTime (timeInSeconds){
        var m = Math.floor(timeInSeconds/60);
        var s = Math.floor(timeInSeconds%60);
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    }

    render() {
        return (<div>
                <svg onClick={this.handleClick} width={this.state.width} height={this.state.width} style={{textAlign:"center", verticalAlign:"center", cursor:this.state.playing?"progress":"pointer"}} viewBox={"0 0 " + opts.radius*2 +" " + opts.radius*2}
                xmlns="http://www.w3.org/2000/svg" >
                    <g>
                        <circle r={opts.radius} id="svg_1" cy={opts.radius} cx={opts.radius} fill={colorScale[1]}/>
                        <path fill={colorScale[0]} d={[
                                                "M", this.state.start.x, this.state.start.y,
                                                "A", opts.radius, opts.radius, 0, this.state.largeArcFlag, 0, this.state.end.x, this.state.end.y,
                                                "L", opts.cx, opts.cy,
                                                "Z"
                                            ].join(" ")}>
                        </path>
                        <circle r={opts.radius*(1-progrssWidth)} id="svg_2" cy={opts.radius} cx={opts.radius} fill={colorScale[4]}/>
                        <circle r={opts.radius*(1-progrssWidth)-2} id="svg_3" cy={opts.radius} cx={opts.radius} fill={colorScale[3]}/>
                        <path d={((x, y, size)=>{
                            var startCord = this.polarToCartesian(x, y, size, 90);
                            var endCord = this.polarToCartesian(x, y, size, 270);
                            return [
                                "M", startCord.x, startCord.y,
                                "A", size, size, 0, this.state.largeArcFlag, 0, endCord.x, endCord.y,
                                "L", x, y,
                                "Z"
                            ].join(" ");
                        })(opts.radius, opts.radius, opts.radius*(1-progrssWidth)-2)} fill={'#ffc7c7'} />
                        {this.state.playing
                            ?this.state.simpleMode
                                ?this.getPauseSection({x:(opts.radius-opts.radius*(1-progrssWidth))+2, y:0}, opts.radius*(1-progrssWidth)*2-4, [colorScale[2],colorScale[0]])
                                :this.getProgressSection({x:(opts.radius-opts.radius*(1-progrssWidth))+2, y:0}, opts.radius*(1-progrssWidth)*2-4, [colorScale[2],colorScale[0]])
                            :this.getPlaySection({x:(opts.radius-opts.radius*(1-progrssWidth))+2, y:0}, opts.radius*(1-progrssWidth)*2-4, [colorScale[2],colorScale[0]])
                        }
                    </g>
                </svg>
                <ReactPlayer
					style={{display:"none"}}
                    progressInterval={1000}
                    onProgress={this.handleOnProgress}
                    url={this.props.url}
                    playing={this.state.playing}
                    onDuration={this.handleOnDuration}
                    onEnded={this.handleOnEnded}
                />
            </div>
        )
    }
}

export default PlayAudio