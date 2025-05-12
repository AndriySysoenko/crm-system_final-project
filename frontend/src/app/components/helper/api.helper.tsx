
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

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  return response;
};