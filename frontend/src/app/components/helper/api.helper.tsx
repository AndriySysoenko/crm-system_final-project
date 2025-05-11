export const fetchWithAuth = async (
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> => {
  if (typeof window === 'undefined') {
    throw new Error('fetchWithAuth should only be used on the client');
  }

  const token = localStorage.getItem('accessToken');

  const headers = {
    ...init.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return fetch(input, {
    ...init,
    headers,
  });
};