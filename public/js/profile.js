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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/writings/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete writing');
    }
  }
};

document
  .querySelector('.new-writing-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.writing-list')
  .addEventListener('click', delButtonHandler);