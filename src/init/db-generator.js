import categories from './categories'

export default class Generator {
    static async init(db) {
        this.db = db
        await Generator.generate()
    }

    static async generate() {
        await Generator.setData(
            'category',
            categories,
            async (item, collection) => await new collection(item).save()
        )
    }

    static async setData(collection, data, handler) {
        await this.db[collection].deleteMany({})
        for (const item of data)
            await handler(item, this.db[collection])
    }
}