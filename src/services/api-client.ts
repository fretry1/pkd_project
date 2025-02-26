import type { AppError, Result } from "$lib/type"

const BASE_URL = "http://localhost:8080"

export const apiCommunicator = {
	async request<T>(/* arguments */): Result {},

	async get<T>(uri: string): Promise<Result<T, AppError>> {},

	async post<T>(/* arguments */): Promise<T> {},

	async put<T>(uri: string): Promise<Result<T, AppError>> {},

	async delete(/* arguments */): Promise<boolean> {}
}
