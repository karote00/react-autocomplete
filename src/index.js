import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line

const isCustomColor = (color) => {
  const c = color.trim();

  if (
    c[0] === '#' ||
    c.indexOf('rgb(') > -1 ||
    c.indexOf('rgba(') > -1
  ) return true;

  return false;
};

class ReactDropdownAutoComplete extends Component {
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
              className={`fa fa-${icon} ${!isCustomColor(iconColor) ? iconColor : ''}`}
              style={{ color: `${isCustomColor(iconColor) ? iconColor : ''}` }}
            />
          </div>
        }
        <div className={`autocomplete-list ${isOpen ? 'show' : ''}`}>
          {this.renderMenu()}
        </div>
        <style>{`
          .autocomplete-field {
            position: relative;
          }
          .autocomplete-field.has-icon input[type="text"] {
            padding-right: 40px;
          }
          .autocomplete-field .autocomplete-list {
            position: absolute;
            top: 34px;
            width: 100%;
            background: white;
            overflow: auto;
            height: 0;
            z-index: 9;
            -webkit-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
                    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
          }
          .autocomplete-field .autocomplete-list.show {
            border: 1px solid #d2d6de;
            border-top: none;
            height: unset;
            max-height: 214px;
          }
          .autocomplete-field .autocomplete-list > div {
            padding: 6px 12px;
            background: white;
            border-bottom: 1px solid #d2d6de;
            cursor: pointer;
            outline: none;
          }
          .autocomplete-field .autocomplete-list > div:hover {
            background: rgba(0, 0, 0, 0.1);
          }
          .autocomplete-field .autocomplete-list > div:last-child {
            border: none;
          }
          .autocomplete-field .icon-search {
            position: absolute;
            right: 0;
            top: 50%;
            height: 32px;
            width: 32px;
            -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
            cursor: pointer;
            font-size: 1.3em;
            padding: .2em;
            text-align: center;
            outline: none;
          }
        `}</style>
      </div>
    );
  }
}

ReactDropdownAutoComplete.defaultProps = {
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

ReactDropdownAutoComplete.propTypes = {
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

export default ReactDropdownAutoComplete;
