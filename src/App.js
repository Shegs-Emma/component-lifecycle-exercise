import './App.css';
// import Jokes from './Jokes';
// import BoxContainer from './BoxContainer';
import Giphy from './Containers/Giphy/Giphy';
import NewTodoFormList from './Containers/NewTodoFormList/NewTodoFormList';

function App() {
  return (
    <div className="App">
      <Giphy />
      <NewTodoFormList />
    </div>
  );
}

export default App;
