const api_url = import.meta.env.VITE_SERVER_URL

async function login_user(username, password){
    const data = {
        username: username,
        password: password
    }
  return fetch(`${api_url}/user/login/`, {
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
  return await fetch(`${api_url}/user/sections/`, {
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
  return fetch(`${api_url}/user/create_user/`, {
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
  return await fetch(`${api_url}/user/save_sections/`, {
    method: 'PUT',
    headers: { 
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': `Bearer ${authorization_token}`
    },
    body: JSON.stringify(data)
  })
}

async function upload_image(formData){
  return fetch(`${api_url}/upload_image/`, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorData => {
        if (response.status === 413) {
          throw new Error('Image is too large. Please choose a smaller image.');
        } else {
          throw new Error(`${errorData.detail}`);
        }
      });
    }
    return response.json();
  });
}

export {
    register_user,
    login_user,
    get_user_sections,
    save_sections,
    upload_image
}