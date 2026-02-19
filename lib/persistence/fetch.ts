const TIMEOUT = 10000 // 10 seconds

export const createTimeoutFetch = () => {
  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), TIMEOUT)

    try {
      const response = await fetch(input, {
        ...init,
        signal: controller.signal
      })
      return response
    } finally {
      clearTimeout(timeout)
    }
  }
}