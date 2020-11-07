import React, {Component} from 'react';
import axios from 'axios';
import {NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY} from '../constants';
import SatSetting from './SatSetting'
import SatelliteList from "./SatelliteList";
import WorldMap from "./WorldMap";

class Main extends Component {
    constructor() {
        super();
        this.state={
            satInfo: null,
            setting: null,
            isLoadingList: false

        }
    }


    render() {
        console.log(this.state.satInfo)
        const {isLoadingList, satInfo} = this.state;
        return (
            <div className="main">
                <div className="left-side">
                    <SatSetting onShow={this.showNearbySatellite}/>
                    <SatelliteList isLoad={isLoadingList}
                                   satInfo={satInfo}
                                   onShowMap={this.showMap}
                    />
                </div>
                <div className="right-side">
                    <WorldMap satData={this.state.satList}
                              observerData={this.state.setting}
                    />

                </div>
            </div>
        );
    }
    showNearbySatellite = (setting) =>{
        console.log('setting->', setting);
        this.setState({
            isLoadingList: true,
            setting:setting
        })
        this.fetchSatellite(setting);

    }
    fetchSatellite = (setting) => {

        const { observerLat,
            observerLng,
            observerElevation,
            satAlt
            } = setting;
        const url = `${NEARBY_SATELLITE}/${observerLat}/${observerLng}/${observerElevation}/${satAlt}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
        axios.get(url)
            .then(response=>{
                console.log(response);
                this.setState({
                    satInfo: response.data,
                    isLoadingList: false
                })
            })
            .catch(err=>{
                console.log('fetch satellite failed->', err.message);
            })
    }
    showMap = (selected) => {
        console.log('show selected->', selected);
        this.setState(preState => ({
            ...preState,
            satList:[...selected]
        }))
    }

}

export default Main;