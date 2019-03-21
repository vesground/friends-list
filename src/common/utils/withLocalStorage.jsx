import React from 'react';
import ReactDOM from 'react-dom';

export default function withLocalStorage(WrappedComponent) {
  class WrappedComponentWithLocalStorage extends React.Component {
    state = { localStorageAvailable: false };

    componentWillMount() {
      this.checkLocalStorageExists();
    }


    get = (key) => {
      const { localStorageAvailable } = this.state;

      if (localStorageAvailable) {
        return JSON.parse(window.localStorage.getItem(key));
      }

      return null;
    }

    set = (key, data) => {
      const { localStorageAvailable } = this.state;

      if (localStorageAvailable) {
        window.localStorage.setItem(key, JSON.stringify(data));
      }
    }

    checkLocalStorageExists() {
      const testKey = 'test';

      try {
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        this.setState({ localStorageAvailable: true });
      } catch (e) {
        this.setState({ localStorageAvailable: false });
      }
    }
    // remove = (key) => {
    //   if (this.state.localStorageAvailable) {
    //     window.localStorage.removeItem(key);
    //   }
    // }

    render() {
      return (
        <WrappedComponent getFromLocalStorage={this.get}
                          setInLocalStorage={this.set}
                          {...this.props} />
      );
    }
  }

  return WrappedComponentWithLocalStorage;
}
