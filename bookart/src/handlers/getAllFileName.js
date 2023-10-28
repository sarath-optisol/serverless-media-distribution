import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import createError from "http-errors";
// import httpJsonBodyParser from "@middy/http-json-body-parser";

export async function getAllFileName(event) {
  var AWS = require("aws-sdk");
  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    signatureVersion: "v4",
    region: "us-east-1",
  });

  try {
    const allObjectData = await s3
      .listObjectsV2({
        Bucket: process?.env?.BOOKART_BUCKET_NAME,
      })
      .promise();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Allow: "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        fileNames: allObjectData?.Contents?.map((val) => val?.Key),
      }),
    };
  } catch (error) {
    console.log();
    console.error(error);
    throw createError[400](error);
  }
}

export const handler = middy(getAllFileName).use(httpErrorHandler());

//   .use(httpJsonBodyParser())
