/**
 * Created by compie on 01/02/18.
 */
export class UserInGroup {
    constructor(public isAdministrator?: boolean,
        public childFirstName?: string,
        public childLastName?: string,
        public nickname?: string,
        public groupId?: number
    ) {
    }
}