const newFormHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#writing-name').value.trim();
  const description = document.querySelector('#writing-desc').value.trim();
  if (name && description) {
    axios.post('http://localhost:3001/api/writings', {
      name: name,
      description: description
    })
    .then(function () {
        document.location.replace('/');
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};
document
  .querySelector('.new-writing-form')
  .addEventListener('submit', newFormHandler);