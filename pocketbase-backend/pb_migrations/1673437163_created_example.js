migrate((db) => {
  const collection = new Collection({
    "id": "dc39rz1bxcyn1h7",
    "created": "2023-01-11 11:39:23.391Z",
    "updated": "2023-01-11 11:39:23.391Z",
    "name": "example",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "s3v8ajqv",
        "name": "field",
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
  const collection = dao.findCollectionByNameOrId("dc39rz1bxcyn1h7");

  return dao.deleteCollection(collection);
})
