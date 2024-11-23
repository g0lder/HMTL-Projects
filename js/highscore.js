class highscore {
constructor (title, limit=10, direction='desc') {
this.store = window.localStorage;
this.title = (title) ? title : 'highscores';
this.limit = limit;
this.direction = (direction.toLowerCase() === 'desc') ? 'desc' : 'asc';
let content = this.store.getItem(this.title);
this.scores = [];
if (content) {
this.scores = JSON.parse(content);
}
}
save (name, score) {
let entry = {
'name': name,
'score': score
}
this.scores.push(entry);
this.scores = this.sort(this.scores, this.direction);
if (this.scores.length > this.limit) {
this.scores = this.scores.slice(0, this.limit);
}
this.store.setItem(this.title, JSON.stringify(this.scores));
}
load (amount) {
if (amount && amount > 0) {
return this.scores.slice(0, amount);
}
return this.scores;
}
list (amount, className='') {
let array = this.scores;
if (amount && amount > 0) {
array = array.slice(0, amount);
}
const list = document.createElement('ul');
if (className.length > 0) {
list.classList.add(className);
}
for (var i = 0; i < array.length; i++) {
const listItem = document.createElement('li');
const nameSpan = document.createElement('span');
nameSpan.classList.add('name');
nameSpan.textContent = array[i].name;
const scoreSpan = document.createElement('span');
scoreSpan.classList.add('score');
scoreSpan.textContent = array[i].score;
listItem.appendChild(nameSpan);
listItem.appendChild(scoreSpan);
list.appendChild(listItem);
}
return list;
}
sort (array, direction='desc') {
let sortedArray = array.sort(function (a, b) {
if ( a.score < b.score ) {
return -1;
}
if ( a.score > b.score ) {
return 1;
}
return 0;
});
return (direction === 'asc') ? sortedArray : sortedArray.reverse();
}
}
export default highscore;
