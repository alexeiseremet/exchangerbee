import './styles.scss';
import React from 'react';

class Input extends React.Component {
  inputRef = React.createRef();

  // is temporary, hopefully
  blurHandler = () => {
    this.props.onInputBlur(false);
  };

  componentDidMount() {
    this.inputRef.select();
    this.inputRef.onblur = this.blurHandler;
  }

  componentWillUnmount() {
    this.inputRef.onblur = null;
  }

  render() {
    const {
      defaultValue, className, onInputChange, // onInputBlur,
    } = this.props;

    return (
      <>
        <input
          type="text"
          pattern="[0-9]*"
          className={className}
          defaultValue={defaultValue}
          onChange={(event) => { onInputChange(event.target.value); }}
          // onBlur={() => { onInputBlur(false); }}
          ref={(input) => { this.inputRef = input; }}
        />
      </>
    );
  }
}

export default Input;
