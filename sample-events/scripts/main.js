document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    navigator.splashscreen.hide();
    var eventTemplate = document.querySelector("#event-template-container .row");
    var eventApp = new EventApp(eventTemplate);
    eventApp.printEvent('deviceready');
    eventApp.run();
}

function EventApp(eventTemplate) {
    this.eventTemplate = eventTemplate;
}

EventApp.prototype = {
    run: function() {
        var that = this;
        
        document.addEventListener("pause",
                                  function() {
                                      that._onPause.apply(that, arguments);
                                  }, 
                                  false);
		
        document.addEventListener("resume",
                                  function() {
                                      that._onResume.apply(that, arguments);
                                  }, 
                                  false);
         
        document.addEventListener("online",
                                  function() {
                                      that._onOnline.apply(that, arguments);
                                  },
                                  false);
        
        document.addEventListener("offline",
                                  function() {
                                      that._onOffline.apply(that, arguments);
                                  },
                                  false);
         
        window.addEventListener("batterystatus",
                                function() {
                                    that._onBatteryStatus.apply(that, arguments)
                                },
                                false);
    },
    
    _onPause: function() {
        var that = this;
        that.printEvent("Pause");
    },
 
    _onResume: function() {
        var that = this;
        that.printEvent("Resume");
    },
 
    _onOnline: function() {
        var that = this;
        that.printEvent("Network online");
    },
 
    _onOffline: function() {
        var that = this;
        that.printEvent("Network offline");
    },
 
    _onBatteryStatus: function(batteryInfo) {
        var that = this
        batteryLevel = batteryInfo.level,
        isPlugged = batteryInfo.isPlugged;

        var notificationMessage = "Battery level (" + batteryLevel + "%). " + 
                                  "You are " + (isPlugged ? "" : "not") + "  plugged in.";
    
        that.printEvent(notificationMessage);
    },
	
    printEvent: function(text) {
        var newEvent = this.eventTemplate.cloneNode(true),
            currentTime = new Date().toLocaleTimeString().split(" ")[0];
        
        newEvent.querySelector(".event-time").innerText = '[' + currentTime + ']';
        newEvent.querySelector(".event-text").innerText = text;
        
        document.getElementById("content").appendChild(newEvent);
    }
}