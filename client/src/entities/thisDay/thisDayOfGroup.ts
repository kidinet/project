import * as appGlobalsStyle from '../../store/app-global-style';
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
        // this.group_id = appGlobalsStyle.currentGroup.groupId;
    }

    public setIcon() {
        let index = Math.floor((Math.random() * appGlobalsStyle.icons.length));
        return `fa fa-${appGlobalsStyle.icons[index]}`;
    }

    public setColor() {
        let index = Math.floor((Math.random() * appGlobalsStyle.colors.length));
        return appGlobalsStyle.colors[index];
    }
}