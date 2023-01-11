migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4hom6trpa59985u");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "4hom6trpa59985u",
    "created": "2023-01-11 09:50:30.650Z",
    "updated": "2023-01-11 09:50:30.650Z",
    "name": "testcollection",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4gbco4ay",
        "name": "field1",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "yy0ylupe",
        "name": "field2",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
})
