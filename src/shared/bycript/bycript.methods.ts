import bcrypt from 'bcrypt'

export async function passwordMatched(
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isPassMatched = await bcrypt.compare(givenPassword, savedPassword)
  return isPassMatched
}
