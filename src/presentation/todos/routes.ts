import { Router } from "express";
import { TodosController } from "./controller";


export class ToDoRoutes {
    static get routes(): Router {
        const router = Router();

        // Controller
        const todoController = new TodosController();

        // Route: /
        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);

        router.post('/', todoController.createTodo);

        router.put('/:id', todoController.updateTodo);

        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}