# 🚀 阿里云函数计算（FC）的 Web SDK
## 背景

阿里云函数计算的SDK没有在浏览器环境中的实现，当使用HTTP触发且配置了签名校验时，需要自己实现加签算法。

## 安装

```bash
npm i @chongho/aliyun_fc_web_sdk
```

## 使用示例

```javascript
import Client from "@chongho/aliyun_fc_web_sdk";

const client = new Client({
  accessKeyID: "<your accessKeyID>",
  accessKeySecret: "<your accessKeySecret>",
});

const signedHeaders = client.getSignedHeaders('get', '<your FC path>')

client.get('<your FC http trigger URL>', {
  headers: signedHeaders,
})
```
