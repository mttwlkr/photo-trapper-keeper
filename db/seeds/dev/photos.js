exports.seed = function(knex, Promise) {
  return knex('photos').del() // delete all footnotes first
    .then(() => {
      return Promise.all([
        knex('photos').insert({title: 'corgi', url: 'https://i.imgur.com/MA2D0.jpg'}, 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};