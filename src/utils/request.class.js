class Request {
    constructor() {
        this.url = process.env.API_URL;
    }

    getAll(model) {
        return fetch(`${this.url}${model}`, {
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
    }

    getOne(model, id) {
        return fetch(`${this.url}${model}/${id}`, {
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
    }

    post(model, body) {
        return fetch(`${this.url}${model}`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body),
        });
    }

    put(model, id, body) {
        return fetch(`${this.url}${model}/${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body),
        });
    }

    delete(model, id) {
        return fetch(`${this.url}${model}/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
    }
}

module.exports = new Request();
