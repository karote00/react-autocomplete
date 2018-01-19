# React AutoComplete Field link Dropdown

## Params
- renderItem
  - optional
  - custom list menu item you want to show
  - onClick
      - bind menu item onClick method
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
- onChange:
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
        id="cube"
        name="cube"
        placeholder="Cube Serial Number"
        data={cube.list || []}
        renderItem={item => (
          <div
            role="button"
            tabIndex="-1"
            onClick={(val) => { editFields.cube = val; }}
          >{item.prod_id}</div>)
        }
        filter="prod_id"
        value={editFields.cube}
        onChange={(val) => { editFields.cube = val; }}
      />
    );
  }
}
```
