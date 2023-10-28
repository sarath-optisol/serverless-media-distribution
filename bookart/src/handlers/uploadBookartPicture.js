import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import createError from "http-errors";
// import httpJsonBodyParser from "@middy/http-json-body-parser";

export async function uploadBookartPicture(event) {
  var AWS = require("aws-sdk");
  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    signatureVersion: "v4",
    region: "us-east-1",
  });
  const { fileName } = event?.body;

  try {
    const signedUrl = s3.getSignedUrl("putObject", {
      Bucket: process?.env?.BOOKART_BUCKET_NAME,
      Key: fileName,
      Expires: 9000,
    });

    return {
      statusCode: 200,
      body: {
        uploadUrl: signedUrl,
        fileKey: fileName,
      },
    };
  } catch (error) {
    console.log();
    console.error(error);
    throw createError[400](error);
  }
}

export const handler = middy(uploadBookartPicture).use(httpErrorHandler());

//   .use(httpJsonBodyParser())
