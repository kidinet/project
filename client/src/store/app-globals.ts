import {Group} from '../entities/group';
import {User} from '../entities/user/user';
import {UserInGroup} from '../entities/user/UserInGroup';
import {AboutTitle} from '../entities/about/aboutTitles';
import {ImageGallery} from '../entities/gallery/imageGallery';
import {ThisDayContent} from '../entities/thisDay/thisDayContent';
import {ThisDayOfGroup} from '../entities/thisDay/thisDayOfGroup';


// variables
export let baseAppUrl = 'http://localhost:4200/';
export let baseAPIUrl = 'http://localhost:7022/api/';

export let currentGroup = new Group(123, 'הגן שלנו', 'בני ברק', 'רבי עקיבא', 12, '0606660000', 'g0504108130@gmail.com',
    '03-5555555', 32.090606, 34.825582);
export let currentUser = new User('משה', 'ללללל', 'הרב בלוי', 'בני ברק', 12, '0504109999', 'g0504108130@gmail.com', null, '1234');
export let currentUserInGroup = new UserInGroup('cDasd', 'aSDASda', 'דודו');
export let usersInCurrentGroup = [
    new User('משה', 'כהן', 'הרב בלוי', 'בני ברק', 13, '0504109999', 'g0504108130@gmail.com', null, null, 32.090606, 34.825582),
    new User('חיים', 'לוי', 'הרב בלוי', 'בני ברק', 14, '0504109999', 'g0504108130@gmail.com', null, null, 32.088000, 34.827906),
    new User('לאה', 'משמש', 'הרב בלוי', 'בני ברק', 22, '0504109999', 'g0504108130@gmail.com', null, null, 32.087660, 34.827900),
    new User('חנה', 'רימון', 'הרב בלוי', 'בני ברק', 55, '0504109999', 'g0504108130@gmail.com', null, null, 32.086578, 34.829648),
    new User('יפה', 'תאנה', 'הרב בלוי', 'בני ברק', 66, '0504109999', 'g0504108130@gmail.com', null, null, 32.087342, 34.828361),
    new User('צפורה', 'שמש', 'הרב בלוי', 'בני ברק', 77, '0504109999', 'g0504108130@gmail.com', null, null, 32.087851, 34.829069),
    new User('שרית', 'ירח', 'הרב בלוי', 'בני ברק', 99, '0504109999', 'g0504108130@gmail.com', null, null, 32.087396, 34.830217)
]
// ==================================style==================================
export const colors = [
    '#ffb876',
    '#acf1ac',
    '#8b8be4',
    '#ff82f3',
    'rgb(151, 237, 199)',
    '#d3d8f0',
    'rgb(178, 205, 255)',
    'rgb(244, 161, 161)',
    'rgb(228, 118, 169)',
    'rgb(118, 255, 135)',
    'rgb(172, 151, 237)',
    'rgb(255, 239, 128)',
    'rgb(204, 244, 161)',
    'rgb(255, 118, 118)'
];
export const icons = [
    'snowflake-o',
    'bell',
    'comment-o',
    'book',
    'calendar',
    'thumbs-o-up',
    'hourglass',
    'heart',
    'bus',
    'eye',
    'bell-o',
    'smile-o',
    'pencil',
    'gamepad',
    'binoculars',
    'camera',
    'motorcycle',
    'futbol-o',
    'music',
    'umbrella',
    'birthday-cake'
]
// =======================================================================

export let aboutTitles: AboutTitle[] = [];
export let imageGallery: ImageGallery[] = [];

export let likeItems = [];
export let likeItemsCount = {};

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
export function setGroup(groupParam) {
    this.currentGroup = groupParam;
}
export function setUser(user) {
    currentUser = user;
}
export function setUserInGroup(userInGroup) {
    currentUserInGroup = userInGroup;
}
export function setUsersInCurrentGroup(UsersInCurrentGroupParam: User[]) {
    usersInCurrentGroup = UsersInCurrentGroupParam;
}
// ==================about=====================
export function addAboutTitles(aboutTitlesParam) {
    aboutTitles.push(aboutTitlesParam);
}
export function setAboutTitles(aboutTitlesArray) {
    aboutTitles = aboutTitlesArray;
}

// =================gallery=====================
export function toggleLikeItem(id) {
    const index = likeItems.indexOf(id);
    if (index === -1) {
        likeItemsCount[id]++;
        likeItems.push(id);
    } else {
        likeItemsCount[id]--;
        likeItems.splice(index, 1);
    }
}
export function addImagesForGallery(ImageGallryArray) {
    imageGallery.push.apply(imageGallery, ImageGallryArray);
}
export function setLikeItems(likeItemsArray) {
    likeItems = likeItemsArray;
}
export function setLikeItemsCount(likeItemsCountObject) {
    likeItemsCount = likeItemsCountObject;
}
export function deleteImageFromGallery(id) {
    const item = imageGallery.find((item) => {
        return item.id === id;
    })
    imageGallery.splice(imageGallery.indexOf(item), 1);
}
// ====================thisDay=============

export function initThisDayOfGroupArray(thisDayOfGroupArrayParams) {
    this.thisDayOfGroupArray = thisDayOfGroupArrayParams;
}
export function addThisDayContent(thisDayParam: ThisDayContent) {
    thisDayContentArray.push(thisDayParam);
}
export function addThisDayOfGroup(addThisDayOfGroupParam: ThisDayOfGroup) {
    thisDayOfGroupArray.push(addThisDayOfGroupParam);
}

// =====================================

// getters
export function getCurrentUser() {
    return currentUser;
}
export function getCurrentUserInGroup() {
    return currentUserInGroup;
}

export function getCurrentGroup() {
    return currentGroup;
}
// ==================about===================
export function getAboutTitles() {
    return aboutTitles;
}

// ==========gallery=============
export function getImageGallery() {
    return imageGallery;
}
export function getLikeItems() {
    return likeItems;
}
export function getLikeItemsCount() {
    return likeItemsCount;
}








