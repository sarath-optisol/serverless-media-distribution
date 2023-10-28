import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import createError from "http-errors";
import httpJsonBodyParser from "@middy/http-json-body-parser";

export async function getFile(event) {
  var AWS = require("aws-sdk");
  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    signatureVersion: "v4",
    region: "us-east-1",
  });

  try {
    const { fileName } = event?.body;

    const signedUrl = s3.getSignedUrl("getObject", {
      Bucket: process?.env?.BOOKART_BUCKET_NAME,
      Key: fileName,
      Expires: 9000,
    });
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Allow": "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        fileUrl: signedUrl,
      }),
    };
  } catch (error) {
    console.log();
    console.error(error);
    throw createError[400](error);
  }
}

export const handler = middy(getFile)
  .use(httpJsonBodyParser())
  .use(httpErrorHandler());

//   .use(httpJsonBodyParser())
