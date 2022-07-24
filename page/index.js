import axios from "axios";
import Client from "../lib/index";

const client = new Client({
  accessKeyID: "<your accessKeyID>",
  accessKeySecret: "<your accessKeySecret>",
});
const signedHeaders = client.getSignedHeaders('post', '/')
axios
  .post(
    "<your FC http trigger URL>",
    'hello world',
    {
      headers: signedHeaders
    }
  )
  .then((res) => {
    console.log(res);
  });
