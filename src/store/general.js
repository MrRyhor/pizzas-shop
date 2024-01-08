import { defineStore } from 'pinia'

// store для отлова состояний loading и error для всего проекта
export const useGeneralStore = defineStore('general', {
    state: () => {
        return {
            loading: null,
            error: null,
        }
    },

    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,
    },

    actions: {
        setLoading(val) {
            this.loading = val
        },
        setError(val) {
            this.error = val
        },
        startLoading() {
            this.setLoading(true)
            this.setError(null)
        },

        // в метод передаём колбэк-ф-ции: operation - какую нужно сделать операцию (загрузка данных из БД),
        //successCallback - что - то сделать дополнительное с данными из БД, если ОК,
        // errorCallBack - что-то доп. сделать если словили ошибку
        async generalApiOperation({ operation, successCallback, errorCallBack }) {
            this.startLoading()

            try {
                const res = await operation()
                if (successCallback) successCallback(res)
                return res
            } catch (error) {
                this.setError(error)
                if (errorCallBack) errorCallBack(error)
            } finally {
                this.setLoading(false)
            }
        },
    },
})
