import { hash, genSalt } from 'bcryptjs'
import { Value } from './classes/value'
import safeCompare from 'safe-compare'

let saltCache = ''

const getSalt = async () => {
  if (saltCache) return saltCache
  const result = await Value.findOne({ where: { key: 'SALT' } })
  if (result) {
    saltCache = result.value
    return saltCache
  }

  const salt = await Value.create({ key: 'SALT', value: await genSalt() })
  await salt.save()
  saltCache = salt.value
  return saltCache
}

export const getPasswordHash = async () => {
  const result = await Value.findOne({ where: { key: 'PASSWORD_HASH' } })
  return result?.value || ''
}

export const setPasswordHash = async (passwordHash: string) => {
  if (await getPasswordHash()) {
    const result = await Value.findOne({ where: { key: 'PASSWORD_HASH' } })
    if (!result) return // make TS shut up
    result.value = passwordHash
    await result.save()
  } else {
    const hash = await Value.create({
      key: 'PASSWORD_HASH',
      value: passwordHash,
    })
    await hash.save()
  }
}

export const validatePasswordHash = async (passwordHash: string) => safeCompare(passwordHash, await getPasswordHash())

export const hashPassword = async (password: string) => hash(password, await getSalt())
