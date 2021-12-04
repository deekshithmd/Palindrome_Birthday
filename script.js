var datev = document.querySelector("#input-date")
var button = document.querySelector(".check")
var output = document.querySelector(".output")

function reverseStr(str){
    var charList=str.split('')
    var reversedChars=charList.reverse()
    var reversedStr=reversedChars.join('')
    return reversedStr;
}

function isPalindrome(str){
    var revrse=reverseStr(str)
    if(str==revrse)
        return true
    else
        return false
    }

function convertDatetoStr(date){
    var dateStr={day:'',
                month:'',
                year:''
                }

    if(date.day<10){
        dateStr.day='0' + date.day
    }
    else{
        dateStr.day=date.day.toString()
    }

    if(date.month<10){
        dateStr.month = '0'+date.month
    }
    else{
        dateStr.month=date.month.toString()
    }

    dateStr.year=date.year.toString()

    return dateStr
}

function getAllDateFormats(date){
    dateStr=convertDatetoStr(date)

    var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year
    var mmddyyyy=dateStr.month+dateStr.day+dateStr.year
    var yyyymmdd=dateStr.year+dateStr.month+dateStr.day
    var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2)
    var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2)
    var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day

    return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}

function checkPalindromeForAllDateFormats(date){
    var listofPalindrome=getAllDateFormats(date)

    flag=false

    for( var i=0;i<listofPalindrome.length;i++ ){
        if(isPalindrome(listofPalindrome[i])){
            flag=true
            break
        }
    }

    return flag
}
function isLeapYear(year){
    if(year%400 === 0){
        return true
    }
    if(year%100 === 0){
        return false
    }
    if(year%4 === 0){
        return true
    }
    return false
}

function getNextDate(date){
    var day=date.day+1
    var month=date.month
    var year=date.year
    noofDaysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31]
    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day=1
                month=month+1
            }
        }
        else{
            if(day>28){
                day=1
                month=month+1
            }
        }
    }
    else{
        if(day>noofDaysInMonth[month-1]){
            day=1
            month=month+1
        }
    }
    if(month>12){
        month=1
        year=year+1
    }

    return {
        day:day,
        month:month,
        year:year
    }
}

function getNextPalindromeDate(date){
    var nodays=0
    var nextDate=getNextDate(date)
    while(1){
        nodays++
        var result=checkPalindromeForAllDateFormats(nextDate)
        if(result===true)
            break

        nextDate=getNextDate(nextDate)
    }

    return [nodays, nextDate]

}

function check(){
    var dat=datev.value;
    if(dat != ''){
        dateList=dat.split('-')
        var date={
         day: Number(dateList[2]),
         month: Number(dateList[1]),
         year: Number(dateList[0])
        }
        var palindrome=checkPalindromeForAllDateFormats(date)
        //console.log(palindrome)

        if(palindrome==true){
            output.innerText="Yes...Your birthday is palindrome"
        }
        else{
            var [nodays,nextDate]=getNextPalindromeDate(date)
            output.innerText="Your birthday is not palindrome...nearest next date is "+ nextDate.day+"-"+nextDate.month+"-"+nextDate.year+" you missed by "+nodays+" days"
        }
    }
}

button.addEventListener("click",check)