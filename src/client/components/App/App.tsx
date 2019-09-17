import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, Store } from 'redux';
import '../../index.css';

import { getTitle } from '../../actions/default';
import { State } from '../../reducers/reducers';

interface AppProps {
    store: Store;
    title: string;
    getTitle(): void;
}

export class App extends Component<AppProps, {}> {
    componentDidMount() {
        this.props.getTitle();
    }

    render() {
        const { title } = this.props;
        return (
            <div>
                {title ? <h1>{title}</h1> : <h1>Loading.. please wait!</h1>}
            </div>
        );
    }
}

const mapStateToProps = ({ defaultState }: State) => ({
    title: defaultState.title,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getTitle,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
