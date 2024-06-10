const Todo = require('../models/todos-model');
class TodosController {
    getAll = () => {
       return async (req, res, next) => {
           const user_id = 1 ;
           const {count, rows} = await Todo.findAndCountAll({
            where: {user_id: user_id}
           });
           res.status(200).json({
               success: true,
               count: count,
               data: rows
           });
       }
    }

    create = () => {
       return async (req, res, next) => {
            try{
               const todo = await Todo.create({
                  name: req.body.name,
                  user_id: 1,
                  completed: req.body.completed
               });
               res.status(201).json({success: true , todo: todo});

            } catch(err){
                res.status(422).json(err.errors);
            }
       }
    }

    findById = () => {
       return async (req, res, next) => {

         const user_id = 1;
         const todoID = req.params.id;
         const todo = await Todo.findOne({
            where: {
               id: todoID,
               user_id: user_id
            }
         }) ;
         const resp = {success: false, todo: null};
         if(todo){
            resp.success = true;
            resp.todo = todo;
         }
            res.status(200).json(resp) ;
       }
    }

    update = () => {
       return async (req, res, next) => {

         const todoId = req.params.id;
         const user_id = 1;
         const resp = {success: false, msg: "Todo not found"};
         const todo = await Todo.findOne({
            where: {
               id: todoId,
               user_id: user_id
            }
         });
         if(todo){
            const vals = {name: req.body.name, completed: req.body.completed };
             await Todo.update(vals, {where: {id:todoId}} );
             await todo.reload();
             resp.success = true;
             resp.msg = "Todo updated";
             resp.todo = todo;
         }
            res.status(200).json(resp) ;
       }
    }

    delete = () => {
       return async (req, res, next) => {
         const todoId = req.params.id;
         const user_id = 1;
         const todo = await Todo.findOne({
            where: {
               id: todoId,
               user_id: user_id
            }
            });
            const resp = {success: false, msg: "Todo not found"};
            if(todo){
               await Todo.destroy({where: {id: todoId}});
               resp.success= true;
               resp.msg = 'Todo deleted successfully';
            }
            res.status(200).json(resp) ;
       }
    }
}


module.exports = new TodosController();