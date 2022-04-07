async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#user-pass').value.trim();
    console.log(username);
    //console.log(password);
  
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
        console.log(response.statusText);
      }
    }
  }
  
  async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#register-id').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const createUserResponse = await fetch('/api/user', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (createUserResponse.ok) {
        const createdUser = await createUserResponse.json();
        
        const createWalletResponse = await fetch('/api/wallet', {
          method: 'post',
          body: JSON.stringify({
            name: "User Wallet",
            user_id: createdUser.id
          }),
          headers: { 'Content-Type': 'application/json' }
        });

        let signupElement = document.querySelector('.signup-form')
        let successBanner = document.createElement('div')
        successBanner.classList.add('notification')
        successBanner.classList.add('is-success')
        successBanner.classList.add('is-light')
        successBanner.classList.add('mt-4')
        successBanner.textContent = "Signup successful! Please login."
        signupElement.appendChild(successBanner)
      } else {
        console.log(createUserResponse.statusText);
        const createdUserError = await createUserResponse.json();
        console.log(createdUserError)
        let signupElement = document.querySelector('.signup-form')
        let successBanner = document.createElement('div')
        successBanner.classList.add('notification')
        successBanner.classList.add('is-danger')
        successBanner.classList.add('is-light')
        successBanner.classList.add('mt-4')
        successBanner.textContent = "Error signing up: " + createdUserError.errors[0].message
        signupElement.appendChild(successBanner)
      }
    }
  }
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);