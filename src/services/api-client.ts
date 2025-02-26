import type { AppError, Result } from "$lib/type"

const BASE_URL = "http://localhost:8080"
const example = "http://localhost:8080/${uri}"

// possible arguments:
// URL
// URL - uri
// Body

export const apiCommunicator = {
	async request<T>(uri: string, method: string, body: any): Promise<Result<T, AppError>> {
		let res = await fetch(`${BASE_URL}${uri}`, {
			method: "GET",
			headers: {
				accept: "application/json"
			},
			body: JSON.stringify({})
		})
		let resJson = await res.json()
		if (!res.ok) {
			let err: AppError = JSON.parse(resJson)
			let output = [null, err]
			return output
		}
		return [resJson, null]
	},

	async get<T>(uri: string): Promise<T> {
		let res = await fetch(`${BASE_URL}${uri}`, {
			method: "GET",
			headers: {
				accept: "application/json"
			},
			body: JSON.stringify({})
		})

		const obj = await res.json()
		if (!res.ok) {
			const errors = `failed: res ${res.status}`
			return Promise.reject(errors)
		}

		return JSON.stringify(obj, null, 2)
	},

	async post<T>(uri: string): Promise<string> {
		let res = await fetch(`${BASE_URL}/${uri}`, {
			method: "POST",
			headers: {
				accept: "application/json"
			},
			body: JSON.stringify({})
		})

		const obj = await res.json()
		if (!res.ok) {
			const errors = `failed: res ${res.status}`
			return Promise.reject(errors)
		}

		return JSON.stringify(obj, null, 2)
	},

	async put<T>(uri: string): Promise<T> {
		let res = await fetch(`${BASE_URL}/${uri}`, {
			method: "PUT",
			headers: {
				accept: "application/json"
			},
			body: JSON.stringify({})
		})

		const obj = await res.json()
		if (!res.ok) {
			const errors = `failed: res ${res.status}`
			return Promise.reject(errors)
		}

		return JSON.stringify(obj, null, 2)
	},

	async delete(uri: string, deleteInput: string): Promise<boolean> {
		let res = await fetch(`${BASE_URL}${deleteInput}`, {
			method: "DELETE",
			headers: {
				accept: "application/json"
			},
			body: JSON.stringify({})
		})

		const obj = await res.json()
		if (!res.ok) {
			const errors = `failed: res ${res.status}`
			return Promise.reject(errors)
		}

		return JSON.stringify(obj, null, 2)
	}
}
