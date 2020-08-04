import {authorized_fetch} from '@api/utils'
import {ChangingResourcesType} from '@api/types'

export default class {
    static get CLOUDINARY_API() {
        return 'https://api.cloudinary.com/v1_1/dt4xt6qrm'
    }

    static async get(name: string) {
        return (await authorized_fetch(`/api/${name}`)).json()
    }

    static async getById(name: string, id: string) {
        return (await authorized_fetch(`/api/${name}/${id}`)).json()
    }

    static async edit(name: string, id: string, changes: ChangingResourcesType) {
        return (await authorized_fetch(`/api/${name}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changes)
        })).json()
    }

    static async create(name: string, title: string, image: string) {
        return (await authorized_fetch(`/api/${name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, image})
        })).json()
    }

    static async delete(name: string, id: string) {
        return (await authorized_fetch(`/api/${name}/${id}`, {
            method: 'DELETE'
        })).json()
    }

    static async uploadImage(file: File) {
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'fullstack-web-app')

        return (await fetch(`${this.CLOUDINARY_API}/image/upload`, {
            method: 'POST',
            body: data
        })).json()
    }
}