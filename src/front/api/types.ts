type ID = { _id: string }

export type CategoryType = ID & { title: string, image: string }
export type ChangingCategoryType = { title?: string, image?: string }

export type ResourcesType = CategoryType
export type ChangingResourcesType = ChangingCategoryType

export type UserType = { email: string, firstname?: string, lastname?: string, password: string }