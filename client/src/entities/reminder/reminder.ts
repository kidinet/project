export class Reminder {
    constructor(public userMail: string,
                public GroupId: number,
                public text: string,
                public date: string,
                public idRead: boolean) {
    }
}
