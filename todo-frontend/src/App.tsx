import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <div className="w-full max-w-md">
            <TaskForm />
          </div>
        </div>
        <div className="hidden md:block w-px bg-gray-300 self-stretch mt-4 mb-4"></div>
        <div className="w-full md:w-1/2 p-4">
          <TaskList />
        </div>
      </main>
    </div>
  );
}

export default App;