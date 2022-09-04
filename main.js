function reverseStr(str) {
    // var listOfChars = str.split('');
    // var reverseListofChars = listOfChars.reverse();
    // var reversedStr = reverseListofChars.join('');
    // return reversedStr;
    return str.split('').reverse().join('');
}
console.log(reverseStr('sudipta'));

function isPalindrome(str) {
    var reversedStr = reverseStr(str);
    return str === reversedStr;
}
console.log(isPalindrome('madam'));

function convertDateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    }
    if (date.day < 10) {
        dateStr.day = '0' + date.day; // convert dateStr.day to string internally
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}
var date = {
    day: 2,
    month: 2,
    year: 2020
}
console.log(convertDateToString(date));

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
console.log(getAllDateFormats(date));

function checkPalindromeForAllDateFormats(date) {
    var listOfAllDateFormats = getAllDateFormats(date);
    var flag = false;

    for (var i = 0; i < listOfAllDateFormats.length; i++) {
        if (isPalindrome(listOfAllDateFormats[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}
console.log(checkPalindromeForAllDateFormats(date));

function leapYear(year) {
    if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 4 == 0)) {
        return true;
    } else {
        return false;
    }
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (month === 2) {
        if (leapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}
console.log(convertDateToString(getNextDate(date)));

function getNextPalindromeDate(date) {
    var count = 0;
    var nextDate = getNextDate(date);
    while (1) {
        count++;
        if (checkPalindromeForAllDateFormats(nextDate)) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [count, nextDate];
}
console.log(getNextPalindromeDate(date));

var dobInputRef = document.querySelector('#dob-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');
var errorRef = document.querySelector('#error');
var loadingGif = document.querySelector("#loading");

showBtnRef.addEventListener('click', clickHandler);

function clickHandler(e) {
    loadingGif.style.display="block";
    loadingGif.innerHTML="<img src='Loading.gif'>";
    resultRef.style.display="none";
    resultRef.innerText="";
    var dobStr = dobInputRef.value;
    if (dobStr !== '') {
        errorRef.style.display = "none";
        resultRef.style.display = "block";
        var listOfDate = dobStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        if (checkPalindromeForAllDateFormats(date)) {
            setTimeout(()=>{
                loadingGif.style.display="none";
                resultRef.style.display="block";
                resultRef.innerText = "Yay! Your Birthday is a Palindrome!!🤩";
            }, 2000); 
        } else {
            setTimeout(()=>{
                loadingGif.style.display="none";
                resultRef.style.display="block";
                var [count, nextDate] = getNextPalindromeDate(date);
                resultRef.innerText = `The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days!😔`;
            },2000);
        }
    } else {
        errorRef.style.display = "block";
        resultRef.style.display = "none";
        loadingGif.style.display="none";
        errorRef.innerText = "Please enter the date of birth!";
    }
}