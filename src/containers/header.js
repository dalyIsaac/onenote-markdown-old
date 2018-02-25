import { connect } from 'react-redux';
import { HeaderComponent } from '../components/header';

const mapStateToProps = (state) => ({
    users: state.users
});

export default connect(mapStateToProps)(HeaderComponent);
