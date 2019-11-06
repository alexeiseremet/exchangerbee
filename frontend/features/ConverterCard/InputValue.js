import React from 'react';

class InputValue extends React.Component {
  inputRef = React.createRef();

  state = {
    isFocused: false,
  };

  setInputFocus = (bool) => {
    this.setState({ isFocused: bool });
  };

  handlerInputSelect = () => {
    if (!this.state.isFocused && this.props.defaultValue > 0) {
      this.inputRef.select();
      this.setInputFocus(true);
    }
  };

  componentDidMount() {
    this.handlerInputSelect();
  }

  componentDidUpdate() {
    this.handlerInputSelect();
  }

  render() {
    return (
      <input
        type="text"
        pattern="[0-9]*"
        defaultValue={this.props.defaultValue}
        ref={(input) => {
          this.inputRef = input;
        }}
        onBlur={() => {
          this.setInputFocus(false);
          this.props.resetCard();
        }}
        onChange={this.props.onChange}
        className={this.props.className}
      />
    );
  }
}


export default InputValue;
