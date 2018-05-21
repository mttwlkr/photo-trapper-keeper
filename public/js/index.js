$('#add-photo-button').click(addNewPhoto)

async function addNewPhoto() {
  event.preventDefault();
  const userTitle = $('#add-photo-title').val()
  const userURL = $('#add-photo-url').val()

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
}

function resetFields() {
  $('#add-photo-title').val('')
  $('#add-photo-url').val('')
}

async function appendSinglePhoto(photo) {
  const displayPhoto = `<div id=${photo.newPhoto.id}><h2 class='display-photo-title'>${photo.newPhoto.title}</h2><img class='display-photo-image' src='${photo.newPhoto.url}' /><button class='display-photo-delete-button'>X</button></div>`
  $('.display-albums').append(displayPhoto)
}

async function fetchPhotos() {
  const response = await fetch('/api/v1/photos')
  const photos = await response.json()
  return photos
}

async function appendAllPhotos() {
  const photos = await fetchPhotos();
  const displayPhotos = photos.map( photo => {
    return (`<div id=${photo.id}><h2 class='display-photo-title'>${photo.title}</h2><img class='display-photo-image' src='${photo.url}' /><button class='display-photo-delete-button'>X</button></div>`)
  })
  $('.display-albums').append(displayPhotos)
}

$(document).ready( () => {
  appendAllPhotos()
});