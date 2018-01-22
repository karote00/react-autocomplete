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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectOption = this.handleSelectOption.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  isOpen() {
    return this.state.isOpen;
  }

  filterList() {
    const { data, getItemValue } = this.props;
    const { value } = this.inputField || {};
    let list = [];

    if (value && value.trim()) {
      list = data.filter(d =>
        getItemValue(d).toLowerCase().indexOf(value.trim().toLowerCase()) > -1,
      );
    }

    return list;
  }

  handleInputChange(e) {
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
    const { onChange, getItemValue } = this.props;
    const value = getItemValue(data);

    onChange(value);

    this.setState({
      editField: value,
      list: [],
      isOpen: false,
    });
  }

  handleInputFocus() {
    const list = this.filterList();

    this.setState({
      list,
      isOpen: list.length > 0,
    });
  }

  handleInputBlur() {
    setTimeout(() => {
      this.setState({
        list: [],
        isOpen: false,
      });
    }, 200);
  }

  handleIconClick() {
    this.props.iconClick();
  }

  handleInputKeyUp(e) {
    const { keyCode } = e;
    e.stopPropagation();
    e.preventDefault();

    if (keyCode === 13) {
      // Enter
      this.Enter(e);
    }
  }

  Enter(e) {
    this.props.onEnter(e);
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
    const { className, id, name, placeholder, icon, iconColor } = this.props;

    return (
      <div className={`autocomplete-field ${icon ? 'has-icon' : ''}`}>
        <input
          type="text"
          className={className}
          id={id}
          name={name}
          autoComplete="off"
          placeholder={placeholder}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onKeyUp={this.handleInputKeyUp}
          value={editField}
          ref={(input) => { this.inputField = input; }}
        />
        {icon &&
          <div
            role="button"
            tabIndex="-1"
            className="icon-search"
            onClick={this.handleIconClick}
          >
            <i
              className={`fa fa-${icon} ${iconColor[0] !== '#' ? iconColor : ''}`}
              style={{ color: `${iconColor[0] === '#' ? iconColor : ''}` }}
            />
          </div>
        }
        <div className={`autocomplete-list ${isOpen ? 'show' : ''}`}>
          {this.renderMenu()}
        </div>
      </div>
    );
  }
}

AutoCompleteField.defaultProps = {
  getItemValue: () => {},
  renderItem: item => (
    <div
      role="button"
      tabIndex="-1"
      key={item.id}
      onClick={() => this.handleSelectOption(item)}
    >{this.props.getItemValue(item)}</div>
  ),
  className: '',
  id: '',
  name: '',
  icon: '',
  iconColor: '',
  placeholder: '',
  data: [],
  open: false,
  onChange: () => {},
  iconClick: () => {},
  onEnter: () => {},
};

AutoCompleteField.propTypes = {
  renderItem: PropTypes.func,
  getItemValue: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  open: PropTypes.bool,
  placeholder: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func,
  iconClick: PropTypes.func,
  onEnter: PropTypes.func,
};

export default AutoCompleteField;
