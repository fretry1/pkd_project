const BASE_URL = "http://localhost:8080"

export const apiCommunicator = {
	async request<T>(/* arguments */): Promise<T> {},

	async get<T>(/* arguments */): Promise<T> {},

	async post<T>(/* arguments */): Promise<T> {},

	async put<T>(/* arguments */): Promise<T> {},

	async delete(/* arguments */): Promise<boolean> {}
}
