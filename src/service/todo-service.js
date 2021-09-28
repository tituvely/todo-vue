import axios from "axios";

async function hello() {
    const response = await axios.get("api/tasks")
    return response.data.map(todo => {
        return {
            id: todo.id,
            title: todo.details,
            completed: todo.status
        }
    });
}

export { hello }
