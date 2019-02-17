import React from 'react';

import SingleBar from './SingleBar';

class MultiBars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changed: false
        };
    }

    renderBars() {
        let items = this.props.barValues.map( (barItem, index) => {
            return <SingleBar key={index} barIndex={index} title={barItem.title} left={barItem.left} right={barItem.right}
                              onMouseOutBar={this.props.onMouseOutBar.bind(this)}
                              onMouseOverBar={this.props.onMouseOverBar.bind(this)}
                              selectedbarIndex={this.props.selectedbarIndex} selectedbarSide={this.props.selectedbarSide}/>;
        });

        return items;
    }

    render() {
        return this.renderBars();
    }
}

export default MultiBars;