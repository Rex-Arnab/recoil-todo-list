import React, { useState } from 'react'
import { atom, useRecoilState } from 'recoil'

const todoState = atom({
  key: 'todoState',
  default: [],
});

function TodoShowForm() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useRecoilState(todoState);
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg">
      <form className="flex flex-col gap-2">
        <input type="text" placeholder="Todo" className="p-2 rounded-lg border-2 border-gray-300" value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            setTodoList([...todoList, {
              text: todo,
              quantity: 1,
            }]);
            setTodo('');
          }}
        >Add</button>
      </form>
    </div>
  )
}

function Card({ item, index }) {
  const [todoList, setTodoList] = useRecoilState(todoState);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <li className="flex flex-row gap-2 items-center" onDoubleClick={() => setIsEdit(true)}>
      {isEdit ? (
        <li className="flex flex-row gap-2 items-center">
          <input type="text" placeholder="Todo" className="p-2 rounded-lg border-2 border-gray-300" value={item.text} onChange={(e) => {
            const newTodoList = [...todoList];
            newTodoList[index] = {
              text: e.target.value,
              quantity: item.quantity,
            };
            setTodoList(newTodoList);
          }} />
          <input type="number" placeholder="Quantity" className="p-2 rounded-lg border-2 border-gray-300" value={item.quantity} onChange={(e) => {
            const newTodoList = [...todoList];
            newTodoList[index] = {
              text: item.text,
              quantity: e.target.value,
            };
            setTodoList(newTodoList);
          }} />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              setIsEdit(false);
            }}
          >Save</button>
        </li>
      ) : (
        <>
          <span className="text-lg">{item.text} / Q: {item.quantity}</span>
          <button type="submit" className="p-2 bg-red-500 text-white rounded-lg"

            onClick={(e) => {
              e.preventDefault();
              const newTodoList = [...todoList];
              newTodoList.splice(index, 1);
              setTodoList(newTodoList);
            }}
          >Delete</button>
        </>
      )
      }
    </li >
  )
}

function ShowTodoList() {
  const [todo] = useRecoilState(todoState);
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg">
      {todo.length > 0 && (
        <>
          <h2 className="text-2xl font-bold">Todo List</h2>
          <ul className="flex flex-col gap-2">
            {todo && todo.map((item, index) => (
              <Card key={index} item={item} index={index} />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function Home() {
  return (
    <>
      <nav className="p-5 bg-blue-500">
        <h1 className="text-white font-bold uppercase text-2xl">Todo List</h1>
      </nav>
      <main className='grid grid-cols-1 gap-5 place-items-stretch mx-auto mt-5'>
        <TodoShowForm />
        <ShowTodoList />
      </main>
    </>
  )
}

export default Home