import React from 'react';
import Axios from 'axios';

import MultiBars from './MultiBars';

class AppBars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedbarIndex: null,
            selectedbarSide: '',

            barValues: [],

            loaded: false
        };
    }

    setBarValues(apiData) {
        let barValues = apiData.map( (dataItem) => {
            return {
                title: dataItem.name,
                left: { color: "#007cff", value: dataItem.provider },
                right: { color: "#ffe944", value: dataItem.user }
            };
        });

        this.setState({barValues, loaded: true});
    }

    componentDidMount() {
        let that = this;

        Axios.get('https://gist.githubusercontent.com/vitalybe/cd3d6f939d37294727f8e83329b4afcb/raw/59ba6e5f1ae06429fceb407fc0cc0a13e9f3ef35/data.json')
            .then(function(response){
                that.setBarValues(response.data);
            });
    }

    onMouseOverBar(barIndex, side) {
        this.setState({selectedbarIndex: barIndex, selectedbarSide: side});
    }

    onMouseOutBar() {
        this.setState({selectedbarIndex: null, selectedbarSide: ''});
    }

    renderDetails() {
        if ( this.state.selectedbarIndex == null || this.state.barValues.length == 0) {
            return;
        }

        let totalWidth = this.state.barValues[this.state.selectedbarIndex].left.value + this.state.barValues[this.state.selectedbarIndex].right.value;

        let leftPercent = (this.state.barValues[this.state.selectedbarIndex].left.value) * 100 / totalWidth;
        leftPercent = leftPercent.toFixed(0);

        let rightPercent = 100 - leftPercent;

        let sizeText = '';
        let totalText = '';
        if ( this.state.selectedbarSide == 'left' ) {
            sizeText = this.state.barValues[this.state.selectedbarIndex].left.value + ' bps';
            totalText = leftPercent + '% of ' + totalWidth;
        } else {
            sizeText = this.state.barValues[this.state.selectedbarIndex].right.value + ' bps';
            totalText = rightPercent + '% of ' + totalWidth;
        }

        return [
            <div key={0} className="details-header">{this.state.barValues[this.state.selectedbarIndex].title}</div>,
            <div key={1} className="details-row">{sizeText}</div>,
            <div key={2} className="details-row">{totalText}</div>
        ];
    }

    render() {
        return (
            <div className="appbar-container">
                {!this.state.loaded &&
                    <i className="fa fa-spinner fa-pulse fa-fw"/>
                }

                {this.state.loaded &&
                <div className="appbar-box">
                    <div className="appbox-header">Charts</div>
                    <MultiBars barValues={this.state.barValues} onMouseOutBar={this.onMouseOutBar.bind(this)}
                               onMouseOverBar={this.onMouseOverBar.bind(this)}
                               selectedbarIndex={this.state.selectedbarIndex}
                               selectedbarSide={this.state.selectedbarSide}/>
                </div>
                }

                {this.state.loaded &&
                <div className="appbar-box" style={{marginLeft: '7px'}}>
                    <div className="appbox-header">Details</div>
                    {this.renderDetails()}
                </div>
                }
            </div>
        );
    }
}

export default AppBars;