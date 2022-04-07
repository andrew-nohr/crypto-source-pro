async function logoutHandler() {
    console.log("Logout button clicked")
    const response = await fetch(`/api/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status == 204) {
        console.log("logout successful")
        document.location.replace('/');

        let signupElement = document.querySelector('.signup-form')
        let successBanner = document.createElement('div')
        successBanner.classList.add('notification')
        successBanner.classList.add('is-success')
        successBanner.classList.add('is-light')
        successBanner.classList.add('mt-4')
        successBanner.textContent = "Logout successful!"
        signupElement.appendChild(successBanner)
    }
  }

document.querySelector('.logout-btn').addEventListener('click', logoutHandler);