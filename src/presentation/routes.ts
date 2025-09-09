import { Router } from "express";
import { TodosController } from "./todos/controller";
import { ToDoRoutes } from "./todos/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        // Se tiene que separar los Controller para tener más orden
        // const todoController = new TodosController();

        // Rutas de mi aplicación
        router.use('/api/todos', ToDoRoutes.routes);
        // router.use('/api/auth', ToDoRoutes.routes);
        // router.use('/api/products', ToDoRoutes.routes);
        // router.use('/api/users', ToDoRoutes.routes);

        // Return del router
        return router;
    }
}