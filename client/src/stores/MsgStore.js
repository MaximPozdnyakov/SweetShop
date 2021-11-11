import { makeAutoObservable } from "mobx";

class MsgStore {
    constructor() {
        makeAutoObservable(this);
    }
    msg = "";
    setMsg = (msg) => (this.msg = msg);
}

export default MsgStore;
