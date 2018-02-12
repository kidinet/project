import * as appGlobalsService from '../../store/app-globals';
export class ThisDayOfGroup {
    constructor(public id?: number,
                public group_id?: number,
                public title?: string,
                public icon?: string,
                public color?: string,
                public isStyleOpen?: boolean) {
        this.color = color ? color : this.setColor();
        this.icon = icon ? icon : this.setIcon();
        this.isStyleOpen = false;
        this.group_id = appGlobalsService.currentGroup.groupId;
    }

    public setIcon() {
        let index = Math.floor((Math.random() * appGlobalsService.icons.length));
        return `fa fa-${appGlobalsService.icons[index]}`;
    }

    public setColor() {
        let index = Math.floor((Math.random() * appGlobalsService.colors.length));
        return appGlobalsService.colors[index];
    }
}