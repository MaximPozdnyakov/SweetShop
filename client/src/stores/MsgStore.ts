import { makeAutoObservable } from "mobx";

interface IMsgStore {
    msg: string;
}

class MsgStore implements IMsgStore {
    constructor() {
        makeAutoObservable(this);
    }
    msg = "";
    setMsg = (msg: string) => {
        this.msg = msg;
    };
}

export default MsgStore;
