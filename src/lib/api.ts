import api from './axios'
//get
export async function getData<T>(url: string, params?: object): Promise<T> {
  try {
    const response = await api.get<T>(url, { params })
    return response.data
  } catch (error) {
    throw error
  }
}

//Post 요청
export async function postData<T>(url: string, data?: object): Promise<T> {
  try {
    const response = await api.post<T>(url, data)
    return response.data
  } catch (error) {
    throw error
  }
}

//put
export async function putData<T>(url: string, data?: object): Promise<T> {
  try {
    const response = await api.put<T>(url, data)
    return response.data
  } catch (error) {
    throw error
  }
}

// DELETE 요청 (데이터 삭제)
export async function deleteData<T>(url: string): Promise<T> {
  try {
    const response = await api.delete<T>(url)
    return response.data
  } catch (error) {
    throw error
  }
}
