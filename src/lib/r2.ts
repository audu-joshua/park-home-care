import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = process.env.B2_BUCKET_NAME || "pack-home-resumes";
const endpoint = process.env.B2_ENDPOINT;
const region = process.env.B2_REGION || "us-west-004";

const client = endpoint && process.env.B2_KEY_ID && process.env.B2_APPLICATION_KEY
  ? new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId: process.env.B2_KEY_ID,
        secretAccessKey: process.env.B2_APPLICATION_KEY,
      },
    })
  : null;

function requireClient() {
  if (!client) {
    throw new Error("Backblaze B2 is not configured");
  }
  return client;
}

export async function uploadResume(key: string, body: Uint8Array, contentType: string) {
  await requireClient().send(new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));
}

export async function getResumeDownloadUrl(key: string, fileName: string) {
  return getResumeUrl(key, `attachment; filename="${fileName.replace(/"/g, "")}"`);
}

export async function getResumeViewUrl(key: string, fileName: string) {
  return getResumeUrl(key, "inline");
}

async function getResumeUrl(key: string, contentDisposition: string) {
  return getSignedUrl(requireClient(), new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
    ResponseContentDisposition: contentDisposition,
  }), { expiresIn: 900 });
}

export async function deleteResume(key: string) {
  await requireClient().send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
}
