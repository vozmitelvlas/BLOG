const API_BASE_URL = 'http://localhost:3000/api'

const apiClient = async (endpoint, method = 'GET', body = null, customHeaders = {}) => {
    const defaultOptions = {
        method: method.toUpperCase(),
        credentials: 'include',
        headers: {},
    };
    if (body !== null) {
        defaultOptions.headers['Content-Type'] = 'application/json'
        defaultOptions.body = JSON.stringify(body)
    }

    defaultOptions.headers = {...defaultOptions.headers, ...customHeaders}

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, defaultOptions)

        if (response.status === 401) {
            window.location.href = '/login'
        }

        if (!response.ok) {
            throw await response.json().catch(() => ({}))
        }

        // if (response.status === 204) {
        //     return null
        // }

        return await response.json()
    } catch (error) {
        console.error('Произошла ошибка при выполнении запроса:', error.message)
        throw error
    }
};

export default apiClient