import axios from 'axios'
import { TrendingMoviesResponse } from '../types/types'

const tmdb = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

tmdb.interceptors.request.use(
  async (config) => {
    if (!config.params) {
      config.params = {}
    }

    config.params['api_key'] = process.env.EXPO_PUBLIC_API_KEY

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export const getTrendigMovies = async () => {
  try {
    const { data, status } = await tmdb.get<TrendingMoviesResponse>(
      `${process.env.EXPO_PUBLIC_TRENDING_URL!}`,
      { params: { language: 'en-US' } }
    )

    if (status !== 200) {
      throw new Error('Some issues with getting movies')
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
