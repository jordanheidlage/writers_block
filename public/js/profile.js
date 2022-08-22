const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#writing-name').value.trim();
    const description = document.querySelector('#writing-desc').value.trim();
  
    if (name && description) {
      const response = await fetch(`/api/writings`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create writing');
      }
    }
  };
  
  document
    .querySelector('.new-writing-form')
    .addEventListener('submit', newFormHandler);