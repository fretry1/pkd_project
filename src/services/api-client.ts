import type { AppError, PResult, Result } from "$lib/type"

const BASE_URL = "http://localhost:8080"
const example = "http://localhost:8080${uri}"

/**
 * @param uri -
 * @param method - A valid HTTP verb
 * @param body -
 * @return - Promise<[T, null] | [null, E]>
 */

export const apiCommunicator = {
	async request<T>(uri: string, method: string, body?: any): PResult<T, AppError> {
		const payload = body ? JSON.stringify(body) : null
		let res = await fetch(`${BASE_URL}${uri}`, {
			method: method,
			headers: {
				accept: "application/json"
			},
			body: payload
		})

		console.log(res.status)
		let resObj = await res.json()
		if (!res.ok) {
			let err: AppError = JSON.parse(resObj)
			// let err: AppError = { code: "", message: "" }
			console.log(err)
			return [null, err]
		}

		return [resObj, null]
	},

	async get<T>(uri: string): PResult<T, AppError> {
		return this.request(uri, "GET")
	},

	async post<T>(uri: string): PResult<T, AppError> {
		return this.request(uri, "POST")
	},

	async put<T>(uri: string, body?: any): PResult<T, AppError> {
		return this.request(uri, "PUT", body)
	},

	async delete(uri: string): PResult<null, AppError> {
		return this.request(uri, "DELETE")
	},

	async delUgly(uri: string): Promise<void | number> {
		let res = await fetch(`${BASE_URL}${uri}`, {
			method: "DELETE",
			headers: {
				accept: "application/json"
			}
		})
		if (!res.ok) {
			console.log(res.status)
			return res.status
		}
	}
}
