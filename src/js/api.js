
// const api_url = 'http://localhost:8000'
const api_url = 'https://postcard-api.24-7.ro'

async function login_user(username, password){
    const data = {
        username: username,
        password: password
    }
  return fetch(`${api_url}/login`, {
    method: 'POST',
    headers: { 
    'Content-Type': 'application/json',
    'accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorData => {
        throw new Error(`${errorData.detail}`);
      });
    }
    return response.json();
  });
}

async function get_user_sections(){
  const authorization_token = localStorage.getItem('access-token')
  return await fetch(`${api_url}/user/sections`, {
    method: 'GET',
    headers: { 
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': `Bearer ${authorization_token}`
    },
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorData => {
        throw new Error(`${errorData.detail}`);
      });
    }
    return response.json();
  });
}

async function register_user(username, email, password){
    const data = {
        username: username,
        email: email,
        password: password
    }
  return fetch(`${api_url}/users/create_user`, {
    method: 'POST',
    headers: { 
    'Content-Type': 'application/json',
    'accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorData => {
        throw new Error(`${errorData.detail}`);
      });
    }
    return response.json();
  });
}

async function save_sections(data){
  const authorization_token = localStorage.getItem('access-token')
  return await fetch(`${api_url}/save_sections`, {
    method: 'PUT',
    headers: { 
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': `Bearer ${authorization_token}`
    },
    body: JSON.stringify(data)
  })
}

export {
    register_user,
    login_user,
    get_user_sections,
    save_sections
}