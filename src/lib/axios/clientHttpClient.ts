// import axios from 'axios';

// /* Client-side HTTP client for use in "use client" components */
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// if (!API_BASE_URL) {
//   throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
// }

// const getAuthHeaders = () => {
//   const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
// //   const accessToken = typeof window !== 'undefined' ? Cookies.get('accessToken') : null;
  
//   console.log('[clientHttpClient] Using accessToken:', !!accessToken);
  
//   return {
//     'Content-Type': 'application/json',
//     ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
//   };
// };

// export interface ApiRequestOptions {
//   params?: Record<string, unknown>;
//   headers?: Record<string, string>;
// }

// const httpGet = async <TData>(endpoint: string, options?: ApiRequestOptions): Promise<TData> => {
//   try {
//     console.log(`[clientHttpClient] GET ${endpoint}`);
//     const response = await axios.get<TData>(`${API_BASE_URL}${endpoint}`, {
//       params: options?.params,
//       headers: {
//         ...getAuthHeaders(),
//         ...options?.headers,
//       },
//     });
//     console.log(`[clientHttpClient] GET ${endpoint} SUCCESS`);
//     return response.data;
//   } catch (error) {
//     console.error(`[clientHttpClient] GET ${endpoint} failed:`, error);
//     throw error;
//   }
// };

// const httpPost = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions): Promise<TData> => {
//   try {
//     console.log(`[clientHttpClient] POST ${endpoint}`, data);
//     const response = await axios.post<TData>(`${API_BASE_URL}${endpoint}`, data, {
//       params: options?.params,
//       headers: {
//         ...getAuthHeaders(),
//         ...options?.headers,
//       },
//     });
//     console.log(`[clientHttpClient] POST ${endpoint} SUCCESS`);
//     return response.data;
//   } catch (error) {
//     console.error(`[clientHttpClient] POST ${endpoint} failed:`, error);
//     throw error;
//   }
// };

// const httpPut = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions): Promise<TData> => {
//   try {
//     console.log(`[clientHttpClient] PUT ${endpoint}`, data);
//     const response = await axios.put<TData>(`${API_BASE_URL}${endpoint}`, data, {
//       params: options?.params,
//       headers: {
//         ...getAuthHeaders(),
//         ...options?.headers,
//       },
//     });
//     console.log(`[clientHttpClient] PUT ${endpoint} SUCCESS`);
//     return response.data;
//   } catch (error) {
//     console.error(`[clientHttpClient] PUT ${endpoint} failed:`, error);
//     throw error;
//   }
// };

// const httpPatch = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions): Promise<TData> => {
//   try {
//     console.log(`[clientHttpClient] PATCH ${endpoint}`);
//     const response = await axios.patch<TData>(`${API_BASE_URL}${endpoint}`, data, {
//       params: options?.params,
//       headers: {
//         ...getAuthHeaders(),
//         ...options?.headers,
//       },
//     });
//     console.log(`[clientHttpClient] PATCH ${endpoint} SUCCESS`);
//     return response.data;
//   } catch (error) {
//     console.error(`[clientHttpClient] PATCH ${endpoint} failed:`, error);
//     throw error;
//   }
// };

// const httpDelete = async <TData>(endpoint: string, options?: ApiRequestOptions): Promise<TData> => {
//   try {
//     console.log(`[clientHttpClient] DELETE ${endpoint}`);
//     const response = await axios.delete<TData>(`${API_BASE_URL}${endpoint}`, {
//       params: options?.params,
//       headers: {
//         ...getAuthHeaders(),
//         ...options?.headers,
//       },
//     });
//     console.log(`[clientHttpClient] DELETE ${endpoint} SUCCESS`);
//     return response.data;
//   } catch (error) {
//     console.error(`[clientHttpClient] DELETE ${endpoint} failed:`, error);
//     throw error;
//   }
// };

// export const clientHttpClient = {
//   get: httpGet,
//   post: httpPost,
//   put: httpPut,
//   patch: httpPatch,
//   delete: httpDelete,
// };

