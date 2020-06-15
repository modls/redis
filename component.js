import { connect } from "./index.js";
import BaseWebComponent, {
  BWC,
  html,
} from "https://pkgjs.space/base-webcomponent/latest";
var initialState = {
  todos: [],
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

class Test extends BaseWebComponent {
  static get props() {
    return {
      addTodo: () => {},
      todos: [],
    };
  }

  click() {
    this.props.addTodo("test");
  }
  render() {
    return html`<div onclick=${() => this.click()}>
      Click ${this.props.todos.map((todo) => todo.text)}
    </div>`;
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});
const mapDispatchToProps = (dispatch) => ({
  addTodo: (...args) => dispatch(addTodo(...args)),
});
export default BWC(connect(store)(mapStateToProps, mapDispatchToProps)(Test));
