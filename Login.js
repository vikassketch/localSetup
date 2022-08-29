class User {
    constructor(email, password) {
        this.email = email

        this.password = password
    }
}

class DM {
    static clearFields() {
        document.querySelector('#email').value = ''
        document.querySelector('#password').value = ''
    }
    static showAlert(message, className) {
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        console.log(div)
        const container = document.querySelector('#center')
        console.log(container)
        const form = document.querySelector('#signUp')
        container.insertBefore(div, form)

        setTimeout(() => document.querySelector('.alert').remove(), 3000)

    }
}

class Storage {
    static getUser() {
        let users
        if (sessionStorage.getItem('Users') === null) {
            users = []
        } else {
            users = JSON.parse(sessionStorage.getItem('Users'))
        }
        return users

    }
    static checkUser(user) {
        let users = Storage.getUser()
        let bool = false
        for (let i = 0; i < users.length; i++) {
            if (user.email === users[i].email) {
                if (user.password === users[i].password)
                    bool = true
                break
            }
        }
        if (bool === true) {
            window.open(
                "Welcome.html", "_blank");
        } else {
            DM.showAlert('Enter Correct Details', 'danger')

            DM.clearFields()
        }

    }
}

document.querySelector('#signUp').addEventListener('submit', (e) => {
    e.preventDefault()


    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    if (email === '' || password === '') {
        DM.showAlert('Enter All Fields', 'danger')
    } else {

        const user = new User(email, password)
        Storage.checkUser(user)



    }
})