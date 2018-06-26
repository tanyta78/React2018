import React from 'react';
import fetcher from '../../fetcher';

const IMAGE_URL = '/episodePreview/';

export default class Slider extends React.Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            imageUrl: null
        };
    }

    fetchEpisode = (id) => 
        fetcher.get(
            IMAGE_URL + id, 
            data => this.setState({
                id: data.id,
                imageUrl: data.url
            }));

    componentDidMount = () => 
        this.fetchEpisode(this.state.id);

    nextEpisode = () => 
        this.fetchEpisode(this.state.id + 1);

    previousEpisode = () => 
        this.fetchEpisode(this.state.id - 1);

    render = () => (
            <section id="slider">
                <img className="button" src="/left.png" title="previous" alt="nav" onClick={this.previousEpisode} />
                <div className="image-container">
                    <img src={this.state.imageUrl} alt="episode" />
                </div>
                <img className="button" src="/right.png" title="previous" alt="nav" onClick={this.nextEpisode} />
            </section>
        );
}