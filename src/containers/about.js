import * as React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import AboutComponent from '../components/about';
import { push } from 'react-router-redux';

const mapStateToProps = (state) => ({
    users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    signIn: () => dispatch(signIn()),
    redirectToApp: () => dispatch(push('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutComponent);
