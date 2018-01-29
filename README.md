# React Dropdown AutoComplete

[![npm version](https://img.shields.io/npm/v/react-dropdown-autocomplete.svg?style=flat-square)](https://www.npmjs.com/package/react-dropdown-autocomplete)
[![npm downloads](https://img.shields.io/npm/dm/react-dropdown-autocomplete.svg?style=flat-square)](https://www.npmjs.com/package/react-dropdown-autocomplete)
[![GitHub issues](https://img.shields.io/github/issues/karote00/react-autocomplete.svg?style=flat-square)](https://github.com/karote00/react-autocomplete/issues)
[![GitHub license](https://img.shields.io/github/license/karote00/react-autocomplete.svg?style=flat-square)](https://github.com/karote00/react-autocomplete/blob/master/LICENSE)

## Example
```jsx
class App extends React.Component {
  render() {
    const { editFields } = this.state; // you can get your input value by other ways
    const { product } = this.props; // get data where you have, or combine from redux

    return (
      <ReactDropDownAutoComplete
        getItemValue={item => item.name}
        className="form-control"
        id="name"
        name="name"
        placeholder="Product Name"
        data={product.list || []}
        renderItem={item => (
          <div
            role="button"
            tabIndex="-1"
            onClick={(val) => { editFields.name = val; }}
          >{item.id} - {item.name}</div>
        )}
        icon="search"
        iconColor="#ff000"
        iconClick={() => { /* TODO */ }}
        value={editFields.name}
        onChange={(val) => { editFields.name = val; }}
        onEnter={() => { /* TODO */ }}
      />
    );
  }
}
```

## Data Seclection
You can use these ways to select value
- Type the whole correct value
- Mouse click the value
- Press `arrow up/down` to change selection and press `enter or arrow right` to select value

## Params
- getItemValue
  - required
  - get value in single item
- renderItem
  - optional
  - custom list menu item you want to show

  - onClick
      - bind menu item onClick method
- className
  - optional
- id
  - optional
  - is the key for the list render
- name
  - optional
  - the name of the input field
- placeholder
  - optional
  - the placeholder of the input field
- data
  - required
  - your data list
  - must be array
  - default: []
- value
  - required
  - value for auto-complete field check with old value
- onChange
  - optional
  - get value from autocomplete field as params in func
- onEnter
  - optional
  - do what ever you want after press enter key
- icon
  - optional
  - icon for the input at the right side
  - only support font-awesome
- iconColor
  - optional
  - the icon color
  - support format: HEX, RGB, RGBA
- iconClick
  - optional
  - do what ever you want after click the icon
