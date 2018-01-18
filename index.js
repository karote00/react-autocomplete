import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import './style.scss';

class AutoCompleteField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      editField: '',
    };

    this.handleAutoCompleteChange = this.handleAutoCompleteChange.bind(this);
    this.handleSelectOption = this.handleSelectOption.bind(this);
    this.handleAutoCompleteBlur = this.handleAutoCompleteBlur.bind(this);
    this.handleAutoCompleteFocus = this.handleAutoCompleteFocus.bind(this);
  }

  filterList() {
    const { data, check } = this.props;
    const { value } = this.autocompleteField;
    let list = [];

    if (value.trim()) {
      list = data.filter(d => d[check].toLowerCase().indexOf(value.trim().toLowerCase()) > -1);
    }

    this.setState({
      list,
    });
  }

  handleAutoCompleteChange(e) {
    const { target } = e;
    const { value } = target;
    const { onValueChange } = this.props;

    this.filterList();

    this.setState({
      editField: value,
    });

    onValueChange(value);
  }

  handleSelectOption(data) {
    const { onValueChange, check } = this.props;
    const value = data[check];

    this.setState({
      editField: value,
      list: [],
    });

    onValueChange(value);
  }

  handleAutoCompleteFocus() {
    this.filterList();
  }

  handleAutoCompleteBlur() {
    setTimeout(() => {
      this.setState({
        list: [],
      });
    }, 200);
  }

  render() {
    const { list, editField } = this.state;
    const { className, id, name, placeholder, check } = this.props;

    return (
      <div className="autocomplete-field">
        <input
          type="text"
          className={className}
          id={id}
          name={name}
          autoComplete="off"
          placeholder={placeholder}
          onFocus={this.handleAutoCompleteFocus}
          onBlur={this.handleAutoCompleteBlur}
          onChange={this.handleAutoCompleteChange}
          value={editField}
          ref={(input) => { this.autocompleteField = input; }}
        />
        <div className={`autocomplete-list ${list.length > 0 ? 'show' : ''}`}>
          {
            list.map(l => (
              <div
                role="button"
                tabIndex="-1"
                key={l.id}
                onClick={() => this.handleSelectOption(l)}
              >{l[check]}</div>
            ))
          }
        </div>
      </div>
    );
  }
}

AutoCompleteField.defaultProps = {
  className: '',
  id: '',
  name: '',
  placeholder: '',
  check: 'name',
  data: [],
  onValueChange: () => {},
};

AutoCompleteField.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  check: PropTypes.string,
  data: PropTypes.array,
  onValueChange: PropTypes.func,
};

export default AutoCompleteField;
