import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import './style.scss';

class AutoCompleteField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.open || false,
      list: [],
      editField: '',
    };

    this.renderMenu = this.renderMenu.bind(this);
    // this.filterList = this.filterList.bind(this);
    this.handleAutoCompleteChange = this.handleAutoCompleteChange.bind(this);
    this.handleSelectOption = this.handleSelectOption.bind(this);
    this.handleAutoCompleteBlur = this.handleAutoCompleteBlur.bind(this);
    this.handleAutoCompleteFocus = this.handleAutoCompleteFocus.bind(this);
  }

  isOpen() {
    return this.state.isOpen;
  }

  filterList() {
    const { data, filter } = this.props;
    const { value } = this.autocompleteField || {};
    let list = [];

    if (value && value.trim()) {
      list = data.filter(d => d[filter].toLowerCase().indexOf(value.trim().toLowerCase()) > -1);
    }

    return list;
  }

  handleAutoCompleteChange(e) {
    const { target } = e;
    const { value } = target;
    const { onChange } = this.props;
    const list = this.filterList();

    onChange(value);

    this.setState({
      list,
      isOpen: list.length > 0,
      editField: value,
    });
  }

  handleSelectOption(data) {
    const { onChange, filter } = this.props;
    const value = data[filter];

    onChange(value);

    this.setState({
      editField: value,
      list: [],
      isOpen: false,
    });
  }

  handleAutoCompleteFocus() {
    const list = this.filterList();

    this.setState({
      list,
      isOpen: list.length > 0,
    });
  }

  handleAutoCompleteBlur() {
    setTimeout(() => {
      this.setState({
        list: [],
        isOpen: false,
      });
    }, 200);
  }

  renderMenu() {
    const { renderItem } = this.props;

    const menus = this.filterList().map((data) => {
      const item = renderItem(data);

      return React.cloneElement(item, {
        key: data.id || data.name,
        onClick: () => this.handleSelectOption(data),
      });
    });

    return menus;
  }

  render() {
    const { isOpen, editField } = this.state;
    const { className, id, name, placeholder } = this.props;

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
        <div className={`autocomplete-list ${isOpen ? 'show' : ''}`}>
          {this.renderMenu()}
        </div>
      </div>
    );
  }
}

AutoCompleteField.defaultProps = {
  renderItem: (item, filter) => (
    <div
      role="button"
      tabIndex="-1"
      key={item.id}
      onClick={() => this.handleSelectOption(item)}
    >{item[filter]}</div>
  ),
  className: '',
  id: '',
  name: '',
  placeholder: '',
  filter: 'name',
  data: [],
  open: false,
  onChange: () => {},
};

AutoCompleteField.propTypes = {
  renderItem: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  open: PropTypes.bool,
  placeholder: PropTypes.string,
  filter: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func,
};

export default AutoCompleteField;
