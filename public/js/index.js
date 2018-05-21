// $('.add-photo-button').on('click',)

// function addNewPhoto(event) {
//   event.preventDefault()
//   const userTitle = $('#add-photo-title').val()
//   const userURL = $('#add-photo-url').val()
//   console.log(userURL)
// }

async function fetchPhotos() {
  const response = await fetch('/api/v1/photos')
  const photos = await response.json()
  return photos
}

async function appendAllPhotos() {
  const photos = await fetchPhotos();
  const displayPhotos = photos.map( photo => {
    return (`<div id=${photo.id}><h2 class='display-photo-title'>${photo.title}</h2><img class='display-photo-image' src='${photo.url}' /></div>`)
  })
  // displayPhotos.forEach( div => {
  //   console.log(div)
  //   $('.display-albums').append(div)
  // })
  $('.display-albums').append(displayPhotos)
}


$(document).ready( () => {
  appendAllPhotos()
});