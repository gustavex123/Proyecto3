import NoteModel from  "./note.model.js";

export default class NoteMongoRepository { 
    async save(noteEntity) {
        const note = new NoteModel({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userId
        });
        const savedNote = await note.save();
        return savedNote.toObject();
    }

    async findByUserId(userId) {
       return await NoteModel.find({ userId });
    }

    async getById(id) {
    const note = await NoteModel.findById(id);
    if (!note) return null;
    return note.toObject();
    }

    async update(id, data) {
        const updatedNote = await NoteModel.findByIdAndUpdate(
            id,
            {
                title: data.title,
                content: data.content,
                imageUrl: data.imageUrl,
                isPrivate: data.isPrivate,
                password: data.password
            },
            { new: true } // devuelve el actualizado
        );

        if (!updatedNote) return null;
        return updatedNote.toObject();
    }

    async delete(id) {
        const deletedNote = await NoteModel.findByIdAndDelete(id);
        if (!deletedNote) return null;
        return deletedNote.toObject();
    }
}