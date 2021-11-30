window.onload = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sepember', 'October', 'November', 'December'];
    const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var counter = 0;
    var currentDate = new Date(Date.now());

    var calendarYear = $('#calendar-year');
    var calendarMonth = $('#calendar-month');
    var calendarDays = document.getElementById('calendar-days');
    var calendarDaysOfTheWeek = document.getElementById('calendar-weekdays');

    var btnNext = document.getElementById('btn-next');

    var monthBanner = document.getElementById('monthBanner');

    var images = [];

    btnNext.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        changeBannerSmooth();
        setTimeout(() => {
            clearCalendar();
            counter = 0;
            populateCalendar();
        }, 1000)

    })

    var btnPrev = document.getElementById('btn-prev');

    btnPrev.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        changeBannerSmooth();
        setTimeout(() => {
            clearCalendar();
            counter = 0;
            populateCalendar();
        }, 1000)
    })

    function loadImages(){
        for(let i = 0; i < 12; i++){
            var link = "res/img/" + i + ".jpg";
            var img = new Image();
            img.src = link;
            images.push(img);
        }
    }

    function changeBannerSmooth() {
        $('#monthBanner').fadeOut(1000, changeBannerImage);
    }

    function changeBannerImage() {
            monthBanner.style.backgroundImage = "url( "+ images[currentDate.getMonth()].src+")";
            monthBanner.style.backgroundSize = "cover";
            monthBanner.style.backgroundPosition = "center";
            $('#calendar-month').css('color', '#EEEBD3');
            $('#calendar-year').css('color', '#EEEBD3');
            $('#calendar-year').css('font-size', '3.2vh');
            
            $('#monthBanner').fadeIn(1000);

    }

    function clearCalendar() {
        calendarDays.innerHTML = '';
        calendarDaysOfTheWeek.innerHTML = '';
    }

    function populateCalendar() {
        for (let i = 0; i < daysOfTheWeek.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = daysOfTheWeek[i].toString();
            calendarDaysOfTheWeek.appendChild(li);
        }

        calendarMonth.html(months[currentDate.getMonth().toString()]);
        calendarYear.html(currentDate.getFullYear());

        var date = currentDate;
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        console.log(firstDay.getDay());
        console.log(lastDay.getDate());

        for (let i = 0; i < firstDay.getDay(); i++) {
            var li = document.createElement("li");
            calendarDays.appendChild(li);
            counter++;
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            var li = document.createElement("li");
            var button = document.createElement("button");
            let today = new Date(Date.now());
            button.classList.add("day-btn");
            if (i === today.getDate() && lastDay.getMonth() === today.getMonth() && lastDay.getFullYear() === today.getFullYear()) {
                button.classList.add("active");
                console.log("today")
            }
            li.id = "listItem" + i;
            button.id = "day" + i;
            button.innerHTML = i;
            li.appendChild(button);
            calendarDays.appendChild(li);
            counter++;
        }

        while (counter % 7 !== 0) {
            var li = document.createElement("li");
            calendarDays.appendChild(li);
            counter++;
        }
    }
    loadImages();
    populateCalendar();
    changeBannerImage();

}