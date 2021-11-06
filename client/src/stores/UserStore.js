import { action, observable, when, makeObservable, computed } from "mobx";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

class UserStore {
    constructor(props) {
        makeObservable(this);
        this.MsgStore = props.MsgStore;
        when(
            () => !this.isUserLoaded,
            () => this.fetchUser()
        );
    }

    @observable user = {};
    @observable isUserLoaded = false;
    @observable isAuthenticated = false;

    async fetchUser() {
        try {
            if (localStorage.getItem("token")) {
                const user = await axios.get("/api/users", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
                if (!user.data.msg) {
                    this.setUser(user.data.user);
                    return;
                }
                localStorage.removeItem("token");
            }
            const user = await axios.get("/api/google-auth/login");
            if (!user.data.msg) {
                this.setUser(user.data.user);
                return;
            }
            if (!localStorage.getItem("guest")) {
                localStorage.setItem("guest", uuidv4());
            }
            this.setUserLoaded();
        } catch (e) {}
    }

    login = async (credentials) => {
        try {
            this.setUserNotLoaded();
            const user = await axios.post("/api/users/login", credentials);
            if (!user.data.msg) {
                localStorage.setItem("token", user.data.token);
                this.setUser(user.data.user);
                return user;
            }
            this.MsgStore.setMsg(user.data.msg);
            this.setUserLoaded();
            return user.data;
        } catch (e) {}
    };

    register = async (credentials) => {
        try {
            this.setUserNotLoaded();
            const newUser = await axios.post("/api/users", credentials);
            if (!newUser.data.msg) {
                localStorage.setItem("token", newUser.data.token);
                this.setUser(newUser.data.user);
                return newUser;
            }
            this.MsgStore.setMsg(newUser.data.msg);
            this.setUserLoaded();
            return newUser.data;
        } catch (e) {}
    };

    logout = async () => {
        try {
            this.setUserNotLoaded();
            await axios.post(
                "/api/users/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            localStorage.removeItem("token");
            this.setUserLogout();
            this.setUserLoaded();
        } catch (e) {}
    };

    googleLogout = async () => {
        try {
            this.setUserNotLoaded();
            await axios.get("/api/google-auth/logout");
            this.setUserLogout();
            this.setUserLoaded();
        } catch (e) {}
    };

    @action setUser(user) {
        this.user = user;
        this.isAuthenticated = true;
        this.isUserLoaded = true;
    }

    @action setUserNotLoaded() {
        this.isUserLoaded = false;
    }

    @action setUserLoaded() {
        this.isUserLoaded = true;
    }

    @action setUserLogout() {
        this.isAuthenticated = false;
        this.user = {};
    }

    @computed get userId() {
        if (Object.keys(this.user).length) {
            return this.user._id;
        }
        return localStorage.getItem("guest");
    }
}

export default UserStore;
