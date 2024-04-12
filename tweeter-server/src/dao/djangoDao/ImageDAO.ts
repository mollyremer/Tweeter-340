import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { ImageDAOInterface } from "./DAOInterfaces";

export class ImageDAO implements ImageDAOInterface {
    private BUCKET: string = "mollys-test-bucket";
    private REGION: string = "us-east-2";

    async putImage(
        fileName: string,
        imageStringBase64Encoded: string
    ): Promise<string> {
        let decodedImageBuffer: Buffer = Buffer.from(
            imageStringBase64Encoded,
            "base64"
        );
        const s3Params = {
            Bucket: this.BUCKET,
            Key: "image/" + fileName,
            Body: decodedImageBuffer,
            ContentType: "image/png",
            ACL: ObjectCannedACL.public_read,
        };
        const c = new PutObjectCommand(s3Params);
        const client = new S3Client({ region: this.REGION });
        try {
            await client.send(c);
            return (
                `https://${this.BUCKET}.s3.${this.REGION}.amazonaws.com/image/${fileName}`
            );
        } catch (error) {
            throw Error("s3 put image failed with: " + error);
        }
    }
}