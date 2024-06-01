export const importScript = async <T = any>(url: string): Promise<T> => {
  return await import(url)
}
