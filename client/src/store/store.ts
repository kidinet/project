import { group } from '../entities/group'
import { User } from '../entities/user'
//variables
export let currentUser;
export let currentGroup;

//setters
export function setGroup(group: group) {
    currentGroup = group;
}
export function setUser(user: User) {
    currentUser = user;
}
//getters
export function getUser() {
    return currentUser
}
export function getGroup() {
    return currentGroup
}
