import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'

const storage = createStorage({
  driver: fsDriver({
    base: './tmp',
  }),
})

export { storage }

