//variables
export let User;
export let createGroup=false;
//setters
export function setValue(newValue:any) {
    User = newValue;
}
//getters
export function getUser() {
    return User
}

export function CreateGroup(request:any) {
    createGroup = request;
}
export function getCreateGroup() {
    return createGroup;
}