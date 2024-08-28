import axios from 'axios'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
})

export const fetcher = (url: string) => axiosInstance.get(url).then((response) => response.data)
