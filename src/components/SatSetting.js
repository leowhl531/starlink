import React, {Component} from 'react';
import { InputNumber, Slider, Button} from 'antd';

class SatSetting extends Component {
    constructor() {
        super();
        this.state={
            observerLat: 0,
            observerLng: 0,
            observerElevation: 0,
            satAlt:90,
            duration:[0,90]
        }
    }
    render() {
        const durationMarkers={
            0:'0',
            90:'90'
        }
        return (
            <div className="sat-setting">
                <div className="loc-setting">
                    <p className="setting-label">From Location</p>
                    <div className="setting-list two-item-col">
                        <div className="list-item">
                            <label>Longitude:</label>
                            <InputNumber min={-180} max={180}
                                         defaultValue={0}
                                         style={{margin:"0 2px"}}
                                         onChange={this.onChangeLong} />

                        </div>
                        <div className="list-item righFt-item">
                            <label>Latitude:</label>
                            <InputNumber min={-90} max={90}
                                         defaultValue={0}
                                         style={{margin:"0 2px"}}
                                         onChange={this.onChangeLat} />

                        </div>


                    </div>
                    <div className="setting-list">
                        <div className="list-item">
                            <label>Elevation(meters):</label>
                            <InputNumber min={-413} max={8850}
                                         defaultValue={0}
                                         style={{margin:"0 2px"}}
                                         onChange={this.onChangeEle}
                            />
                        </div>
                    </div>
                    <div className="altitude-setting">
                        <p className="setting-label">
                            Restrictions
                        </p>
                        <div>
                            <span>Show only satellites which are higher than <br /> altitude</span>
                            <InputNumber min={0} max={90} defaultValue={0}
                                         style={{margin: "8px 2px 0"}}
                                         onChange={this.onChangeAlt}
                            />
                        </div>
                    </div>
                    <div className="duration-setting">
                        <p className="setting-label">Duration(sec):</p>
                        <Slider className="duration-slider" range step={1}
                                defaultValue={[0,90]} min={0} max={90}
                                marks={durationMarkers}
                                onChange={this.onDurationChange}
                        />
                    </div>
                </div>
                <div className="show-nearby">
                    <Button className="show-nearby-btn" size="large"
                            onClick={this.showSatellite}
                    >Find Nearby Satellites</Button>
                </div>
            </div>
        );
    }

    onChangeLong = e => {
        this.setState({
            observerLng:e
        })
        console.log(e);
    }
    onChangeLat = e =>{
        this.setState({
            observerLat:e
        })
        console.log(e);
    }
    onChangeEle = e => {
        this.setState({
            observerElevation:e
        })
        console.log(e);
    }
    onChangeAlt = e => {
        this.setState({
            satAlt: 90 - +e
        })
        console.log(e);
    }
    onDurationChange = e => {
        this.setState({
            duration: e
        })
        console.log('duration->', e);
    }
    showSatellite = e => {
        console.log(this.state);
        this.props.onShow(this.state);
    }
}

export default SatSetting;