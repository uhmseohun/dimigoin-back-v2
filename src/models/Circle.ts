import { ObjectId } from 'mongodb'
import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose'
import { ConfigKeys } from '../types'
import { ConfigModel } from './Config'
import { userSchema } from './User'

const circleSchema = createSchema({
  name: Type.string({ required: true, unique: true, trim: true }),
  imageKey: Type.string({ default: 'CIRCLE_PROFILE/default.png' }),
  description: Type.string({ required: true }),
  chair: Type.ref(Type.objectId()).to('User', userSchema),
  viceChair: Type.ref(Type.objectId()).to('User', userSchema),
  videoLink: Type.string({ required: true }),
  category: Type.string({
    required: true,
    validate: async (value: string) => {
      const { value: category } =
        await ConfigModel.findOne({ key: ConfigKeys.circleCategory })
      return category.includes(value)
    }
  })
}, { versionKey: false, timestamps: true })

type CircleDoc = ExtractDoc<typeof circleSchema>;

const CircleModel = typedModel('Circle', circleSchema, undefined, undefined, {
  findByChair (chair: ObjectId): CircleDoc {
    return this.findOne({ chair })
  },
  findByViceChair (viceChair: ObjectId): CircleDoc {
    return this.findOne({ viceChair })
  },
  findByChairs (user: ObjectId): CircleDoc {
    console.log(user)
    return this.findOne({ $or: [{ chair: user }, { viceChair: user }] })
  }
})

export {
  circleSchema,
  CircleModel
}
