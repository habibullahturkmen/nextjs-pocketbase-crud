migrate((db) => {
  const collection = new Collection({
    "id": "0gxtss6rjj355p2",
    "created": "2023-01-11 11:58:56.985Z",
    "updated": "2023-01-11 11:58:56.985Z",
    "name": "example",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kn1hutuy",
        "name": "documents",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": []
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0gxtss6rjj355p2");

  return dao.deleteCollection(collection);
})
