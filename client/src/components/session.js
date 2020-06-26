import axios from 'axios'

class Session {
    constructor() {
        this.authenticated = axios.get('/check-session')
        console.log('this.authenticated',this.authenticated)
    }

    login(cb) {
        this.authenticated = true;
        cb();
    }
    logout(cb) {
        this.authenticated = false;
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Session();