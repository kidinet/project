export class User {
    constructor(public firstName?: string,
                public lastName?: string,
                public city?: string,
                public street?: string,
                public build?: number,
                public phone?: string,
                public mail?: string,
                public profile?: string,
                public password?: string,
                public latitude?: number,
                public longitude?: number) {
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