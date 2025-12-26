# FSARCH Backup-Protocol Documentation

## Connector-API

Each connector has to implement at least the following endpoints (prefix could be anything, e.g. `/.backup/v1`):

### GET /services

List all services that could be backed up by this connector using the following response format:

```json
{
  "services": [
    {
      "id": "string",               // Unique identifier for the service, could be a UUID or readable id, but has to be unique inside this connector
      "name": "string",             // Human-readable name of the service
      "description": "string"       // Optionla: Description of the service
    }
  ]
}
```


### POST /services/:serviceId/_actions/start-backup

Start a backup for the service with the given `serviceId`. The request body has to contain the following fields:

```json
{
  "id": "string",           // Unique identifier for the backup process. It has to be send on the following status updates and data pushes.
  "secret": "string",       // Secret token to authenticate the backup process
  "timeout": "number"       // Timeout in seconds for the backup process. When collecting data takes longer than this timeout, a ping request has to be send to the backup-server
}
```


## (Optional) Connector Meta-API

You could optionally implement the following endpoint to provide meta-information about the connector for auto-discovery purposes:

### GET /.meta/backup

Provides meta-information about the connector using the following response format:

```json
{
  "path": "string",                 // Base path of the connector API (e.g. `/.backup/v1`)
  "version": "string",               // version of the connector
  "connectorApiVersion": "1"        // version of the connector API that is implemented by this connector
}
```


## Backup-Server-API

After the backup server sends a backup-request to the connector, the connector has to send status updates and data pushes to the backup-server using the following endpoints:

The secret has to be sent as `Authorization` header in the format `Bearer <secret>` for each request. Otherwise the request will be rejected with a `401 Unauthorized` response.

### POST /backups/:backupId/_actions/ping

Executes a ping to keep the backup process alive. Not request body is needed.

### POST /backups/:backupId/files

Create a new file in the backup with the following request body:

```json
{
  "path": "string"   // The path and/or filename of the file to upload inside the backup
}
```

### POST /backups/:backupId/files/:fileId/chunks?serial=number

Upload a chunk of data for the file with the given `fileId`. The `serial` query parameter indicates the order of the chunk (starting with `0` for the first chunk). The request body has to contain the binary data of the chunk.

### POST /backups/:backupId/files/:fileId/_actions/complete?serial=number

Completes the upload of a file. You have to provide the `serial` query parameter with the total number of chunks that were uploaded for this file. No request body is needed.

### POST /backups/:backupId/_actions/complete

Completes the backup process. No request body is needed.
