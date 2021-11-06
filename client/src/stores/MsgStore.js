import { action, observable, makeObservable } from "mobx";

class MsgStore {
    constructor() {
        makeObservable(this);
    }

    @observable msg = "";

    @action setMsg = (msg) => {
        this.msg = msg;
    };
}

export default MsgStore;
