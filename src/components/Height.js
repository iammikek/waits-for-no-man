import React, {Component} from "react";

class HeightElement extends Component {

    filterHeight(value) {
        return value.toFixed(2);
    }

    render() {

        if(!this.props.tideEvent.Height){
            return (
                <span>No data</span>
            );
        }

        let height = this.props.tideEvent.Height;

        return (
            <span>
                {this.filterHeight(height)}
            </span>
        )
    }
}
export default HeightElement;