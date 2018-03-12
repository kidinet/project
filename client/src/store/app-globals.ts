import {Group} from '../entities/group';
import {User} from '../entities/user/user';
import {UserInGroup} from '../entities/user/UserInGroup';
import {AboutTitle} from '../entities/about/aboutTitles';
import {ImageGallery} from '../entities/gallery/imageGallery';
import {ImageGalleryResponse} from '../entities/gallery/imageGalleryResponse';
import {ThisDayOfGroup} from '../entities/thisDay/thisDayOfGroup';
import {ThisDayContent} from '../entities/thisDay/thisDayContent';


// ========================const urls=================================
export let baseAppUrl = 'http://localhost:4200/';
export let baseAPIUrl = 'http://localhost:7022/api/';
// ===================================================================
export let enableNavigation = false;
// =======================group and users=============================

// variables:
export let currentGroup = new Group();
export let currentUser = new User();
export let currentUserInGroup = new UserInGroup();
export let usersInCurrentGroup = [];
export let usersInCurrentGroupDetails = [];
export let isAdministrator = false;
// setters:
export function setGroup(groupParam) {
    currentGroup = groupParam;
}
export function setCurreUser(user) {
    currentUser = user;
}
export function setCurrentUserInGroup(userInGroup) {
    currentUserInGroup = userInGroup;
    this.setIsAdministrator(currentUserInGroup.isAdministrator);
}
export function setUsersInCurrentGroup(UsersInCurrentGroupParam: User[]) {
    usersInCurrentGroup = UsersInCurrentGroupParam;
}
export function setIsAdministrator(paramIsAdministrator: boolean) {
    isAdministrator = paramIsAdministrator
}
export function setUsersInCurrentGroupDetails(params: User[]) {
    usersInCurrentGroupDetails = params
}
// ============================== about =================================

// variables
export let aboutTitles: AboutTitle[] = [];

// setters
export function addAboutTitles(aboutTitlesParam) {
    aboutTitles.push(aboutTitlesParam);
}
export function setAboutTitles(aboutTitlesArray) {
    aboutTitles = aboutTitlesArray;
}

export function deleteAboutTitle(title) {
    console.log(title,aboutTitles.indexOf(title))
    aboutTitles.splice(aboutTitles.indexOf(title), 1);
    console.log(aboutTitles);
}

// =============================image gallery==============================
// variables:
export let imageGallery: ImageGallery[] = [];
export let imageGalleryResponse: ImageGalleryResponse[] = [];

// // setters:

export function addImagesForGallery(ImageGallryArray) {
    imageGallery.push.apply(imageGallery, ImageGallryArray);
}

export function addImage(image) {
    console.log(image,'image')
    imageGallery.push(image);
}

export function deleteImageFromGallery(id) {
    const item = imageGallery.find(item => {
        return item.id === id;
    })
    imageGallery.splice(imageGallery.indexOf(item), 1);
}

// =============================this day ===================================

export let thisDayOfGroupArray = [
    new ThisDayOfGroup(1, 123, 'מה למדנו'),
    new ThisDayOfGroup(2, 123, 'מושגים ונושאים'),
    new ThisDayOfGroup(3, 123, 'משחק/יצירה'),
    new ThisDayOfGroup(4, 123, 'מה עשינו היום בחוג'),
    new ThisDayOfGroup(5, 123, 'ספר שקראנו')
];

export let thisDayContentArray = [
    new ThisDayContent(new Date(), 1, 'ארוחת בוקר'),
    new ThisDayContent(new Date(), 2, 'מושגים חדשים')
]

// setters
export function initThisDayOfGroupArray(thisDayOfGroupArrayParams) {
    this.thisDayOfGroupArray = thisDayOfGroupArrayParams;
}
export function addThisDayContent(thisDayParam: ThisDayContent) {
    thisDayContentArray.push(thisDayParam);
}
export function addThisDayOfGroup(addThisDayOfGroupParam: ThisDayOfGroup) {
    thisDayOfGroupArray.push(addThisDayOfGroupParam);
}










