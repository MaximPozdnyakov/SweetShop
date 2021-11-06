import { action, observable } from "mobx";

class MsgStore {
    @observable msg = "";

    @action setMsg = (msg) => {
        this.msg = msg;
    };
}

export default MsgStore;
