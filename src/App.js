import "./App.css";
import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case "toggle":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "remove":
      return state.filter((todo) => todo.id !== action.id);
    case "clear":
      return [];
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      dispatch({ type: "add", text });
      setText("");
    }
  };

  return (
    <div className="App">
      <h1 className="title">Todo App</h1>
      <div className="form">
        <div className="input-wrapper">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a new todo"
          />

          <div className="underline"></div>
        </div>

        <button onClick={handleAdd} className="buttonAdd">
          +
        </button>
      </div>

      <ul className="todoList">
        {state.map((todo) => (
          <li key={todo.id}>
            <div className="todoItem">
               <input
              type="checkbox"
              checked={todo.done}
              onChange={() => dispatch({ type: "toggle", id: todo.id })}
            />
            <span className={todo.done ? "done" : ""}>{todo.text}</span>
            </div>
           
            <button
              onClick={() => dispatch({ type: "remove", id: todo.id })}
              className="buttonRemove"
            >
              +
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => dispatch({ type: "clear" })}
        className="buttonClear"
      >
        Clear All🧹
      </button>
    </div>
  );
}

export default App;
