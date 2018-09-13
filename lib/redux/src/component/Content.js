import React, { Component } from 'react';
import ThemeSwitch from './ThemeSwitch';
import connect from '../store/Connent'

class Content extends Component {

    render() {
        const { themeColor, content } = this.props;

        return <div>
            <p 
                className="txt-center"
                style={{ color: themeColor }}>
                {content}
            </p>
            <ThemeSwitch />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor,
        content: state.content
    }
}

Content = connect(mapStateToProps)(Content);

export default Content;