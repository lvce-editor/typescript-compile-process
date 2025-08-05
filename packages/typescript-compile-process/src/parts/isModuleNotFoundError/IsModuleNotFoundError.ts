export const isModuleNotFoundError = (error: any) => {
  return error && error.code === 'ERR_MODULE_NOT_FOUND'
}
