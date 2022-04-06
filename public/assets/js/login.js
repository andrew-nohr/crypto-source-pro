async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#user-pass').value.trim();
    console.log(username);
    console.log(password);
  
    if (username && password) {
      const response = await fetch('/api/user/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
        console.log("logged in");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  /*async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }*/
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
  /*document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);*/