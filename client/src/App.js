import TodoList from './components/TodoList'
import Landing from './components/Landing'

function App() {
  return (
    <>
    {/* <Navbar /> */}
    <div className="container">
    <Landing />
    <TodoList />
    </div>
    </>
    // <Router>
    //   <div className="App">
    //     <Navbar /> 
    //       <Route exact path="/" component={Landing} />
    //       <div className="container">
    //         <Route exact path="/todo-list" component={TodoList} />
    //       </div>
    //   </div>
    // </Router>
  );
}

export default App;
