# React AutoComplete Field link Dropdown

## Params
- className
  - optional
- id
  - required
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
- filter
  - required
  - the key you want to filter the data list
  - default: `name`
- onValueChange:
  - optional
  - get value from autocomplete field as params in func

## Example
```jsx
class App extends React.Component {
  render() {
    const { product } = this.props; // get data where you have, or combine from redux
    
    return (
      <ReactDropDownAutoComplete
        className="form-control"
        id="name"
        name="name"
        placeholder="Product Name"
        data={product.list || []}
        filter="name"
        onValueChange={value => this.onValueChange('name', value)} // onValueChange is custom definition
      />
    );
  }
}
```
