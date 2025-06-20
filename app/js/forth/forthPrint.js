var forthPrint = {
    timeout: 700,
    clearTooltip: function () {
        try {
            $('div.uk-tooltip').hide();
        } catch (e) { }
    },
    onPrintFinished: function(printed){ 
        //clear  printContent
        //$("#printContent").html('');
    },
    onPrintStart: function () {
        var self = this;
        self.onPrintFinished(window.print());
    },
    _printDate: function(obj, language) {
        var html = '';
        try {
            switch (language) {
                case 'th': {
                    html += '<div id="printDate" style="width100%; text-align: right; padding-right: 10px;">Print Date : ' + obj.datePrint + '</div>';
                    break;
                }
                case 'lo': {
                    html += '<div id="printDate" style="width100%; text-align: right; padding-right: 10px;">ວັນທີພິມ : ' + obj.datePrint + '</div>';
                    break;
                }
                default: {
                    html += '<div id="printDate" style="width100%; text-align: right; padding-right: 10px;">วันที่พิมพ์ : ' + obj.datePrint + '</div>';
                    break;
                }
            }
        } catch (e) { }
        return html;
    },
    _printDateRange: function(obj, language) {
        var html = '';
        try {
            switch (language) {
                case 'th': {
                    html += '<div class="printDuration">ช่วงวันที่: ' + obj.startDate + ' ถึง ' + obj.endDate + '</div>';
                    break;
                }
                case 'lo': {
                    html += '<div class="printDuration">ໄລຍະເວລາ: ' + obj.startDate + ' ເຖິງ ' + obj.endDate + '</div>';
                    break;
                }
                default: {
                    html += '<div class="printDuration">Date range: ' + obj.startDate + ' to ' + obj.endDate + '</div>';
                    break;
                }
            }
        } catch (e) { }
        return html;
    },
    //Playback
    printMapPlayback: function(obj, mapId, language) {
        this.setPrintPlaybackDetail(obj, language);
        var self = this;
        self.setMap(mapId);
        setTimeout(function () {
            self.clearTooltip();
            self.onPrintStart();
        }, self.timeout);
    },
    setPrintPlaybackDetail: function(obj, language) {
        var html = '';
        html += this._printDate(obj, language);
        html += '<br />';
        html += '<div id="printHead" style="width100%; text-align: left; padding-top: 10px">' + obj.title + '</div>';
        html += this._printDateRange(obj, language);
        html += '<div id="printMap" align="center" style="padding-top: 50px; text-align: center; z-index: 3;">';
        html += '</div>';
        html += '<div id="printDetail" style="margin-top: 50px; max-width: 90%; text-align: left; line-height: 33px;">';
        if (obj.detail.travel != null) {
            html += '<div>';
            html += '<div style="text-decoration:underline;">' + obj.detail.travel[0] + '</div>';
            $.each(obj.detail.travel, function (i, value) {
                if (i > 0) { html += '<div style="padding-left: 30px;">' + value + '</div>'; }
            });
            html += '</div><br />';
        }
        if (obj.detail.parking != null) {
            html += '<div>';
            html += '<div style="text-decoration:underline;">' + obj.detail.parking[0] + '</div>';
            $.each(obj.detail.parking, function (i, value) {
                if (i > 0) { html += '<div style="padding-left: 30px;">' + value + '</div>'; }
            });
            html += '</div><br />';
        }
        if (obj.detail.sensor != null) {
            html += '<div>';
            html += '<div style="text-decoration:underline;">' + obj.detail.sensor[0] + '</div>';
            $.each(obj.detail.sensor, function (i, value) {
                if (i > 0) { html += '<div style="padding-left: 30px;">' + value + '</div>'; }
            });
            html += '</div><br />';
        }
        if (obj.detail.kml != null) {
            html += '<div>';
            html += '<div">' + obj.detail.kml; + '</div>';
            html += '</div>';
        }
        html += '</div>';
        $("#printContent").html(html);
    },
    setMap: function(mapId){
        mapId = mapId ? mapId : 'map';
        var map = document.getElementById(mapId);
        $('#'+ mapId).clone().prependTo("#printMap");
        $("#printMap #" + mapId).width(map.clientWidth);
        $("#printMap #" + mapId).height(map.clientHeight);
        $("#printMap #" + mapId).css('display', 'inline-block');
        $("#printMap #" + mapId).css('z-index', '3');
        var zoomWidth = 1024 / map.clientWidth;
        var zoomheight = 350 / map.clientHeight;
        var zoom = zoomWidth;
        if(zoomWidth > zoomheight) {
            zoom = zoomheight;
        }
        var zoomElement = $('#printMap #' + mapId);
        //claer map menu
        try {
            $("#printMap").find('div.leaflet-control-container').remove();
        } catch (e) { }
        try {
            $("#printMap").find('div.leaflet-contextmenu').remove();
        } catch (e) { }
        this.setZoom(zoomElement, zoom);
    },
    setZoom: function(element, zoom){
        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
            // At least Safari 3+: "[object HTMLElementConstructor]"
        var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        if (isIE) {
            element.css({
                '-ms-transform': 'scale(' + zoom +')',
                '-ms-transform-origin': '51% 0%', 
            });
        }else if (isFirefox) {
            element.css({
                '-moz-transform': 'scale(' + zoom + ')',
                '-moz-transform-origin': '50% 0%',     
            });
        }
        else {
            element.css({
                zoom: zoom,
                '-o-transform': 'scale(' + zoom + ')',
                '-o-transform-origin': '50% 0%',        
            });
        }
    },
    //Chart map
    setChart: function(chartId){
        chartId = chartId ? chartId : 'chartId';
        var canvas = document.getElementById(chartId);
        var dataURL = canvas.toDataURL();
        var img = $('<img>'); //Equivalent: $(document.createElement('img'))
        img.attr('src', dataURL);
        img.css('width', '95%');
        img.appendTo('#printChart');
    },
    printMapChart: function (obj, mapId, chartId, language) {
        this.setPrintMapChartDetail(obj, language);
        this.setMap(mapId);
        this.setChart(chartId);
        var self = this;
        setTimeout(function () {
            self.clearTooltip();
            self.onPrintStart();
        }, self.timeout);
    },
    overlayCanvases: function (cnv1, cnv2) {
        var newCanvas = document.createElement('canvas'),
            ctx = newCanvas.getContext('2d');
        newCanvas.width = cnv1.width;
        newCanvas.height = cnv1.height;
        [cnv1, cnv2].forEach(function (n) {
            ctx.beginPath();
            ctx.drawImage(n, 0, 0, cnv1.width, cnv1.height);
        });
        return newCanvas.toDataURL();
    },
    setChartFlot: function (canvas11, canvas12, canvas21, canvas22) {
        var width = 90;
        var max_heigth = 350;
        if (canvas21 != undefined) {
            width = 80;
            max_heigth = 250;
        }
        if (canvas11 != undefined) {
            var dataURL = this.overlayCanvases(canvas11, canvas12);
            var img = $('<img>');
            img.attr('src', dataURL);
            img.css('width', width + '%');
            img.css('max-height', max_heigth + 'px');
            img.appendTo('#printChart');
        }
        if (canvas21 != undefined) {
            var dataURL = this.overlayCanvases(canvas21, canvas22);
            var img = $('<img>');
            img.attr('src', dataURL);
            img.css('width', width + '%');
            img.css('max-height', max_heigth + 'px');
            img.appendTo('#printChart');
        }
    },
    printMapChartFlot: function (obj, mapId, canvas11, canvas12, language, detail, canvas21, canvas22) {
        this.setPrintMapChartDetail(obj, language, detail);
        this.setMap(mapId);
        this.setChartFlot(canvas11, canvas12, canvas21, canvas22);
        var self = this;
        setTimeout(function () {
            self.clearTooltip();
            self.onPrintStart();
        }, self.timeout);
    },
    setPrintMapChartDetail: function (obj, language, detail) {
        var html = '';
        html += this._printDate(obj, language);
        html += '<br />';
        html += '<div id="printHead" style="width100%; text-align: left; padding-top: 10px;">' + obj.title + '</div>';
        html += this._printDateRange(obj, language);
        html += '<br /><div id="printChart" style="width:1024px; display: flex; align-items: center; flex-direction: column;"></div>';
        html += '<br /><div id="printDetail" style="display: inline-block; width: 100%; text-align: left;">';
        html += this.setDetailChartByType(obj, language, detail);
        html += '</div>';
        html += '<br /><br /><div id="printMap" style="width: 100%; display: inline-block; text-align: center;"></div>';
        $("#printContent").html(html);
    },
    setDetailChartByType: function (obj, language, detail){
        var resuft = '';
        var selection = obj.selection;
        if (detail != undefined && detail != "") {
            try {
                if (angular.isArray(detail)) {
                    angular.forEach(detail, function (obj, index) {
                        try {
                            if (obj.hasOwnProperty('title') && obj.hasOwnProperty('value')) {
                                resuft += '<div>' + obj.title + ' : ' + obj.value + '</div>';
                            }
                        } catch (e) { }
                    });
                } else {
                    resuft = detail;
                }
            } catch (e) {}
        } else {
            switch (obj['typeChart']) {
                case "fuel": {
                    var valfuel = '', valdate = '', valloc = '';
                    if (selection != null) {
                        valfuel = selection.fuel + '%';
                        valdate = selection.recDateTime;
                        valloc = this.getLocation(selection, language);
                    }
                    var check = false;
                    try { check = selection.externalBatteryEV == true ? true : false } catch (e) { }
                    if (check == true) {
                        switch (language) {
                            case 'th': {
                                resuft += '<div>ระดับพลังงานไฟฟ้า(EV) : ' + valfuel + '</div>';
                                break;
                            }
                            case 'lo': {
                                resuft += '<div>ລະດັບພະລັງງານໄຟຟ້າ(EV) : ' + valfuel + '</div>';
                                break;
                            }
                            default: {
                                resuft += '<div>Electric power(EV) : ' + valfuel + '</div>';
                                break;
                            }
                        }
                    } else {
                        switch (language) {
                            case 'th': {
                                resuft += '<div>ระดับน้ำมัน : ' + valfuel + '</div>';
                                break;
                            }
                            case 'lo': {
                                resuft += '<div>ນ້ຳມັນ : ' + valfuel + '</div>';
                                break;
                            }
                            default: {
                                resuft += '<div>Fuel : ' + valfuel + '</div>';
                                break;
                            }
                        }
                    }
                    switch (language) {
                        case 'th': {
                            resuft += '<div>วัน-เวลา : ' + valdate + '</div>';
                            resuft += '<div>สถานที่ : ' + valloc + '</div>';
                            break;
                        }
                        case 'lo': {
                            resuft += '<div>ວັນທີເວລາ : ' + valdate + '</div>';
                            resuft += '<div>ສະຖານທີ່ : ' + valloc + '</div>';
                            break;
                        }
                        default: {
                            resuft += '<div>Date-Time : ' + valdate + '</div>';
                            resuft += '<div>Location : ' + valloc + '</div>';
                            break;
                        }
                    }
                    break;
                }
                case "speed": {
                    var valSpeed = '', valdate = '', valloc = '';
                    if (selection != null) {
                        valSpeed = selection.speed;
                        valdate = selection.recDateTime;
                        valloc = this.getLocation(selection, language);
                    }
                    switch (language) {
                        case 'th': {
                            resuft += '<div>ความเร็ว : ' + valSpeed + ' กม./ชั่วโมง</div>';
                            resuft += '<div>วัน-เวลา : ' + valdate + '</div>';
                            resuft += '<div>สถานที่ : ' + valloc + '</div>';
                            break;
                        }
                        case 'lo': {
                            resuft += '<div>ຄວາມໄວ : ' + valSpeed + ' ກມ/ຊມ</div>';
                            resuft += '<div>ວັນທີເວລາ : ' + valdate + '</div>';
                            resuft += '<div>ສະຖານທີ່ : ' + valloc + '</div>';
                            break;
                        }
                        default: {
                            resuft += '<div>Speed : ' + valSpeed + ' km/hr</div>';
                            resuft += '<div>Date-Time : ' + valdate + '</div>';
                            resuft += '<div>Location : ' + valloc + '</div>';
                            break;
                        }
                    }
                    break;
                }
                case "temperature": {
                    var valTemp = '', valdate = '', valloc = '';
                    if (selection != null) {
                        valTemp = selection.temperature;
                        valdate = selection.recDateTime;
                        valloc = this.getLocation(selection, language);
                    }
                    switch (language) {
                        case 'th': {
                            resuft += '<div style="text-align: left">อุณหภูมิ : ' + valTemp + ' ' + selection.unit + '</div>';
                            try {
                                if (selection.temperature2 != '-' && selection.temperature2 != null) {
                                    resuft += '<div style="text-align: left">อุณหภูมิ 2 : ' + selection.temperature2 + ' ' + selection.unit + '</div>';
                                }
                            } catch (e) { }
                            resuft += '<div style="text-align: left">วัน-เวลา : ' + valdate + '</div>';
                            resuft += '<div style="text-align: left">สถานที่ : ' + valloc + '</div>';
                            try {
                                if (selection.doorSensor != '-' && selection.doorSensor != null) {
                                    resuft += '<div style="text-align: left">เซนเซอร์ ประตู : ' + selection.doorSensor + '</div>';
                                }
                            } catch (e) { }
                            try {
                                if (selection.airSensor != '-' && selection.airSensor != null) {
                                    resuft += '<div style="text-align: left">เซนเซอร์ แอร์ : ' + selection.airSensor + '</div>';
                                }
                            } catch (e) { }
                            try {
                                if (selection.doorSlideStatus != '-' && selection.doorSlideStatus != null) {
                                    resuft += '<div style="text-align: left">เซนเซอร์ประตูข้าง : ' + selection.doorSlideStatus + '</div>';
                                }
                            } catch (e) { }
                            try {
                                if (selection.deviceStatus != '-' && selection.deviceStatus != null) {
                                    resuft += '<div style="text-align: left">สถานะอุปกรณ์ : ' + selection.deviceStatus + '</div>';
                                }
                            } catch (e) { }
                            break;
                        }
                        case 'lo': {
                            resuft += '<div style="text-align: left">ອຸນ​ຫະ​ພູມ : ' + valTemp + ' ' + selection.unit + '</div>';
                            try {
                                if (selection.temperature2 != '-' && selection.temperature2 != null) {
                                    resuft += '<div style="text-align: left">ອຸນ​ຫະ​ພູມ 2 : ' + selection.temperature2 + ' ' + selection.unit + '</div>';
                                }
                            } catch (e) { }
                            resuft += '<div style="text-align: left">ວັນທີເວລາ : ' + valdate + '</div>';
                            resuft += '<div style="text-align: left">ສະຖານທີ່ : ' + valloc + '</div>';
                            try {
                                if (selection.doorSensor != '-' && selection.doorSensor != null) {
                                    resuft += '<div style="text-align: left">ເຊັນເຊີປະຕູ : ' + selection.doorSensor + '</div>';
                                }
                            } catch (e) { }
                            try {
                                if (selection.airSensor != '-' && selection.airSensor != null) {
                                    resuft += '<div style="text-align: left">ເຊັນເຊີອາກາດ : ' + selection.airSensor + '</div>';
                                }
                            } catch (e) { }
                            try {
                                if (selection.doorSlideStatus != '-' && selection.doorSlideStatus != null) {
                                    resuft += '<div style="text-align: left">ເຊັນເຊີປະຕູຂ້າງ : ' + selection.doorSlideStatus + '</div>';
                                }
                            } catch (e) { }
                            try {
                                if (selection.deviceStatus != '-' && selection.deviceStatus != null) {
                                    resuft += '<div style="text-align: left">ສະຖານະອຸປະກອນ : ' + selection.deviceStatus + '</div>';
                                }
                            } catch (e) { }
                            break;
                        }
                        default: {
                            resuft += '<div style="text-align: left">Temperature : ' + valTemp + ' ' + selection.unit + '</div>';
                            try {
                                if (selection.temperature2 != '-' && selection.temperature2 != null) {
                                    resuft += '<div style="text-align: left">Temperature 2 : ' + selection.temperature2 + ' ' + selection.unit + '</div>';
                                }
                            } catch (e) { }
                            resuft += '<div style="text-align: left">Date-Time : ' + valdate + '</div>';
                            resuft += '<div style="text-align: left">Location : ' + valloc + '</div>';
                            try {
                                if (selection.doorSensor != '-' && selection.doorSensor != null) {
                                    resuft += '<div style="text-align: left">Door Sensor : ' + selection.doorSensor + '</div>';
                                }
                            } catch (e) { }
                            try {
                                if (selection.airSensor != '-' && selection.airSensor != null) {
                                    resuft += '<div style="text-align: left">Air Sensor : ' + selection.airSensor + '</div>';
                                }
                            } catch (e) { }
                            try {
                                if (selection.doorSlideStatus != '-' && selection.doorSlideStatus != null) {
                                    resuft += '<div style="text-align: left">Door Slide Sensor : ' + selection.doorSlideStatus + '</div>';
                                }
                            } catch (e) { }
                            try {
                                if (selection.deviceStatus != '-' && selection.deviceStatus != null) {
                                    resuft += '<div style="text-align: left">Device Status : ' + selection.deviceStatus + '</div>';
                                }
                            } catch (e) { }
                            break;
                        }
                    }
                    break;
                }
            }
        }
        return resuft;
    },
    getLocation: function(obj, language){
        var resuft = "-"
        if (obj["location"] != undefined && obj["location"] != "-") {
            resuft = obj["location"];
        } else if(language != 'th') {
            resuft = obj["addressE"];
        } else {
            resuft = obj["addressT"];
        }
        return resuft;
    },
    //Overview Chart
    setOverviewChart: function(lineId, pieId, legendId){
        //Line Chart
        var defer = $.Deferred();
        $('#printLine').html("");
        lineId = lineId ? lineId : 'lineId';
        var line = document.getElementById(lineId);
        $(line).clone().appendTo("#printLine");
        var positionLineId = $('#printLine').find('canvas.flot-base').parent().first();
        var textWidth = $(line).find('.flot-text').width();
        var zoomWidth = 1024 / textWidth;        
        var zoomElement = $('#printLine').find('.flot-text');
        this.setZoom(zoomElement, zoomWidth);
        var zoomElementText = $('#printLine').find('.flot-text').find('.xaxisgraph');
        this.setZoom(zoomElementText, 'reset');
        var lineCanvas = $(line).find('canvas').first();
        lineCanvas.each(function (index, canvas) {
            var dataURL = canvas.toDataURL();
            var img = $('<img>'); //Equivalent: $(document.createElement('img'))
            img.attr('src', dataURL);
            img.css('width', '100%');
            img.prependTo($(positionLineId));
        });
        //Pie Chart
        $('#printChart').html("");
        pieId = pieId ? pieId : 'pieId';
        var canvas = document.getElementById(pieId);
        var dataURL = canvas.toDataURL();
        var img = $('<img>'); //Equivalent: $(document.createElement('img'))
        img.attr('src', dataURL);
        img.appendTo('#printChart');
        //legend
        $('#printLegend').html("");
        var legend = document.getElementById(legendId);
        domtoimage.toPng(legend)
            .then(function (dataUrl) {
                var img = $('<img>'); 
                img.attr('src', dataUrl);
                img.css('width', '100%');
                img.appendTo('#printLegend');
                defer.resolve(true);
            })
            .catch(function (error) {
                defer.reject(false); 
            });
        return defer.promise();
    },
    printOverviewChart: function (obj, lineId, pieId, legendId, language) {
        this.setPrintOverviewDetail(obj, language);
        var self = this;
        this.setOverviewChart(lineId, pieId, legendId).then(function(data) {
            setTimeout(function () {
                self.clearTooltip();
                self.onPrintStart();
            }, self.timeout);
        }, function(err) {
            setTimeout(function () {
                self.clearTooltip();
                self.onPrintStart();
            }, self.timeout);
        });;       
    },
    setPrintOverviewDetail: function(obj, language) {
        var html = '';
        html += this._printDate(obj, language);
        html += '<br />';
        html += '<div id="printHead" style="width100%; text-align: left; padding-top: 10px">' + obj.title + '</div>';
        html += this._printDateRange(obj, language);
        html += '<br /><div id="printLine" class="overviewChart" style="width:1024px;"></div>';
        html += '<br /><div id="printChart" class="overviewChart" style="width:700px; display: inline-block;"></div>';
        html += '<br /><div id="printLegend" class="overviewChart" style="width:324px; display: inline-block;"></div>';
        html += '<br /><br /><br /><div id="printDetail" class="overviewChart" style="display: inline-block; width: 100%; text-align: left;">';
        html += this.setDetailOverviewChart(obj.summary, language);
        html += '</div>';
        $("#printContent").html(html);
    },
    setDetailOverviewChart: function(summary, language){
        var resuft = '';
        for(var key in summary) {
           resuft += '<div class="groupSummary">';
           resuft += summary[key];
           resuft += '</div>';
        }
        return resuft;
    },
    //Print Map Report
    printMapReport: function(obj, mapId, language){
        this.setPrintMapReportDetail(obj, language);
        this.setMap(mapId);
        var self = this;
        setTimeout(function () {
            self.clearTooltip();
            self.onPrintStart();
        }, self.timeout);
    },
    setPrintMapReportDetail: function(obj, language) {
        var html = '';
        html += this._printDate(obj, language);
        html += '<br />';
        html += '<div id="printHead" style="width100%; text-align: left; padding-top: 10px">' + obj.title + '</div>';
        html += '<div id="printMap" align="center" style="padding-top: 50px; text-align: center; z-index: 3;">';
        html += '</div>';
        html += '<br />';
        html += '<div id="printDetail" class="mapReport" style="margin-top: 50px; max-width: 90%; text-align: left; line-height: 33px;">';
        var detail = obj['detail'];
        for(var key in detail) {
            html += '<div class="line">';
            html += '<div class="head">'+ detail[key].title +' :</div>';
            html += '<div class="detail">'+ detail[key].value +'</div>';
            html += '</div>';
        }
        html += '</div>';
        $("#printContent").html(html);
    },
    //Print Fleet
    printFleet: function (obj, language, callback) {
        this.setPrintFleetDetail(obj, language);
        var self = this;
        setTimeout(function () {
            self.clearTooltip();
            self.onPrintStart();
            try {
                if (callback != undefined) {
                    callback();
                }
            } catch (e) { }
        }, self.timeout);
    },
    setPrintFleetDetail: function (obj, language) {
        var html = '';
        html += this._printDate(obj, language);
        html += '<div id="printHead" style="width100%; text-align: left; padding-top: 10px">' + obj.title + '</div>';
        html += '<div id="printTableAlert">';
        html += '<table>';
        html += '<thead>';
        var dataTable = obj.data;
        var header = dataTable.header;
        var body = dataTable.body
        html += '<tr>';
        for (var i = 0; i < header.length; i++) {
            html += '<th>' + header[i] + '</th>';
        }
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        for (var i = 0; i < body.length; i++) {
            html += '<tr>';
            var arr = body[i];
            for (var j = 0; j < arr.length; j++) {
                html += '<td>' + arr[j] + '</td>';
            }
            html += '</tr>';
        }
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        $("#printContent").html(html);
    },
    //Overview Chart monthly
    setOverviewChartMonthly: function (lineId, pieId, legendId) {
        //Line Chart
        var defer = $.Deferred();
        $('#printLine').html("");
        lineId = lineId ? lineId : 'lineId';
        var line = document.getElementById(lineId);
        $(line).clone().appendTo("#printLine");
        var positionLineId = $('#printLine').find('canvas.flot-base').parent().first();
        var textWidth = $(line).find('.flot-text').width();
        var zoomWidth = 1024 / textWidth;
        var zoomElement = $('#printLine').find('.flot-text');
        this.setZoom(zoomElement, zoomWidth);
        var zoomElementText = $('#printLine').find('.flot-text').find('.xaxisgraph');
        this.setZoom(zoomElementText, 'reset');
        var lineCanvas = $(line).find('canvas').first();
        lineCanvas.each(function (index, canvas) {
            var dataURL = canvas.toDataURL();
            var img = $('<img>'); //Equivalent: $(document.createElement('img'))
            img.attr('src', dataURL);
            img.css('width', '100%');
            img.css('height', '550px');
            img.prependTo($(positionLineId));
        });
        //Pie Chart
        $('#printChartMonthly').html("");
        pieId = pieId ? pieId : 'pieId';
        var canvas = document.getElementById(pieId);
        var dataURL = canvas.toDataURL();
        var img = $('<img>'); //Equivalent: $(document.createElement('img'))
        img.attr('src', dataURL);
        img.css('height', '400px');
        img.appendTo('#printChartMonthly');
        //legend
        $('#printLegendMonthly').html("");
        var legend = document.getElementById(legendId);
        domtoimage.toPng(legend)
            .then(function (dataUrl) {
                var img = $('<img>');
                img.attr('src', dataUrl);
                //img.css('width', '100%');
                img.css('height', '140px');
                img.appendTo('#printLegendMonthly');
                defer.resolve(true);
            })
            .catch(function (error) {
                defer.reject(false);
            });
        return defer.promise();
    },
    printOverviewChartMonthly: function (obj, lineId, pieId, legendId, language) {
        this.setPrintOverviewMonthlyDetail(obj, language);
        var self = this;
        this.setOverviewChartMonthly(lineId, pieId, legendId).then(function (data) {
            setTimeout(function () {
                self.clearTooltip();
                self.onPrintStart();
            }, self.timeout);
        }, function (err) {
            setTimeout(function () {
                self.clearTooltip();
                self.onPrintStart();
            }, self.timeout);
        });;
    },
    setPrintOverviewMonthlyDetail: function (obj, language) {
        var html = '';
        html += this._printDate(obj, language);
        html += '<br />';
        html += '<div id="printHead" style="width100%; text-align: left; padding-top: 10px">' + obj.title + '</div>';
        html += this._printDateRange(obj, language);
        html += '<br /><div id="printLine" class="overviewChart" style="width:1024px;"></div>';
        html += '<br /><div id="printChartMonthly" class="overviewChart" style="width:1024px; text-align: center; max-height: 450px; margin-top: -100px;position: relative;left: 20%;"></div>';
        html += '<br /><div id="printLegendMonthly" class="overviewChart" style="width:1024px; text-align: center; max-height: 100px; position: relative;left: 20%;"></div>';
        html += '</div>';
        $("#printContent").html(html);
    },
    createTableForExport: function (obj, language, show) {
        var s_number0 = "mso-number-format:'#,##0'";
        var s_number1 = "mso-number-format:'#,##0.0'";
        var s_number2 = "mso-number-format:'#,##0.00'";
        var s_text = "mso-number-format:'\@'";
        s_number0 = s_text;
        s_number1 = s_text;
        s_number2 = s_text;
        var main = '';
        main += '<div id="printTableAlert">';
        var html = '';
        html += '<table>';
        var dataTable = obj.data;
        var header = dataTable.header;
        var body = dataTable.body;
        var check_headerHTML = false;
        try {
            console.log(dataTable)
            if (dataTable.hasOwnProperty('headerHTML')) {
                if (angular.isArray(dataTable.headerHTML)) {
                    if (dataTable.headerHTML.length > 0) {
                        check_headerHTML = true;
                    }
                }
            }
        } catch (e) { }
        html += '<thead>';
        if (check_headerHTML == true) {
            angular.forEach(dataTable.headerHTML, function (_html, index) {
                if (_html != undefined && _html != "") {
                    html += _html;
                }
            });
        } 
            html += '<tr>';
            for (var i = 0; i < header.length; i++) {
                html += '<th>' + header[i] + '</th>';
            }
            html += '</tr>';
            //subHeader
            try {
                if (angular.isArray(dataTable.subHeader)) {
                    if (dataTable.subHeader.length > 0) {
                        angular.forEach(dataTable.subHeader, function (obj, index) {
                            html += '<tr>';
                            angular.forEach(obj, function (val, index) {
                                html += '<th>' + val + '</th>';
                            });
                            html += '</tr>';
                        });
                    }
                }
            } catch (e) { }
        html += '</thead>';
        html += '<tbody>';
        for (var i = 0; i < body.length; i++) {
            html += '<tr>';
            var arr = body[i];
            for (var j = 0; j < arr.length; j++) {
                var value = arr[j];
                //checkTypeValue
                var type = s_text;
                try {
                    value = value.replaceAll(',', '');
                    //if (j == 20) { console.log(value + ' # ' + isNaN(value)) }
                    if (isNaN(value) == false) {
                        var _s = value.split(".");
                        if (_s.length == 2) {
                            if (_s[1].length == 1) {
                                type = s_number1;
                            } else {
                                type = s_number2;
                            }
                        } else if (_s.length == 1) {
                            if (_s[0].length < 6) {
                                type = s_number0;
                            }
                        }
                    }
                } catch (e) { }
                html += "<td style=\"" + type + "\">" + arr[j] + '</td>';
            }
            html += '</tr>';
        }
        html += '</tbody>';
        //footer
        try {
            if (angular.isArray(dataTable.footer)) {
                if (dataTable.footer.length > 0) {
                    html += '<tfoot>';
                    angular.forEach(dataTable.footer, function (obj, index) {
                        html += '<tr>';
                        angular.forEach(obj, function (val, index) {
                            html += '<th>' + val + '</th>';
                        });
                        html += '</tr>';
                    });
                    html += '</tfoot>';
                }
            }
        } catch (e) { }
        html += '</thead>';
        html += '</table>';
        //end
        if (show != false) {
            main += html;
        }
        main += '</div>';
        $("#printContent").html(main);
        return html;
    }
};
        
        
        