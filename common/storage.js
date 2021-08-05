// Use browser sessionStorage or a simulation on node

let _storage = {};

let api;

if (typeof window === 'undefined' || window === null) {
  api = {
    setItem: (key, value) => _storage[key] = value,
    getItem: (key) => _storage[key],
    removeItem: (key) => delete _storage[key],
    clear: () => _storage = {}
  }
} else {
  api = window.sessionStorage
}

export default api;
