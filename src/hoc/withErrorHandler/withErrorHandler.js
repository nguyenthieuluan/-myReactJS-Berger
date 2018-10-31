import React, {Component} from 'react';
import Modal from '../../components/ui/modal/Modal';
import Aux from '../ReactAux/ReactAux';

const withErrorHandler = (WrappComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentWillMount () {
      this.reqInterceptor = axios.interceptors.response.use( req => {
        this.setState({error: null});
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      })
    }
    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    };

    render() {
      return (
        <Aux>
          <Modal clicked={this.errorConfirmedHandler} show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappComponent {...this.props}/>
        </Aux>
      );
    }
  }
};

export default withErrorHandler;