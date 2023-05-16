import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Здесь вы можете выполнить запрос к серверу или загрузить данные из другого источника
    // и обновить состояние с помощью setUsers
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей, чтобы эффект выполнился только один раз при монтировании


  

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <img src={user.avatar_url} alt={user.login} />
          <p>ID: {user.id}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
