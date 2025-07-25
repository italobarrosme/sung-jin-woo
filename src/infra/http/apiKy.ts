import ky, { Options } from 'ky'

const api = ky.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const get = async <T>(url: string, options?: Options): Promise<T> => {
  try {
    const response = await api.get(url, options)
    if (!response.ok) {
      throw new Error(`Erro na requisição GET para ${url}: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Erro na requisição GET:', error)
    throw error
  }
}

export const post = async <T>(
  url: string,
  data: Record<string, unknown>,
  options?: Options,
): Promise<T> => {
  try {
    const response = await api.post(url, { json: data, ...options })
    if (!response.ok) {
      throw new Error(`Erro na requisição POST para ${url}: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Erro na requisição POST:', error)
    throw error
  }
}

export const put = async <T>(
  url: string,
  data: Record<string, unknown>,
  options?: Options,
): Promise<T> => {
  try {
    const response = await api.put(url, { json: data, ...options })
    if (!response.ok) {
      throw new Error(`Erro na requisição PUT para ${url}: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Erro na requisição PUT:', error)
    throw error
  }
}

export const del = async <T>(url: string, options?: Options): Promise<T> => {
  try {
    const response = await api.delete(url, options)
    if (!response.ok) {
      throw new Error(
        `Erro na requisição DELETE para ${url}: ${response.status}`,
      )
    }
    return await response.json()
  } catch (error) {
    console.error('Erro na requisição DELETE:', error)
    throw error
  }
}
