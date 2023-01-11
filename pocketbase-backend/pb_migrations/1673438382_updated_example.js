migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0gxtss6rjj355p2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xq4zj2ew",
    "name": "title",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0gxtss6rjj355p2")

  // remove
  collection.schema.removeField("xq4zj2ew")

  return dao.saveCollection(collection)
})
