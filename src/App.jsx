import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // useState
  const [newitem, setnewItem] = useState("")
  const [items, setItems] = useState(getLocalStorage())
  const [filter, setFilter] = useState("all")
  const [editId, setEditId] = useState(null)
  const [editInput, setEditInput] = useState('')

  useEffect(() => {
    setLocalStorage()
  }, [items])
  //Helper functions
  function addItem() {
    if (!newitem) {
      alert("Enter item")
      return;
    }
    const item = {
      id: Date.now(),
      value: newitem,
      checked: false
    }
    setItems(oldList => [...oldList, item]);
    setnewItem("");
  }
  const deleteItem = (id) => {
    const newArray = items.filter(item => item.id != id)
    setItems(newArray);
  }
  const checkItem = (id) => {
    const itemClone = items.map(item => {
      if (item.id == id) {
        item.checked = !item.checked
      }
      return item;
    })
    setItems(itemClone);
  }
  //filter items

  const filteredTodos = items.filter((item) => {
    if (filter === 'active') {
      return !item.checked;
    }
    if (filter === 'completed') {
      return item.checked;
    }
    return true;
  });
  // if (filter=="active"){
  //   return items.filter(item=>item.checked==false)
  // }
  // if (filter=="completed"){
  //   return items.filter(item=>item.checked==true)
  // }

  //handle filter change

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)

  }
  function setLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(items))
  }
  function getLocalStorage() {
    return JSON.parse(localStorage.getItem("todo")) || []
  }

  function handleDoubleClick(id, value) {
    console.log('hh')
    setEditInput(value)
    setEditId(id)
  }

  const handleEdit = (id) => {
    const itemClone = items.map(item => {
      if (item.id == id) {
        item.value = editInput;
      }
      return item;
    })
    setItems(itemClone);
    setEditId(null);
    setEditInput("")

  }
  const handleBack = () => {
    setEditId(null);
    setEditInput("");
  }

  return (
    <div className="todoList min-h-screen bg-homeBG flex flex-col justify-center items-center w-full" >
      {/* 1.Todo Header */}
      <h3 className='todoTitle'>todos</h3>
      {/* 2.Input box (with box and a button) */}
      <div className="text-lg">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newitem}
          onChange={e => setnewItem(e.target.value)}
          className="inputForTodo"
        >
        </input>
        <button className="btn btn-active mx-2" onClick={() => addItem()}>Add item</button>
        {/* 3.Unordered list */}
        <ul className='w-full flex flex-col'>
          {
            filteredTodos.map(item => {
              if (editId == item.id) {
                return (
                  <div className='w-full flex my-2'>
                    <input type="text" className='grow' value={editInput} onChange={({ target: { value } }) => setEditInput(value)} />
                    <button className="btn mx-2" onClick={() => { handleEdit(item.id) }}>Save</button>
                    <button className="btn " onClick={() => { handleBack() }}>Cancel</button>
                  </div>
                )
              }

              return (
                <li key={item.id} className="w-full flex">
                  <input type="checkbox" onChange={() => checkItem(item.id)} checked={item.checked} className="checkbox mx-1 self-center"></input>
                  <div className='grow pl-2 self-center' onDoubleClick={() => handleDoubleClick(item.id, item.value)}>
                    {item.value}
                  </div>
                  <button className="btn btn-outline btn-error my-2 mx-2" onClick={() => deleteItem(item.id)}>delete</button>
                </li>
              )
            })
          }
          <div>
            <button className={`btn ${filter == 'all' ? "btn-primary " : "btn-outline"}  mt-5 mx-2`} onClick={() => { handleFilterChange("all") }}>All</button>
            <button className={`btn  ${filter == 'active' ? "btn-secondary " : "btn-outline"}  mx-4`} onClick={() => { handleFilterChange("active") }}>Active</button>
            <button className={`btn  ${filter == 'completed' ? "btn-accent " : "btn-outline"} `} onClick={() => { handleFilterChange("completed") }}>Complete</button>
          </div>
        </ul>
      </div>
    </div>
  )

}
export default App