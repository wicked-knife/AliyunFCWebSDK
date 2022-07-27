import Client from "../lib/index";

const client = new Client({
  accessKeyID: "<your accessKeyID>",
  accessKeySecret: "<your accessKeySecret>",
});

const signedHeaders = client.getSignedHeaders('get', '/')

client.get('<your FC http trigger URL>', {
  headers: signedHeaders,
})
