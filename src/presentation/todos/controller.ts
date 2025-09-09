import { Request, Response } from 'express';
import { CreateTodoDTO } from '../../domain/dtos/todos/create-todo.dto';

const toDos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy bread', createdAt: null },
    { id: 3, text: 'Buy butter', createdAt: new Date() }
]

export class TodosController {

    // DI
    constructor() {
    }

    // GET
    public getTodos = (req:Request, res:Response) => {
        return res.json(toDos);
    }

    // GET BY ID
    public getTodoById = (req:Request, res:Response) => {
        if (!req.params.id || isNaN(+req.params.id)) return res.status(400).json({ error: 'Id parameter is required' });
        const idParam = +req.params.id;
        const todo = toDos.find(todo => todo.id === idParam);
        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: 'Not found'})
    }

    // CREATE
    public createTodo = (req:Request, res:Response) => {
        const [error, createTodoDto] = CreateTodoDTO.create(req.body);
        const {text} = req.body;
        if(!text) res.status(400).json({error: 'Text property is required'});
        const newTodo = {
            id: toDos.length + 1,
            text,
            createdAt: null
        }
        
        toDos.push(newTodo);
        res.json(newTodo);
    }

    // UPDATE - PUT
    public updateTodo = (req:Request, res:Response) => {
        if (!req.params.id || isNaN(+req.params.id)) return res.status(400).json({ error: 'Id parameter is required' });
        const id = +req.params.id;

        const todo = toDos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Not found todo with id ${id}` });

        const { text, createdAt } = req.body;
        // if (!text) return res.status(400).json({ error: `Text property is required` });

        todo.text = text || todo.text;
        if(createdAt === 'null') {
            todo.createdAt = null 
        } else {
            todo.createdAt = new Date(createdAt || todo.createdAt);
        }
        res.json(todo)
    }

    // DELETE
    public deleteTodo = (req:Request, res:Response) => {
        if (!req.params.id || isNaN(+req.params.id)) return res.status(400).json({ error: 'Id parameter is required' });
        const id = +req.params.id;

        const todo = toDos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Not found todo with id: ${id}` });

        const result = toDos.filter((todo) => todo.id !== id)

        res.json(result);
    }
}