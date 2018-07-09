import {UserInGroup} from "./UserInGroup";
export class User {
    constructor(public firstName?: string,
        public lastName?: string,
        public city?: string,
        public streat?: string,
        public build?: number,
        public phone?: string,
        public mail?: string,
        public profile_?: string,
        public password_?: string,
        public latitute?: number,
        public longitude?: number,
        public UserInGroups?: UserInGroup[]) {
        this.UserInGroups = [];
    }
}

// [DataMember]
// public string userMail { get; set; }
// [DataMember]
// public int groupId { get; set; }
// [DataMember]
// public bool isAdministrator { get; set; }
// [DataMember]
// public string childFirstName { get; set; }
// [DataMember]
// public string childLastName { get; set; }
// [DataMember]
// public string nickname { get; set; }
// [DataMember]