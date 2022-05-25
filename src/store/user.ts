import { defineStore } from 'pinia'
import {login} from "@/api/login";

export const useUserStore = defineStore({
    id: 'user',
    state: () => {
        return {
            token: '',
            routers: []
        }
    },
    actions: {
        updateToken(token: string) {
            this.token = token
        },
        async login (params: object) {
            return login(params);
        }
    }
})
