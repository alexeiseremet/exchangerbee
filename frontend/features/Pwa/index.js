import React from 'react';

export class Pwa extends React.Component {
  deferredPrompt = null;

  prompt = (e) => {
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    // console.log(e);
  };

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', this.prompt);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeinstallprompt', this.prompt);
  }

  render() {
    return (
      <div style={{ padding: '1rem' }} onClick={this.prompt}>
        pwa message
      </div>
    );
  }
}

export default Pwa;
