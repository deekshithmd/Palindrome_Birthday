const datev = document.querySelector("#input-date")
const button = document.querySelector(".check")
const output = document.querySelector(".output")

const reverseStr= str =>{
    const charList=str.split('')
    const reversedChars=charList.reverse()
    const reversedStr=reversedChars.join('')
    return reversedStr;
}

const isPalindrome = str =>{
    const revrse=reverseStr(str)
    if(str==revrse)
        return true
    else
        return false
    }

const convertDatetoStr = date=>{
   let dateStr={day:'',
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

const getAllDateFormats = date =>{
    dateStr=convertDatetoStr(date)

    const ddmmyyyy=dateStr.day+dateStr.month+dateStr.year
    const mmddyyyy=dateStr.month+dateStr.day+dateStr.year
    const yyyymmdd=dateStr.year+dateStr.month+dateStr.day
    const ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2)
    const mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2)
    const yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day

    return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}

const checkPalindromeForAllDateFormats = date =>{
    const listofPalindrome=getAllDateFormats(date)

    flag=false

    for( var i=0;i<listofPalindrome.length;i++ ){
        if(isPalindrome(listofPalindrome[i])){
            flag=true
            break
        }
    }

    return flag
}
const isLeapYear = year =>{
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

const getNextDate = date =>{
    let day=date.day+1
    let month=date.month
    let year=date.year
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

const getNextPalindromeDate = date =>{
    let nodays=0
    let nextDate=getNextDate(date)
    while(1){
        nodays++
        var result=checkPalindromeForAllDateFormats(nextDate)
        if(result===true)
            break

        nextDate=getNextDate(nextDate)
    }

    return [nodays, nextDate]

}

const getPrevDate = date =>{
    let day=date.day-1
    let month=date.month
    let year=date.year
    noofDaysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31]
    if(day===0){
        month--

        if(month===0){
            month=12
            day=31
            year--
        }
        else if(month===2){
            if(isLeapYear(year)){
                day=29
            }
            else{
                day=28
                }
        }
        else{
            day=noofDaysInMonth[month-1]
        }
    }
    
    return {
        day:day,
        month:month,
        year:year
    }
}

const getPreviousPalindromeDate = date =>{
    let nodays=0
    let prevDate=getPrevDate(date)
    while(1){
        nodays++
        var result=checkPalindromeForAllDateFormats(prevDate)
        if(result===true)
            break

        prevDate=getPrevDate(prevDate)
    }

    return [nodays, prevDate]

}

const check = () =>{
    const dat=datev.value;
    if(dat != ''){
        //console.log(dat)
        dateList=dat.split('-')
        //console.log(dateList)
        var date={
         day: Number(dateList[2]),
         month: Number(dateList[1]),
         year: Number(dateList[0])
        }
        var palindrome=checkPalindromeForAllDateFormats(date)
        //console.log(palindrome)

        if(palindrome==true){
            output.innerText=`Yes...Your birthday is palindrome`
        }
        else{
            const [nodays,nextDate]=getNextPalindromeDate(date)
            const [ndays,preDate]=getPreviousPalindromeDate(date)
            console.log(nodays)
            console.log(ndays)
            if(nodays < ndays)
                output.innerText=`Your birthday is not palindrome...nearest next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} you missed by ${nodays} days`
            else
                output.innerText=`Your birthday is not palindrome...nearest previous palindrome date is ${preDate.day}-${preDate.month}-${preDate.year} you missed by ${ndays} days`
        }
    }
}

button.addEventListener("click",check)