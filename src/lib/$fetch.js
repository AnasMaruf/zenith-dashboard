async function request(url, params, method = "GET") {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = localStorage.getItem("access_token");
  if (token) {
    Object.assign(options.headers, { Authorization: `Bearer ${token}` });
  }

  if (params) {
    if (["GET", "DELETE"].includes(method)) {
      url += `?${objectToQueryString(params)}`;
    } else {
      Object.assign(options, {
        body: JSON.stringify(params),
      });
    }
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const response = await fetch(
    url.startsWith("http") ? url : `${baseUrl}${url}`,
    options
  );

  const result = await response.json();
  if (!response.ok) {
    throw result;
  }

  return result;
}

// request('https://google.com', {skip: 10, limit: 10})
// https://google.com?skip=10&limit=10
function objectToQueryString(obj) {
  const params = new URLSearchParams(obj);

  return params.toString(); // skip=10&limit=10
}

function get(url, params) {
  return request(url, params);
}

function create(url, params) {
  return request(url, params, "POST");
}

function update(url, params) {
  return request(url, params, "PUT");
}

function remove(url, params) {
  return request(url, params, "DELETE");
}
const $fetch = {
  get,
  create,
  update,
  remove,
};
export default $fetch;
