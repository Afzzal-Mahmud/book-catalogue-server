import ApiErrors from '../../../errors/ApiErrors'
import { IUser } from './user.interface'
// import { userSearchableFields } from './user.constant'
import { User } from './user.model'

const createUser = async (payload: IUser): Promise<IUser> => {
  const userWithRole = { ...payload, role: 'user' }
  const user = await User.create(userWithRole)
  return user
}

// const getEveryUsers = async (
//   filters: IUserFilters,
//   paginationObject: IPaginationObject
// ): Promise<IGenericResponseOnGet<IUser[]>> => {
//   const { searchTerm, ...filtersData } = filters
//   const { page, limit, skipDoc, sortBy, sortOrder } =
//     paginationHelper.calculatePagination(paginationObject)

//   const andConditions = []
//   // Search needs $or for searching in specified fields for any match
//   if (searchTerm) {
//     andConditions.push({
//       $or: userSearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     })
//   }
//   // Filters needs $and to filter exact data match
//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     })
//   }

//   // Dynamic Sort needs  field to  do sorting
//   const sortConditions: { [key: string]: SortOrder } = {}
//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder
//   }
//   const dataRetrieveCondition =
//     andConditions.length > 0 ? { $and: andConditions } : {}

//   const total = await User.countDocuments()
//   const result = await User.find(dataRetrieveCondition)
//     .sort(sortConditions)
//     .skip(skipDoc)
//     .limit(limit)

//   return {
//     meta: { page, limit, total },
//     data: result,
//   }
// }

// const retriveSingleUser = async (id: string): Promise<IUser | null> => {
//   const result = await User.findById(id)
//   return result
// }

const updateUserInfo = async (
  _id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isUserExist = await User.findOne({ _id })
  if (!isUserExist) {
    throw new ApiErrors(404, 'User not found')
  }

  const { ...userData } = payload

  Object.assign(isUserExist, userData)

  const result = await User.findOneAndUpdate({ _id }, payload, {
    new: true,
  })
  return result
}

// const deleteUser = async (_id: string): Promise<IUser | null> => {
//   const result = await User.findByIdAndDelete(_id)
//   return result
// }

export const userServices = {
  createUser,
  updateUserInfo,
}
