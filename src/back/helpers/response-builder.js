export default class {
    static get messages() {
        return {
            INTERNAL_SERVER_ERROR: 'Внутренняя ошибка сервера',

            USER_DOES_NOT_EXIST: 'Пользователя не существует',
            INVALID_CREDENTIALS: 'Неверная почта или пароль',
            SIGNIN_SUCCESSFUL: 'Вы успешно вошли',
            SIGNUP_SUCCESSFUL: 'Вы успешно зарегистрировались',

            NOT_FOUND: 'Не найдено',
            EDITING_SUCCESSFUL: 'Редактирование прошло успешно',
            CREATING_SUCCESSFUL: 'Создание прошло успешно',
            DELETING_SUCCESSFUL: 'Удаление прошло успешно'
        }
    }

    static success(data, msg) {
        return {
            success: true,
            data,
            msg
        }
    }

    static failure(msg = this.messages.INTERNAL_SERVER_ERROR) {
        return {
            success: false,
            msg
        }
    }
}