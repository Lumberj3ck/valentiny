const api_url = import.meta.env.VITE_SERVER_URL

async function login_user(username, password) {
  const data = {
    username: username,
    password: password
  }
  return fetch(`${api_url}/user/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        throw new Error(`${errorData.detail}`)
      })
    }
    return response.json()
  })
}

async function get_user_sections() {
  const authorization_token = localStorage.getItem('access-token')
  return await fetch(`${api_url}/user/sections/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${authorization_token}`
    }
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        throw new Error(`${errorData.detail}`)
      })
    }
    return response.json()
  })
}

async function register_user(username, email, password) {
  const data = {
    username: username,
    email: email,
    password: password
  }
  return fetch(`${api_url}/user/create_user/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        throw new Error(`${errorData.detail}`)
      })
    }
    return response.json()
  })
}

async function save_sections(data) {
  const authorization_token = localStorage.getItem('access-token')
  return await fetch(`${api_url}/user/save_sections/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${authorization_token}`
    },
    body: JSON.stringify(data)
  })
}

async function upload_image(formData) {
  return fetch(`${api_url}/upload_image/`, {
    method: 'POST',
    body: formData
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        if (response.status === 413) {
          throw new Error('Image is too large. Please choose a smaller image.')
        } else {
          throw new Error(`${errorData.detail}`)
        }
      })
    }
    return response.json()
  })
}

async function check_subdomain_availability(subdomain, domain) {
  const authorization_token = localStorage.getItem('access-token')
  return fetch(`${api_url}/user/check_subdomain_availability/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization_token}`
    },
    body: JSON.stringify({
      name: subdomain,
      domain_name: domain
    })
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        throw new Error(`${errorData.detail}`)
      })
    }
    return response.json()
  })
}

async function upload_website(name, domain_name, zipFile) {
  const authorization_token = localStorage.getItem('access-token')
  const formData = new FormData()

  formData.append('subdomain_name', name)
  formData.append('domain_name', domain_name)
  formData.append('zip_file', zipFile, 'postcard.zip')

  return fetch(`${api_url}/user/upload_website/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authorization_token}`
    },
    body: formData
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        throw new Error(`${errorData.detail}`)
      })
    }
    return response.json()
  })
}

async function check_user_domains() {
  const authorization_token = localStorage.getItem('access-token')
  return fetch(`${api_url}/user/domains/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authorization_token}`
    }
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        throw new Error(`${errorData.detail}`)
      })
    }
    return response.json()
  })
}

async function get_user_balance() {
  const authorization_token = localStorage.getItem('access-token')
  return fetch(`${api_url}/user/balance/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authorization_token}`
    }
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        throw new Error(`${errorData.detail}`)
      })
    }
    return response.json()
  })
}
// async function create_checkout_session() {
//   return fetch(`${api_url}/create-checkout-session/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then((response) => {
//       if (!response.ok) {
//         return response.json().then((errorData) => {
//           throw new Error(`${errorData.detail}`)
//         })
//       }
//       return response.json()
//     })
// }

const fetchClientSecret = async () => {
  const response = await fetch(`${api_url}/create-checkout-session/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      'X-Session-URL': window.location.href
    }
  })
  const { clientSecret } = await response.json()
  return clientSecret
}


async function checkSessionStatus(sessionId) {
  const response = await fetch(`${api_url}/session-status?session_id=${sessionId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access-token')}`
    }
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch session status')
  }

  const data = await response.json()
  return data
}


export {
  register_user,
  login_user,
  get_user_sections,
  save_sections,
  upload_image,
  check_subdomain_availability,
  upload_website,
  check_user_domains,
  get_user_balance,
  fetchClientSecret,
  checkSessionStatus
}
