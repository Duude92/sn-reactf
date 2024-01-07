export default function UserManager(settings) {
    this.settings = settings;
    this.getUser = getUser.bind(this);
    this.storeUser = storeUser.bind(this);
    this.events = {
        addUserSignedOut() {

        }
    };

    async function getUser() {
        const user = this.settings.userStore.getItem('user');
        //TODO: for realization
        return JSON.parse(user);
    }
    function storeUser(user) {
        console.log(user);
        if (user) {
            const userString = JSON.stringify(user);
            this.settings.userStore.setItem('user', userString);
        }
        else {
            this.settings.userStore.removeItem('user');
        }
    }
}