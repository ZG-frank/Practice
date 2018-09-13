import React, { Component } from 'react';
import PropTypes from 'prop-types';

const connent = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connent extends Component {
        static contextTypes = {
            store: PropTypes.object.isRequired
        }

        constructor(props) {
            super(props);
            this.state = {
                allProps: {}
            }
        }

        componentDidMount() {
            const { store } = this.context;
            this._updateProps();
            store.subscribe(() => this._updateProps());
        }

        _updateProps() {
            const { store } = this.context;
            let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {};
            let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {};

            this.setState({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }

        render() {
            return <WrappedComponent {...this.state.allProps} />
        }
    }

    return Connent;
}

export default connent;