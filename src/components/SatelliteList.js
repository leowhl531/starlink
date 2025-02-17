import React, {Component} from 'react';
import {Button, Spin, List, Avatar, Checkbox} from 'antd';
import satellite from '../assets/images/satellite.svg';

class SatelliteList extends Component {
    state = {
        selected:[]
    }
    render() {
        console.log(this.state.selected)
        const {satInfo, isLoad} = this.props;

        const satList = satInfo ? satInfo.above : [];
        const {selected} = this.state;
        return (
            <div className="sat-list-box">
                <Button className="sat-list-btn"
                        size="large"
                        disabled={selected.length === 0}
                        onClick={this.showMap}
                >Track on the map
                </Button>
                <hr/>
                {
                    isLoad ?
                        <div className="spin-box">
                            <Spin tip="Loading..." size="large"/>
                        </div>
                        :
                        <List className="sat-list"
                            itemLayout="horizontal"
                            dataSource={satList}
                            renderItem={item => (
                                <List.Item actions={[<Checkbox onChange={this.onChange}
                                                               dataInfo={item}
                                />]}

                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={satellite} size="large"
                                                        alt="satellite"/>}
                                        title={<p>{item.satname}</p>}
                                        description={`Launch Date: ${item.launchDate}`}
                                    />
                                </List.Item>
                            )}
                        />
                }
            </div>

        );
    }

    showMap = () => {
        const {selected} = this.state;
        this.props.onShowMap(selected);
    }
    onChange = e =>{
        console.log(e.target);
        const {dataInfo, checked} = e.target;
        //get selected array
        const {selected} = this.state;
        //push or remove satellite
        const list = this.addOrRemove(dataInfo, checked, selected);
        //set state
        this.setState({
            selected:list
        })
    }
    addOrRemove = (item, status, list) => {
        //check is true -> item is not in the list -> add it
        //              -> item is in the list -> do nothing
        //check is false -> item is in the list -> remove it
        //               -> item is not in the list -> do nothing

        //step 1: item is in th list?
        const found = list.some( entry => entry.satid === item.satid);
        if(status && !found) {
            list.push(item);
        }
        if(!status && found){
            list = list.filter(entry => entry.satid !== item.satid);
        }
        return list;
    }
}

export default SatelliteList;