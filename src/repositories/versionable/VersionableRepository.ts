import * as mongoose from 'mongoose';
import { DocumentQuery, Query } from 'mongoose';

console.log('Inside VersionableRepository')

export default class VersioningRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    private model: M;

    constructor(model) {
        this.model = model;
    }

    public async create(options: any): Promise<D> {
        const id = VersioningRepository.generateObjectId()
        const model = new this.model({
            ...options,
            _id: id,
            originalId: id
        });
        return await model.save()
    }

    public count(query: any): Query<number> {
        const finalQuery = { deletedAt: null, ...query };
        return this.model.countDocuments(finalQuery);
    }

    public getAll(query, projection, options): DocumentQuery<D[], D> {
        console.log('query -----------> ',query);
        console.log('projection -----------> ',projection);
        console.log('options -----------> ',options);
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.find(finalQuery, projection, options);
    }

    public findOne(query): DocumentQuery<D, D> {
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.findOne(finalQuery);
    }

    public async delete(id: string): Promise<D> {
        const previous = await this.findOne({ originalId: id, deletedAt: undefined })
        console.log('previous data', id);
        if (previous) {
            return await this.invalidate(id)
        }
    }
    
    public invalidate(id: string): DocumentQuery<D, D> {
        const query: any = { originalId: id, deletedAt: { $exists: false } };
        const data: any = { deletedAt: Date.now() };
        return this.model.updateOne(query, data);
    }

    public async update(data: any): Promise<D> {
        const prev = await this.findOne({ originalId: data.originalId, deletedAt: undefined })
        console.log('prev values', prev);
        if (prev) {
            console.log('trying to call invalidate');
            await this.invalidate(data.originalId);
        }
        else {
            return null;
        }
        console.log('Data inside update', data);
        const dataToUpdate = data.dataToUpdate;
        const newData = Object.assign(JSON.parse(JSON.stringify(prev)), dataToUpdate);
        console.log('new Data', newData);
        newData._id = VersioningRepository.generateObjectId();
        delete newData.deletedAt;
        const model = new this.model(newData);
        return model.save()
    }
}
