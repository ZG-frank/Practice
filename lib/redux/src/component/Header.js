import React, { Component } from 'react';
import connent from '../store/Connent';

class Header extends Component {

    render() {
        return <h1 
            className="txt-center"
            style={{ color: this.props.themeColor }}>
            Redux Test Title
        </h1>
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}

Header = connent(mapStateToProps)(Header);

export default Header;