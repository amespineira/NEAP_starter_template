exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('playlists', function(table){
      table.increments('id').primary()
      table.json("songs")
      table.text("name")
      table.text("created_at")
      table.text("updated_at")
    })
  ])
}
exports.down = function(knex, Promise) {
  knex.schema.dropTable('YOUR_TABLE_NAME_HERE')
}
