const editButton = document.querySelector('.start-editing')
const title = document.querySelector('#story-name')
const description = document.querySelector('#editing-desc')
const editingForm = document.querySelector('.editing-form')
const url = document.location.href
const lastSegment = url.split("/").pop()

const startEditing = (event) => {
    event.preventDefault();
    editButton.classList.add("hide")
    editingForm.classList.remove("hide")
}

const editFormHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#editing-desc').value.trim();
    if (description) {
      const response = await fetch(`/api/writings/${lastSegment}`, {
        method: 'PUT',
        body: JSON.stringify({ description }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!response.ok) {
        alert('Failed to edit writing');
      }else{
        document.location.replace(url)
      }
      
    }
  };
  
const dlFormHandler = async (event) => {
  event.preventDefault()
  const response = await fetch(`/writings/download/${lastSegment}`, {
    method: 'GET'
  })
  if (!response.ok) {
    alert('Failed to download writing');
  } 
}
  
  document
    .querySelector('.editing-form')
    .addEventListener('submit', editFormHandler);

    document
    .querySelector('.download-form')
    .addEventListener('submit', dlFormHandler);    

    editButton.addEventListener('submit', startEditing);