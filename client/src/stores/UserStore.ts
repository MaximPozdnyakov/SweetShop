import { when, makeAutoObservable } from "mobx";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import MsgStore from "./MsgStore";

export type LoginCredentials = { email: string; password: string };
type RegisterCredentials = {
    email: string;
    password1: string;
    password2: string;
};
type AccessResponse = {
    data: { msg?: string; token?: string; user?: IUser };
};

interface IUser {
    __v: number;
    _id: string;
    email: string;
    password: string;
    created_at: string;
    googleId?: string;
}

interface IUserStore {
    user: IUser;
    isUserLoaded: boolean;
    isAuthenticated: boolean;
    MsgStore: MsgStore;
}

class UserStore implements IUserStore {
    MsgStore;
    user = {} as IUser;
    isUserLoaded = false;
    isAuthenticated = false;

    constructor(props: { MsgStore: MsgStore }) {
        makeAutoObservable(this);
        this.MsgStore = props.MsgStore;
        when(
            () => !this.isUserLoaded,
            () => this.fetchUser()
        );
    }

    async fetchUser() {
        type UserResponse = { data: { msg?: string; user?: IUser } };
        try {
            if (localStorage.getItem("token")) {
                const {
                    data: { msg, user },
                }: UserResponse = await axios.get("/api/users", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
                if (!msg && user) {
                    this.setUser(user);
                    return;
                }
                localStorage.removeItem("token");
            }
            const {
                data: { msg, user },
            }: UserResponse = await axios.get("/api/google-auth/login");
            if (!msg && user) {
                this.setUser(user);
                return;
            }
            if (!localStorage.getItem("guest")) {
                localStorage.setItem("guest", uuidv4());
            }
            this.setUserLoaded();
        } catch (e) {}
    }

    login = async (credentials: LoginCredentials) => {
        try {
            this.setUserNotLoaded();
            const {
                data: { msg, token, user },
            }: AccessResponse = await axios.post(
                "/api/users/login",
                credentials
            );
            if (!msg && token && user) {
                localStorage.setItem("token", token);
                this.setUser(user);
                return msg;
            }
            if (msg) this.MsgStore.setMsg(msg);
            this.setUserLoaded();
            return msg;
        } catch (e) {}
    };

    register = async (credentials: RegisterCredentials) => {
        try {
            this.setUserNotLoaded();
            const {
                data: { msg, token, user },
            }: AccessResponse = await axios.post("/api/users", credentials);
            if (!msg && token && user) {
                localStorage.setItem("token", token);
                this.setUser(user);
                return msg;
            }
            if (msg) this.MsgStore.setMsg(msg);
            this.setUserLoaded();
            return msg;
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

    setUser(user: IUser) {
        this.user = user;
        this.isAuthenticated = true;
        this.isUserLoaded = true;
    }

    setUserNotLoaded() {
        this.isUserLoaded = false;
    }

    setUserLoaded() {
        this.isUserLoaded = true;
    }

    setUserLogout() {
        this.isAuthenticated = false;
        this.user = {} as IUser;
    }

    get userId(): string {
        if (this.user._id) return this.user._id;
        return String(localStorage.getItem("guest"));
    }
}

export default UserStore;
