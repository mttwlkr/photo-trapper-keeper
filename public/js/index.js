$('#add-photo-button').click(addNewPhoto)
$('.display-albums').on('click', '.display-photo-delete-button', deletePhoto)

async function addNewPhoto() {
  event.preventDefault();
  const userTitle = $('#add-photo-title').val()
  const userURL = $('#add-photo-url').val()
  
  try {
    const response = await fetch('/api/v1/photos', {
    method: "POST",
    body: JSON.stringify({title: userTitle, url: userURL}),
    headers: {
      "Content-Type": "application/json"
    }
  })
  const responsePhoto = await response.json();
  if (responsePhoto.newPhoto.id) { resetFields() }
  appendSinglePhoto(responsePhoto)  
  } catch (error) {
    throw error
  }
}

function resetFields() {
  $('#add-photo-title').val('')
  $('#add-photo-url').val('')
}

async function deletePhoto() {
  const photoID = $(this).parent('div').attr('id')
  $(this).parent('div').remove()
  try {
    const response = await fetch(`/api/v1/photos/${photoID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })    
  } catch (error) {
    throw error
  }
}

async function appendSinglePhoto(photo) {
  const displayPhoto = `<div class='display-photo-div' id=${photo.newPhoto.id}><img class='display-photo-image' src='${photo.newPhoto.url}' /><h2 class='display-photo-title'>${photo.newPhoto.title}</h2><button class='display-photo-delete-button'>X</button></div>`
  $('.display-albums').append(displayPhoto)
}

async function fetchPhotos() {
  try {
    const response = await fetch('/api/v1/photos')
    const photos = await response.json()
    return photos 
  } catch (error) {
    throw error
  }
}

async function appendAllPhotos() {
  const photos = await fetchPhotos();
  const displayPhotos = photos.map( photo => {
    return (`<div class='display-photo-div' id=${photo.id}><img class='display-photo-image' src='${photo.url}' /><h2 class='display-photo-title'>${photo.title}</h2><button class='display-photo-delete-button'>X</button></div>`)
  })
  $('.display-albums').append(displayPhotos)
}

$(document).ready( () => {
  appendAllPhotos()
});