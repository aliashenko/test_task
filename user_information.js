/**
 * Facebook client
 * @constructor
 * @param {string} accessToken Facebook user access token. More information here:
 *   https://developers.facebook.com/docs/facebook-login/access-tokens
 */
var FacebookClient = function(accessToken) {
  this.accessToken = accessToken;
};

/**
 * Load user information
 * @param {function({firstName: string, lastName: string, imageUrl: string})} callback Load user 
 *   info callback. Called after user information has been loaded.
 */
FacebookClient.prototype.loadUserInfo = function(callback) {
  $.ajax({
    url: 'https://graph.facebook.com/me',
    type: 'GET',
    data: { access_token: this.accessToken},
    success: function (response) {
      var userInfo = {
        firstName: response.first_name,
        lastName: response.last_name,
        imageUrl: 'http://graph.facebook.com/'+response.id+'/picture?type=normal'
      };
      callback(userInfo);
    }
  });
};

/**
 * LinkedIn client
 * @constructor
 * @param {string} accessToken LinkedIn access token. More information here: 
 *   https://developer.linkedin.com/documents/authentication
 */
var LinkedInClient = function(accessToken) {
  this.accessToken = accessToken;
};

/**
 * Load user information
 * @param {function({firstName: string, lastName: string, imageUrl: string})} callback Load user 
 *   info callback. Called after user information has been loaded.
 */
LinkedInClient.prototype.loadUserInfo = function(callback) {
  $.ajax({
    url: 'https://api.linkedin.com/v1/people/~:(first-name,last-name,headline,picture-url)',
    type: 'GET',
    data: {oauth2_access_token: this.accessToken},
    dataType: 'jsonp',
    success: function(response){
        var userInfo = {
          firstName: response.firstName,
          lastName: response.lastName,
          imageUrl: response.pictureUrl
        };
        callback(userInfo);
    }
  });
};

function showUserInfo(userInfo) {
  $('<p>First Name: '+userInfo.firstName+'</p>'+
   '<p>Last name: '+userInfo.lastName+'</p>'+
   '<img src='+userInfo.imageUrl+' alt="Profile Image"</img>'
  ).appendTo('.user_info');
};

function init() {
  // Facebook
  var fbToken = 'CAAJJXFdpSUEBAFKZCXtZAmfZABiOUFuFZAZB05J9gprUTRK7ZAaz0FxY2hWFEZArZA4vEX2N8Rg8gk9Yfirstk0H3Jxb6PoR89IOqDLNkkZB5j4hNO0mpqw2nAgDr9j29viL8uyomZAuVKlcpEzwVCeqzWHL4NjT7yk7mYXewJNShWjQHUnlXLbfTFONeX3RDcY3irfwFRQXdMHWrOKZBhizK3nW4yGimTipAoZD';
  var fbClient = new FacebookClient(fbToken);
  
  $('#facebook_button').on('click', function() {
    $(this).attr('disabled', 'disabled');
    fbClient.loadUserInfo(showUserInfo);
  });

  // LinkedIn
  var linkedInToken = 'AQVfwNQSJq5WqlsDUgZAmG4ZfkHVBaa6dN27o0qnFhhKJdu3ud1ksZ351buUxogQSN71rFtHrauy5uxUXEgPriSLrGWQThwag7eJemxhjlo9yvSFmIuFvjrKqp-OM4BeL2zuqiLNpn9oNebBGrG0CtEmVOxat6ws66twMIeB1wesxngXM4s';
  var linkedInClient = new LinkedInClient(linkedInToken);
  $('#linkedin_button').on('click', function() {
    $(this).attr('disabled', 'disabled');
    linkedInClient.loadUserInfo(showUserInfo);
  });
};
