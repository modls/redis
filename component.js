import { connect } from "./dist/esm.js";
import {
  Component,
  registerComponent,
  html,
} from "./node_modules/@modls/core/dist/esm.js";
var initialState = {
  todos: [],
  todos2: [],
};
function todos(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      var _state = { ...state };
      _state.todos.push(action);
      return _state;
    default:
      return state;
  }
}

const store = Redux.createStore(todos, initialState);

const addTodo = (text) => {
  return {
    type: "ADD_TODO",
    text,
  };
};

class Test extends Component {
  static get props() {
    return {
      addTodo: () => { },
      todos: [],
      todos2: [],
      watch: 'todos'
    };
  }

  click() {
    console.log('hi');
    this.props.addTodo("test");
  }
  render() {
    return html`<div onclick=${()=> this.click()}>
  Click ${this.props[this.props.watch].map((todo) => todo.text)}
</div>`;
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  todos2: state.todos2,
});
const mapDispatchToProps = (dispatch) => ({
  addTodo: (...args) => dispatch(addTodo(...args)),
});
export default registerComponent(connect(store)(mapStateToProps, mapDispatchToProps)(Test));
