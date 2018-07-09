export class AboutTitle {
    constructor(public title?: string,
        public content?: string,
        public icon?: string,
        public color?: string,
        public id?: number,
        public isEditable?: boolean) {
        this.isEditable = false
    }
}
