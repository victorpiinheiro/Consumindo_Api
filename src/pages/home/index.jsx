import './style.css'

import { useEffect, useState, useRef } from 'react';

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import api from '../../services/api'

function Home() {

  const [editId, setEditId] = useState(false)
  const [users, setUsers] = useState([])


  const inputName = useRef()
  const inputEmail = useRef()
  const inputAdress = useRef()
  const inputPhone = useRef()

  async function getUser() {
    const userFromApi = await api.get('/clientes')

    setUsers(userFromApi.data);

  }

  async function createUser() {
    console.log(editId)
    if (editId) {
      await api.put(`clientes/${editId}`, {
        name: inputName.current.value,
        email: inputEmail.current.value,
        adress: inputAdress.current.value,
        phone: inputPhone.current.value,
      })
      getUser();
      setEditId(false);

      inputName.current.value = '';
      inputEmail.current.value = '';
      inputAdress.current.value = '';
      inputPhone.current.value = '';
      return;
    } else {
      await api.post('/clientes', {
        name: inputName.current.value,
        email: inputEmail.current.value,
        adress: inputAdress.current.value,
        phone: inputPhone.current.value,
      });

    }




    console.log('criado com sucesso')

    getUser();

  }

  async function deleteUser(id) {

    await api.delete(`/clientes/${id}`)

    getUser();

  }




  useEffect(() => {
    getUser()

  }, [])


  function startEditUser(user) {
    inputName.current.value = user.name;
    inputEmail.current.value = user.email;
    inputAdress.current.value = user.adress;
    inputPhone.current.value = user.phone;

    setEditId(user.id);
  }

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Cliente</h1>
        <label>Nome</label>
        <input type="text" name='name' ref={inputName} />
        <label>Email</label>
        <input type="email" name='email' ref={inputEmail} />
        <label>Telefone</label>
        <input type="text" name='phone' ref={inputPhone} />
        <label>Endereço</label>
        <input type="text" name='adress' ref={inputAdress} />

        <button type='button' onClick={createUser} > {editId ? 'Atualizar Cadastrado' : 'Cadastrar cliente'}</button>
      </form>


      {users.map((user) => (
        <div key={user.id} className='cards'>
          <div >
            <p>Nome: <span>{user.name}</span></p>
            <p>Email: <span> {user.email}</span></p>
            <p>Endereço: <span> {user.adress}</span></p>
            <p>Telefone: <span>{user.phone}</span></p>

          </div>


          <button onClick={() => startEditUser(user)}> <FaEdit /> </button>
          <button onClick={() => deleteUser(user.id)}> <FaTrashAlt /> </button>


        </div>
      ))}
    </div>

  )
}

export default Home
