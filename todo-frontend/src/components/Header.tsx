const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 flex items-center">
            <img
                src={"https://cdn-icons-png.flaticon.com/128/4472/4472515.png"}
                alt="Todo-Logo"
                className="h-8 w-auto mr-3"
            />
            <h1 className="text-2xl font-bold">To-Do App</h1>
        </header>
    );
}

export default Header;