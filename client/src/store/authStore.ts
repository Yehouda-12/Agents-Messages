import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../api/axiosConfig';

export interface User {
    _id: string;
    agentCode: string;
    fullName: string;
    role: 'admin' | 'agent';
}

export interface Report {
    _id: string;
    message: string;
    userId: any;
    createdAt: string;

    category?: string;
    urgency?: string;
    sourceType?: string
    imagePath?:string
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    users: User[];
    reports: Report[];
    loading: boolean;
    setAuth: (user: User, token: string) => void;
    logout: () => void;

    fetchAllUsers: () => Promise<void>;
    fetchReports: (filters?: Record<string, any>) => Promise<void>;


    fetchReportById: (id: string) => Promise<Report>;

}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            users: [],
            reports: [],
            loading: false,

            setAuth: (user, token) => {
                set({
                    user,
                    token,
                    isAuthenticated: true,
                });
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    users: [],
                    reports: [],
                });
                localStorage.removeItem('auth-storage');
            },



            fetchAllUsers: async () => {
                set({ loading: true });
                try {
                    const response = await api.get('/admin/users');
                    set({ users: response.data, loading: false });
                } catch (error) {
                    set({ loading: false });
                    throw error;
                }
            },

            fetchReports: async (filters = {}) => {
                set({ loading: true });
                try {
                    const response = await api.get('/reports', { params: filters });
                    set({ reports: response.data, loading: false });
                } catch (error) {
                    set({ loading: false });
                    throw error;
                }
            },

            fetchReportById: async (id) => {
                set({ loading: true });
                try {
                    const response = await api.get(`/reports/${id}`);
                    set({ loading: false });
                    return response.data;
                } catch (error) {
                    set({ loading: false });
                    throw error;
                }
            },


        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);