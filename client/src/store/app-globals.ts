import {Group} from '../entities/group';
import {User} from '../entities/user/user';
import {UserInGroup} from '../entities/user/UserInGroup';
import {AboutTitle} from '../entities/about/aboutTitles';
import {ImageGallery} from '../entities/gallery/imageGallery';


// variables
export let baseAppUrl = 'http://localhost:4200/';
export let baseAPIUrl = 'http://localhost:7022/api/';

export let currentGroup = new Group(123, 'הגן שלנו', 'בני ברק', 'רבי עקיבא', 12, '0606660000', 'g0504108130@gmail.com',
    '03-5555555', 32.090606, 34.825582);
export let currentUser = new User('משה', 'ללללל', 'הרב בלוי', 'בני ברק', 12, '0504109999', 'g0504108130@gmail.com', null, '1234');
export let currentUserInGroup = new UserInGroup('cDasd', 'aSDASda', 'דודו');


export let aboutTitles: AboutTitle[] = [];
export let imageGallery: ImageGallery[] = [];

export let likeItems = [];
export let likeItemsCount = {};


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








