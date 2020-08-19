import Attachment from '../models/Attachment';

class AttachmentController {
    async create(request, response) {
        const { originalname, filename } = request.file;

        const attachment = await Attachment.create({
            name: originalname,
            file: filename,
        });

        return response.json(attachment);
    }
}

export default new AttachmentController();