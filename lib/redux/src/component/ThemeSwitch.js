import React, { Component } from 'react';
import connent from '../store/Connent';
import './ThemeSwitch.less';

class ThemeSwitch extends Component {

    handleThemeSwitch = (color) => {
        this.props.changeColor({ 
            type: 'CHANGE_COLOR',
            data: color
        });
    }

    handleContentChange = () => {
        this.props.changeContent({ 
            type: 'CHANGE_CONTENT',
            data: 'Content Changed'
        });
    }

    render() {
        const { themeColor } = this.props;

        return <div className="txt-center">
            <button 
                className="switch-btn"
                style={{ color: themeColor }} 
                onClick={this.props.reset}>
                Default
            </button>
            <button 
                className="switch-btn"
                style={{ color: themeColor }} 
                onClick={this.handleThemeSwitch.bind(this, '#fb3333')}>
                Red
            </button>
            <button 
                className="switch-btn"
                style={{ color: themeColor }} 
                onClick={this.handleThemeSwitch.bind(this, '#1890ff')}>
                Blue
            </button>
            <button 
                className="switch-btn"
                style={{ color: themeColor }} 
                onClick={this.handleContentChange}>
                Content
            </button>
        </div>
    }
}

const mapStateToProps = (state) => ({
    themeColor: state.themeColor
});

const mapDispatchToProps = (dispatch) => ({
    changeColor(params) {
        dispatch(params);
    },
    changeContent(params) {
        dispatch(params);
    },
    reset() {
        dispatch({ type: 'RESET' });
    }
});

ThemeSwitch = connent(mapStateToProps, mapDispatchToProps)(ThemeSwitch);

export default ThemeSwitch;