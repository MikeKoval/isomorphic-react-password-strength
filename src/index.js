import React from 'react';
import zxcvbn from 'zxcvbn';

export default class ReactPasswordStrength extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      isValid: false,
      password: '',
    };
  }

  checkValidity(score, length) {
    const { minScore, minLength } = this.props;
    return score >= minScore && length >= minLength;
  }

  handleChange(e) {
    const changeCallback = this.props.changeCallback;
    const password = this.refs['ReactPasswordStrength-input'].value;
    const { score } = zxcvbn(password);

    this.setState({
      isValid: this.checkValidity(score, password.length),
      password,
      score,
    }, function() {
      if (changeCallback !== null) {
        changeCallback(this.state);
      }
    });
  }

  render() {
    const styles = require('./style.css');
    const { score, password, isValid } = this.state;
    const { scoreWords, inputProps, minLength } = this.props;

    // hack because template literals can't be used as strings in objects for some reason
    const strengthClass = `is-strength-${score}`;

    const wrapperClasses = ['ReactPasswordStrength'];
    if (isValid) wrapperClasses.push('is-password-valid');
    if (isValid === false && password.length > 0) wrapperClasses.push('is-password-invalid');
    if (password.length > 0) wrapperClasses.push(strengthClass);

    const inputClasses = ['ReactPasswordStrength-input'];
    if (isValid) inputClasses.push('is-password-valid');
    if (isValid === false && password.length > 0) inputClasses.push('is-password-invalid');

    return (
      <div className={wrapperClasses.join(' ')}>
        <input
          className={inputClasses.join(' ')}
          type="password"
          {...inputProps}
          onChange={this.handleChange.bind(this)}
          ref="ReactPasswordStrength-input"
          value={password}
        />

        <div className="ReactPasswordStrength-strength-bar" />
        <span className="ReactPasswordStrength-strength-desc">{scoreWords[score]}</span>
      </div>
    );
  }
}

ReactPasswordStrength.propTypes = {
  changeCallback: React.PropTypes.func,
  inputProps: React.PropTypes.object,
  minLength: React.PropTypes.number,
  minScore: React.PropTypes.number,
  scoreWords: React.PropTypes.array,
};

ReactPasswordStrength.defaultProps = {
  changeCallback: null,
  minLength: 5,
  minScore: 2,
  scoreWords: ['weak', 'weak', 'okay', 'good', 'strong'],
};
