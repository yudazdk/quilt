import React from 'react';

const SingleBar = ({barIndex, title, left, right, onMouseOutBar, onMouseOverBar, selectedbarIndex, selectedbarSide}) => {
    let totalWidth = left.value + right.value;

    let leftPercent = (left.value) * 100 / totalWidth;
    leftPercent = leftPercent.toFixed(0);

    let rightPercent = 100 - leftPercent;

    function mouseOverBar(side) {
        onMouseOverBar(barIndex, side);
    }

    function getLeftStyle() {
        var style = {};

        if ( selectedbarIndex == barIndex && selectedbarSide == 'left' ) {
            style = {backgroundColor: left.color, color: 'white', width:rightPercent + '%', border: '2px solid black'};
        } else {
            style = {backgroundColor: left.color, color: 'white', width:rightPercent + '%'};
        }

        return style;
    }

    function getRightStyle() {
        var style = {};

        if ( selectedbarIndex == barIndex && selectedbarSide == 'right' ) {
            style = {backgroundColor: right.color, color: 'black', width:rightPercent + '%', border: '2px solid black'};
        } else {
            style = {backgroundColor: right.color, color: 'black', width:rightPercent + '%'};
        }

        return style;
    }

    return (
        <div>
            <div className="singlebar-header">
                <div>{title}</div>
                <div>Total: {totalWidth}</div>
            </div>

            <div className="singlebar-progress">
                <div className="barPercent" style={getLeftStyle()} onMouseOver={mouseOverBar.bind(this, 'left')}
                     onMouseOut={onMouseOutBar.bind(this)}>{leftPercent}%</div>
                <div className="barPercent" style={getRightStyle()} onMouseOver={mouseOverBar.bind(this, 'right')}
                     onMouseOut={onMouseOutBar.bind(this)}>{rightPercent}%</div>
            </div>
        </div>
    );
};

export default SingleBar;