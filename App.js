
import React, { useState, useEffect, useRef, useCallback, useMemo, useReducer, createContext, useContext, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

// 1. JSX + Basic Component + Fragment + StrictMode Demonstration
function Welcome({ name }) {
  return <><h1>Hello, {name}!</h1></>;
}

// 2. useState + Event Handling
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

// 3. Conditional Rendering + Props
function Greeting({ isLoggedIn }) {
  return <h3>{isLoggedIn ? "Welcome back!" : "Please log in."}</h3>;
}

// 4. List and Keys
function FruitList() {
  const fruits = ["Apple", "Banana", "Mango"];
  return (
    <ul>
      {fruits.map((fruit, index) => <li key={index}>{fruit}</li>)}
    </ul>
  );
}

// 5. Controlled Form
function MyForm() {
  const [name, setName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    alert("Submitted: " + name);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      <button>Submit</button>
    </form>
  );
}

// 6. useEffect + useRef
function TimerInput() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return <input ref={inputRef} placeholder="Autofocus input" />;
}

// 7. Memoization + useCallback + useMemo
const ExpensiveComponent = React.memo(function ({ value }) {
  return <p>Memoized Value: {value}</p>;
});

function MemoExample() {
  const [number, setNumber] = useState(0);
  const memoizedValue = useMemo(() => number * 2, [number]);
  const increment = useCallback(() => setNumber(n => n + 1), []);
  return (
    <div>
      <button onClick={increment}>Increment</button>
      <ExpensiveComponent value={memoizedValue} />
    </div>
  );
}

// 8. useReducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

function ReducerExample() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <p>Reducer Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}

// 9. Context API
const ThemeContext = createContext();
function ThemedBox() {
  const theme = useContext(ThemeContext);
  return <div style={{ padding: '10px', background: theme === 'dark' ? '#333' : '#ccc', color: theme === 'dark' ? '#fff' : '#000' }}>Theme is {theme}</div>;
}

// 10. Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? <h1>Something went wrong.</h1> : this.props.children;
  }
}

function ProblematicComponent() {
  throw new Error("Intentional Error");
}

// 11. Code Splitting
const LazyMessage = lazy(() => Promise.resolve({ default: () => <p>Lazy Loaded Component!</p> }));

// 12. Custom Hook
function useCounter() {
  const [count, setCount] = useState(0);
  return [count, () => setCount(count + 1)];
}

function CustomHookExample() {
  const [count, increment] = useCounter();
  return (
    <div>
      <p>Custom Hook Count: {count}</p>
      <button onClick={increment}>Add</button>
    </div>
  );
}

// 13. HOC
function withGreeting(Component) {
  return function Enhanced() {
    return (
      <>
        <p>Hello from HOC</p>
        <Component />
      </>
    );
  };
}

function Profile() {
  return <p>This is Profile</p>;
}

const GreetedProfile = withGreeting(Profile);

// Main App
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <div style={{ padding: 20 }}>
        <Welcome name="Vishak" />
        <Greeting isLoggedIn={true} />
        <Counter />
        <FruitList />
        <MyForm />
        <TimerInput />
        <MemoExample />
        <ReducerExample />
        <ThemedBox />
        <CustomHookExample />
        <GreetedProfile />
        <ErrorBoundary>
          {/* <ProblematicComponent /> */}
        </ErrorBoundary>
        <Suspense fallback={<p>Loading...</p>}>
          <LazyMessage />
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
