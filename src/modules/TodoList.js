import { sortItems } from './helper.js';
import TodoItem from './TodoItem.js';

export default class TodoList {
  constructor() {
    this.todoList = localStorage.getItem('todoList')
      ? JSON.parse(localStorage.getItem('todoList'))
      : [];
  }

  getTodoList() {
    return this.todoList;
  }

  addTodoItem(todoItem) {
    todoItem.index = this.todoList.length + 1;
    todoItem.completed = false;
    const newTodoItem = new TodoItem(todoItem);
    this.todoList.push(newTodoItem);
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  removeTodoItem(index) {
    this.todoList = this.todoList.filter((item) => item.index !== index);
    this.todoList = this.todoList.map((item) => {
      if (item.index > index) {
        item.index -= 1;
      }
      return item;
    });
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  removeTodoItemByCompleted() {
    this.todoList = sortItems(this.todoList);
    this.todoList = this.todoList.filter((item) => !item.completed);
    this.todoList = this.todoList.map((item, i) => {
      item.index = i + 1;
      return item;
    });
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  editToDoItem(index, changeData) {
    Object.entries(changeData).forEach(([key, value]) => {
      this.todoList[index - 1][key] = value;
    });
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
}
