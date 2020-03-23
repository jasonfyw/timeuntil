import React, { Component } from 'react';

import './Background.css';
import video_hk1 from '../media/HK1.mp4';
import video_koreajapan from '../media/KoreaJapan.mp4'; 
import video_la1 from '../media/LA1.mp4';
import video_sf1 from '../media/SF1.mp4';

class Background extends Component {
    state = {
        loading: true
    }


    selectVideo = () => {
        // Selects a random video depending on the time of day
        let time = new Date().getHours();
        let dayVideos = [video_la1, video_sf1, video_hk1];
        let selectedVideoSource = time > 22 || time < 5 ? video_koreajapan : dayVideos[Math.floor(Math.random() * dayVideos.length)];
        this.setState({ videoSource: selectedVideoSource });
    }

    componentDidMount() {
        if (this.video) {
            this.video.addEventListener("loadeddata", () => {
                this.setState({ loading: false })
            });
        }
        this.selectVideo();
    }
    componentWillUnmount() {
        if (this.video) {
            this.video.removeEventListener("loadeddata", () => {});
        }
    }


    render() {
        let videoClass = this.props.videoClass;
        let videoSource = this.state.videoSource;

        return (
            <video
                className={videoClass}
                ref={ref => (this.video = ref)}
                autoPlay
                muted
                loop
                style={{
                    opacity: this.state.loading ? 0 : 1,
                    transition: "opacity, 2s ease-in-out"
                }}
            >
                <source src={videoSource} type="video/mp4"></source>
            </video>
        );
    }
}

export default Background;