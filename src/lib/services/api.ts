import type { AppError, PResult, Result } from "$lib/type"

const BASE_URL = "http://localhost:8080"
const example = "http://localhost:8080${uri}"

/**
 * Makes an HTTP request to the specified URI with the given method and body.
 * @param uri - The URI to send the request to.
 * @param method - A valid HTTP verb (e.g., GET, POST, PUT, DELETE).
 * @param body - The request body to send (optional).
 * @returns A Promise resolving to a PResult containing the response data or an AppError.
 */
export const api = {
	async request(uri: string, method: string, body?: any): PResult<any, AppError> {
		try {
			const payload = body ? JSON.stringify(body) : null
			let res = await fetch(`${BASE_URL}${uri}`, {
				method: method,
				headers: {
					accept: "application/json",
					"content-type": "application/json"
				},
				body: payload
			})
			if (method === "DELETE" && res.ok) {
				return [null, null]
			}
			console.log(res.status)
			let resObj = await res.json()
			if (!res.ok) {
				console.log(resObj)
				return [null, resObj]
			}

			return [resObj, null]
		} catch (err: any) {
			console.error("fatal error caught when interacting with the API: ", err)
			return [
				null,
				{
					code: "ApiError",
					message: err.toString()
				}
			]
		}
	},

	/**
	 * Makes a GET request to the specified URI.
	 * @param uri - The URI to send the request to.
	 * @returns A Promise resolving to a PResult containing the response data or an AppError.
	 */
	async get<T>(uri: string): PResult<T, AppError> {
		return this.request(uri, "GET")
	},

	/**
	 * Makes a POST request to the specified URI with the given body.
	 * @param uri - The URI to send the request to.
	 * @param body - The request body to send.
	 * @returns A Promise resolving to a PResult containing the response data or an AppError.
	 */
	async post<T>(uri: string, body?: any): PResult<T, AppError> {
		return this.request(uri, "POST", body)
	},

	/**
	 * Makes a PUT request to the specified URI with the given body.
	 * @param uri - The URI to send the request to.
	 * @param body - The request body to send.
	 * @returns A Promise resolving to a PResult containing the response data or an AppError.
	 */
	async put<T>(uri: string, body?: any): PResult<T, AppError> {
		return this.request(uri, "PUT", body)
	},

	/**
	 * Makes a DELETE request to the specified URI.
	 * A successful response has no body.
	 * @param uri - The URI to send the request to.
	 * @returns A Promise resolving to a PResult containing null or an AppError.
	 */
	async delete(uri: string): PResult<null, AppError> {
		return this.request(uri, "DELETE")
	},

	/**
	 * A standalone DELETE request to the specified URI.
	 * @param uri - The URI to send the request to.
	 * @returns A Promise resolving to a PResult containing null or an number.
	 */
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
